import { withIronSession } from 'next-iron-session'

export default withIronSession(
    async (req, res) => {
        if (req.method === 'POST') {
            const { user } = req.body
            req.session.set('user', user)
            await req.session.save()
            return res.status(200).send()
        }
        return res.status(404).send()
    },
    {
        cookieName: 'MYSITECOOKIE',
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
        password: process.env.APPLICATION_SECRET,
    },
)
