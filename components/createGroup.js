import { useState } from 'react'

export default function CreateGroup({ user, onCreate, close }) {
    if (!user) return <div />
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [error, setError] = useState()

    function create() {
        if (!name || !description) {
            setError('Please fill out the required fields.')
            return
        }
        fetch('/api/creategroup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                email: user.email,
            }),
        }).then((resp) => {
            if (resp.status === 200) {
                onCreate(true, { name, description, members: [user] })
                close()
            } else {
                onCreate(false)
                close()
            }
        })
    }

    return (
        <div className="modal create-group is-active">
            <div className="modal-background" onClick={close}></div>
            <div className="modal-content">
                <span className="close" onClick={close}>
                    <img src="/x-circle.svg" />
                </span>

                <div className="field">
                    <label className="label">Name*</label>
                    <input
                        className="input"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="label">Description*</label>
                    <textarea
                        className="textarea"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                {error && <div className="text">{error}</div>}
                <div className="button-container">
                    <button className="button submit" onClick={create}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}
