import { useState } from 'react'

export default function AcceptNote({ active, note, onSubmit }) {
    if (!active) return <div />

    function accept() {
        fetch(`/api/acceptNote/${note.id}`, {
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
                <label className="label">From:</label>
                <div className="text">{}
                <button className="button submit" onClick={send}>
                    Submit
                </button>
            </div>
        </div>
    )
}
