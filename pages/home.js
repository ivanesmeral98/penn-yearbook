import { withIronSession } from 'next-iron-session'
import { useState } from 'react'
import Student from '../components/student'
import { alphaFilters } from '../helpers/constants'

const sections = ['students', 'groups', 'notes']

export default function Home({ user, users }) {
    const [section, setSection] = useState('students')
    const [filter, setFilter] = useState()

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
            <div className="is-flex">
                <div className="user-grid">
                    {users.map((u) =>
                        filter &&
                        u.firstName.charAt(0).toLowerCase() <
                            filter.toLowerCase() ? null : (
                            <Student key={u.email} user={user} />
                        ),
                    )}
                </div>
                <div className="filters">
                    {section === 'students' &&
                        alphaFilters.map((a) => (
                            <p
                                className={filter === a && 'active'}
                                onClick={() => setFilter(a)}
                                key={a}
                            >
                                {a}
                            </p>
                        ))}
                </div>
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

        const resp = await fetch('http://localhost:3000/api/getusers')
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
