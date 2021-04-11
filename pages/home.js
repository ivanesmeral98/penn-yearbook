import { withIronSession } from 'next-iron-session'
import { useState } from 'react'
import Student from '../components/student'
import StudentModal from '../components/studentModal'
import WriteNote from '../components/writeNote'
import AcceptNote from '../components/acceptNote'
import Note from '../components/note'
import CreateGroup from '../components/createGroup'
import AddMember from '../components/addMember'
import { alphaFilters } from '../helpers/constants'

const sections = ['students', 'groups', 'notes']

export default function Home({ user, users, notes, groups }) {
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
    const [sent, setSent] = useState()
    const [acceptError, setAcceptError] = useState()
    const [allGroups, setAllGroups] = useState(groups)
    const [group, setGroup] = useState(groups[0] || {})
    const [create, setCreate] = useState()
    const [createError, setCreateError] = useState()
    const [addMember, setAddMember] = useState()
    const [addError, setAddError] = useState()

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

    function onCreateGroup(success, newGroup) {
        if (success) {
            setAllGroups([newGroup, ...allGroups])
            setGroup(newGroup)
        } else {
            setCreateError('Sorry, something went wrong. Please try again.')
        }
    }

    function onAddMember(success, newUser) {
        if (success) {
            const newGroup = { ...group, members: [newUser, ...group.members] }
            const newGroups = allGroups.map((g) =>
                g.name === newGroup.name ? newGroup : g,
            )
            setAllGroups(newGroups)
            setGroup(newGroup)
        } else {
            setAddError('Error adding user, please try again.')
            setTimeout(() => setAddError(), 5000)
        }
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
        return (
            <div className="groups-container">
                <div className="groups-list">
                    {allGroups.length > 0 ? (
                        allGroups.map((g) => (
                            <div
                                className={
                                    group.name === g.name
                                        ? 'option active'
                                        : 'option'
                                }
                                onClick={() => setGroup(g)}
                                key={g.name}
                            >
                                {g.name}
                            </div>
                        ))
                    ) : (
                        <p className="help">No groups yet!</p>
                    )}
                    <button className="button" onClick={() => setCreate(user)}>
                        <img src="/users.svg" />
                        Create Group
                    </button>
                    {createError && <p className="help">{createError}</p>}
                </div>
                <div className="group-page">
                    <div className="group-header">
                        <div>
                            <p className="group-name">{group.name}</p>
                            <p className="text">{group.description}</p>
                            <div className="tags">
                                {group.members.map((m) => (
                                    <div className="tag" key={m.email}>
                                        {m.firstName} {m.lastName}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <button
                                className="button"
                                onClick={() => setAddMember(group)}
                            >
                                <img src="/user-plus.svg" />
                                Add Members
                            </button>
                            {addError && <p className="help">{addError}</p>}
                        </div>
                    </div>
                </div>
                <CreateGroup
                    user={create}
                    close={() => setCreate()}
                    onCreate={onCreateGroup}
                />
                <AddMember
                    group={addMember}
                    users={users}
                    close={() => setAddMember()}
                    onAdd={onAddMember}
                />
            </div>
        )
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

        resp = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/getgroups/${user.email}`,
        )
        const groups = resp.status === 200 ? await resp.json() : []

        return {
            props: {
                user,
                users,
                notes,
                groups,
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
