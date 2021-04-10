import { useState } from 'react'
import Head from '../components/head'

export default function Index() {
    const [email, setEmail] = useState()

    function submit() {
        console.log(email)
    }

    return (
        <div className="index">
            <Head />
            <div className="background">
                <p className="title">Class of 2021 Digital Yearbook</p>
                <div className="is-flex">
                    <div className="field">
                        <input
                            className="input"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="help">Sign in with your Penn email</p>
                    </div>
                    <button className="button" onClick={submit}>
                        Enter
                    </button>
                </div>
            </div>
        </div>
    )
}
