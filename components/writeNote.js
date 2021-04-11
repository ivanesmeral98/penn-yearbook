import { useState } from 'react'

export default function WriteNote({ active, user, users, close, onSend }) {
    if (!active) return <div />
    const [toEmail, setToEmail] = useState()
    const [toSearch, setToSeach] = useState()
    const [message, setMessage] = useState()
    const [error, setError] = useState()

    function send() {
        if (!toEmail || !message) {
            setError('Please fill out the required fields.')
            return
        }
        fetch('/api/sendnote', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                fromFirstName: user.firstName,
                fromLastName: user.lastName,
                fromEmail: user.email,
                toEmail,
                message,
            }),
        }).then((resp) => {
            if (resp.status === 200) {
                onSend(true)
                close()
            } else {
                onSend(false)
                close()
            }
        })
    }

    return (
        <div className="modal write-note is-active">
            <div className="modal-background" onClick={close}></div>
            <div className="modal-content">
                <span className="close" onClick={close}>
                    <img src="/x-circle.svg" />
                </span>

                <div className="field">
                    <label className="label">To</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Search by name or email..."
                        onChange={(e) => !toEmail && setToSeach(e.target.value)}
                        value={toSearch}
                        disabled={toEmail}
                    />
                    <span
                        className="button link"
                        onClick={() => setToEmail('')}
                    >
                        Clear
                    </span>
                    <div className="tags">
                        {toEmail && <span className="tag">{toEmail}</span>}
                    </div>
                    {toSearch &&
                        users.map((u) =>
                            (u.email
                                .toLowerCase()
                                .indexOf(toSearch.toLowerCase()) !== -1 ||
                                u.firstName
                                    .toLowerCase()
                                    .indexOf(toSearch.toLowerCase()) !== -1 ||
                                u.lastName
                                    .toLowerCase()
                                    .indexOf(toSearch.toLowerCase()) !== -1 ||
                                `${u.firstName} ${u.lastName}`
                                    .toLowerCase()
                                    .indexOf(toSearch.toLowerCase())) !== -1 ? (
                                <p
                                    key={u.email}
                                    className="option"
                                    onClick={() => {
                                        setToSeach('')
                                        setToEmail(u.email)
                                    }}
                                >
                                    {u.firstName} {u.lastName} ({u.email})
                                </p>
                            ) : null,
                        )}
                </div>
                <div className="field">
                    <label className="label">Message</label>
                    <textarea
                        className="textarea"
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                {error && <div className="text">{error}</div>}
                <div className="button-container">
                    <button className="button submit" onClick={send}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
