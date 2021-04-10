import { withIronSession } from 'next-iron-session'
import { useState } from 'react'
import Student from '../components/student'
import StudentModal from '../components/studentModal'
import { alphaFilters } from '../helpers/constants'

const sections = ['students', 'groups', 'notes']

export default function Home({ user, users }) {
    const [section, setSection] = useState('students')
    const [filter, setFilter] = useState()
    const [selected, setSelected] = useState()

    return (
        <div className="home">
            <div className="header-container">
                <p className="header">Hey, {user.firstName}</p>
                <div className="header-links">
                    {sections.map((s) => (
                        <p
                            className={section === s && 'active'}
                            onClick={() => setSection(s)}
                            key={s}
                        >
                            {s}
                        </p>
                    ))}
                </div>
            </div>
            <div className="grid-container">
                {section === 'students' && (
                    <>
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
                                        filter === a
                                            ? 'active filter'
                                            : 'filter'
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
                    </>
                )}
            </div>
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

        const resp = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/getusers`,
        )
        const users = resp.status === 200 ? await resp.json() : []
        return {
            props: { user, users },
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
