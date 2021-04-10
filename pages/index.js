import { useState, useEffect } from 'react'
import { withIronSession } from 'next-iron-session'
import { sendVerification, completeSignIn, login } from '../helpers/auth'

export default function Index() {
    const [email, setEmail] = useState()
    const [status, setStatus] = useState('loading')

    // This is called from the auth helper file with the user object if successful
    function signIn(authUser) {
        if (!authUser) {
            setStatus('linkFailed')
            return
        }
        // Check if account has been created, if so complete auth, if not go to signup
        fetch(`/api/userexists?email=${authUser.email}`)
            .then((resp) => resp.json())
            .then(({ user }) => {
                if (user) login(user)
                else {
                    localStorage.setItem('verifiedEmail', authUser.email)
                    window.location.assign('/signup')
                }
            })
            .catch((err) => console.log('Error in fetch', err))
    }

    useEffect(() => {
        const signInEmail = localStorage.getItem('emailForSignIn')
        /*
         If there is an email stored and the url has verification parameters, trigger the firebase auth function with signin as a callback.  If the url has verification parameters but no email is stored, link has already been used. Otherwise, this is a new login
         */
        if (signInEmail && window.location.search)
            completeSignIn(signInEmail, signIn)
        else if (!signInEmail && window.location.search) setStatus('linkFailed')
        else setStatus('ready')
    }, [])

    return (
        <div className="index">
            <div className="blue-background">
                <p className="title">Class of 2021 Digital Yearbook</p>
                {status === 'ready' ? (
                    <div className="is-flex">
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className="icon is-small is-left">
                                    <img src="/mail.svg" />
                                </span>
                            </p>
                            <p className="help">Sign in with your Penn email</p>
                        </div>
                        <button
                            className="button"
                            onClick={() => sendVerification(email, setStatus)}
                        >
                            Enter
                        </button>
                    </div>
                ) : (
                    <div className="text">
                        {status === 'loading' && 'Loading...'}
                        {status === 'emailSent' &&
                            'A verification link has been sent to your email. You can close this window.'}
                        {status === 'emailError' &&
                            'Sorry, something went wrong. Please try again.'}
                        {status === 'linkFailed' && (
                            <p>
                                This verification link is expired.{' '}
                                <a href="/">Please try again.</a>
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get('user')

        if (user) {
            res.setHeader('location', '/home')
            res.statusCode = 302
            res.end()
        }

        return {
            props: {},
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
