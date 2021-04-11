import { withIronSession } from 'next-iron-session'
import { useState } from 'react'
import Student from '../components/student'
import StudentModal from '../components/studentModal'
import WriteNote from '../components/writeNote'
import AcceptNote from '../components/acceptNote'
import Note from '../components/note'
import { alphaFilters } from '../helpers/constants'

const sections = ['students', 'groups', 'notes']

export default function Home({ user, users, notes }) {
    if (!user) window.location.redirect('/')
    const [section, setSection] = useState('students')
    const [filter, setFilter] = useState()
    const [selected, setSelected] = useState()
    const [newNotes, setNewNotes] = useState(notes.filter((n) => !n.accepted))
    const [acceptedNotes, setAcceptedNotes] = useState(
        notes.filter((n) => n.accepted),
    )
    const [write, setWrite] = useState(false)
    const [accept, setAccept] = useState()
    const [sent, setSent] = useState('Note sent successfully!')
    const [acceptError, setAcceptError] = useState()

    async function onSend(success) {
        setSent(
            success
                ? 'Note sent successfully!'
                : 'Error sending note, please try again.',
        )
        setTimeout(() => setSent(), 5000)
    }

    function onAcceptNote(status, note) {
        if (status === 'Accepted') {
            setAcceptedNotes([note, ...acceptedNotes])
            setNewNotes(newNotes.filter((n) => n.id !== note.id))
        } else if (status === 'Deleted') {
            setNewNotes(newNotes.filter((n) => n.id !== note.id))
        } else {
            setAcceptError('Sorry, something went wrong. Please try again.')
            setTimeout(() => setAcceptError(), 5000)
        }
        setAccept(false)
    }

    function renderStudents() {
        return (
            <div className="students-container">
                <div className="user-grid">
                    {users.map((u, i) =>
                        filter &&
                        u.lastName.charAt(0).toLowerCase() <
                            filter.toLowerCase() ? null : (
                            <span onClick={() => setSelected(u)}>
                                <Student key={u.email + i} user={u} />
                            </span>
                        ),
                    )}
                </div>
                <div className="filters">
                    {alphaFilters.map((a) => (
                        <p
                            className={
                                filter === a ? 'active filter' : 'filter'
                            }
                            onClick={() => setFilter(a)}
                            key={a}
                        >
                            {a}
                        </p>
                    ))}
                    <p className="help">Filter by Last Name</p>
                </div>
                <StudentModal
                    user={selected}
                    close={() => setSelected(false)}
                />
            </div>
        )
    }

    function renderNotes() {
        return (
            <div className="notes-container">
                <div className="notes-admin">
                    {newNotes.length > 0 ? (
                        <div>
                            <div className="tags">
                                {newNotes.slice(0, 3).map((n, i) => (
                                    <div
                                        className="tag"
                                        key={n.fromEmail + i}
                                        onClick={() => setAccept(n)}
                                    >
                                        New note from {n.fromName}!
                                    </div>
                                ))}
                            </div>
                            {newNotes.length > 3 && (
                                <p className="help">
                                    ...and {newNotes.length - 3} more :)
                                </p>
                            )}
                            {acceptError && (
                                <p className="help">{acceptError}</p>
                            )}
                        </div>
                    ) : (
                        <div className="help">No new Notes :)</div>
                    )}
                    <div>
                        <button
                            className="button"
                            onClick={() => setWrite(true)}
                        >
                            <img src="/send.svg" />
                            Send Note
                        </button>
                        {sent && <div className="help">{sent}</div>}
                    </div>
                </div>
                <div className="notes-grid">
                    {acceptedNotes.length > 0 ? (
                        acceptedNotes.map((n) => <Note key={n.id} note={n} />)
                    ) : (
                        <div className="text">No notes yet!</div>
                    )}
                </div>
                <WriteNote
                    user={user}
                    users={users}
                    active={write}
                    close={() => setWrite(false)}
                    onSend={onSend}
                />
                <AcceptNote
                    user={user}
                    note={accept}
                    close={() => setAccept(false)}
                    onSubmit={onAcceptNote}
                />
            </div>
        )
    }

    function renderGroups() {
        return <div className="text">Coming soon...</div>
    }

    return (
        <div className="home">
            <div className="header-container">
                <p className="header">{user.firstName}&apos;s Yearbook</p>
                <div className="header-links">
                    {sections.map((s) => (
                        <p
                            className={section === s ? 'active' : ''}
                            onClick={() => setSection(s.toLowerCase())}
                            key={s}
                        >
                            {s}
                        </p>
                    ))}
                </div>
            </div>
            {section === 'students' && renderStudents()}
            {section === 'groups' && renderGroups()}
            {section === 'notes' && renderNotes()}
        </div>
    )
}

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get('user')

        if (!user) {
            res.setHeader('location', '/')
            res.statusCode = 302
            res.end()
            return { props: {} }
        }

        let resp = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/getusers`)
        const users = resp.status === 200 ? await resp.json() : []

        resp = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/getnotes/${user.email}`,
        )
        const notes = resp.status === 200 ? await resp.json() : []

        return {
            props: {
                user,
                users,
                notes,
            },
        }
    },
    {
        cookieName: 'MYSITECOOKIE',
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
        password: process.env.APPLICATION_SECRET,
    },
)
