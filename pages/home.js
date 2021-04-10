import { withIronSession } from 'next-iron-session'
import { useState } from 'react'
import Student from '../components/student'
import StudentModal from '../components/studentModal'
import WriteNote from '../components/writeNote'
import { alphaFilters } from '../helpers/constants'

const sections = ['students', 'groups', 'notes']

export default function Home({ user, users, notes }) {
    const [section, setSection] = useState('students')
    const [filter, setFilter] = useState()
    const [selected, setSelected] = useState()
    const [newNotes] = useState(notes.filter((n) => !n.accepted))
    const [acceptedNotes] = useState(notes.filter((n) => n.accepted))
    const [write, setWrite] = useState(false)
    const [sent, setSent] = useState()

    async function onSend(success) {
        setSent(
            success
                ? 'Message sent successfully!'
                : 'Error sending message, please try again.',
        )
        setTimeout(() => setSent(), 5000)
    }

    function renderStudents() {
        return (
            <div className="students-container">
                <div className="user-grid">
                    {users.map((u) =>
                        filter &&
                        u.lastName.charAt(0).toLowerCase() <
                            filter.toLowerCase() ? null : (
                            <span onClick={() => setSelected(u)}>
                                <Student key={u.email} user={u} />
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
                                {newNotes.slice(0, 3).map((n) => (
                                    <div className="tag" key={n.fromEmail}>
                                        New note from {n.fromName}!
                                    </div>
                                ))}
                            </div>
                            {newNotes.length > 3 && (
                                <p className="help">
                                    ...and {newNotes.length - 3} more :)
                                </p>
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
                <div className="notes-grid"></div>
                <WriteNote
                    user={user}
                    users={users}
                    active={write}
                    close={() => setWrite(false)}
                    onSend={onSend}
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
                <p className="header">Hey, {user.firstName}</p>
                <div className="header-links">
                    {sections.map((s) => (
                        <p
                            className={section === s && 'active'}
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
