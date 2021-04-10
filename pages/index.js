import { useState, useEffect } from 'react'
import Head from '../components/head'
import { login, completeSignIn } from '../helpers/auth'

export default function Index() {
    const [email, setEmail] = useState()

    useEffect(() => {
        // Calls complete sign in when user clicks on link sent to their email -> adds to Firebase Auth
        if (localStorage.getItem('emailForSignIn')) {
            completeSignIn()
        }
    }, [])

    function onSubmit() {
        login(email)
    }

    return (
        <div className="index">
            <Head />
            <div className="background">
                <p className="title">Class of 2021 Digital Yearbook</p>
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
                    <button className="button" onClick={onSubmit}>
                        Enter
                    </button>
                </div>
            </div>
        </div>
    )
}
