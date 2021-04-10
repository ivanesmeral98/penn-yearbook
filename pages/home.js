import { withIronSession } from 'next-iron-session'
import { useState } from 'react'
import Student from '../components/student'

export default function Home({ user, users }) {
    const [section, setSection] = useState('students')

    return (
        <div className="home">
            <div className="header-container">
                <p className="header">Hey, {user.firstName}</p>
                <div className="header-links">
                    <p
                        className={section === 'students' && 'active'}
                        onClick={() => setSection('students')}
                    >
                        Students
                    </p>
                    <p
                        className={section === 'groups' && 'active'}
                        onClick={() => setSection('groups')}
                    >
                        Groups
                    </p>
                    <p
                        className={section === 'notes' && 'active'}
                        onClick={() => setSection('notes')}
                    >
                        Notes
                    </p>
                </div>
            </div>
            <div className="user-grid">
                {users.map((u) => (
                    <Student key={u.email} user={user} />
                ))}
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
