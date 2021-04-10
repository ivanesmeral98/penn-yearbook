import { withIronSession } from 'next-iron-session'

export default function Home({ user }) {
    if (!user) window.location.redirect('/')

    return (
        <div>
            <h1>Hello {user.email}</h1>
            <p>Secret things live here...</p>
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

        return {
            props: { user },
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
