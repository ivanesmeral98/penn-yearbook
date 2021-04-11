import { useState } from 'react'

export default function AddMembers({ group, users, close, onAdd }) {
    if (!group) return <div />
    const [addUser, setAddUser] = useState()
    const [addSearch, setAddSeach] = useState()
    const [error, setError] = useState()

    function add() {
        if (!addUser) {
            setError('Please fill out the required fields.')
            return
        }
        if (group.members.find((u) => u.email === addUser.email)) {
            setError('User is already in group.')
            return
        }
        fetch('/api/addtogroup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email: addUser.email,
                groupName: group.name,
            }),
        }).then((resp) => {
            if (resp.status === 200) {
                onAdd(true, addUser)
                close()
            } else {
                onAdd(false)
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
                    <label className="label">Student</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Search by name or email..."
                        onChange={(e) =>
                            !addUser && setAddSeach(e.target.value)
                        }
                        value={addSearch}
                        disabled={addUser}
                    />
                    <span className="button link" onClick={() => setAddUser()}>
                        Clear
                    </span>
                    <div className="tags">
                        {addUser && (
                            <span className="tag">
                                {addUser.firstName} {addUser.lastName}
                            </span>
                        )}
                    </div>
                    {addSearch &&
                        users.map((u) =>
                            (u.email
                                .toLowerCase()
                                .indexOf(addSearch.toLowerCase()) !== -1 ||
                                u.firstName
                                    .toLowerCase()
                                    .indexOf(addSearch.toLowerCase()) !== -1 ||
                                u.lastName
                                    .toLowerCase()
                                    .indexOf(addSearch.toLowerCase()) !== -1 ||
                                `${u.firstName} ${u.lastName}`
                                    .toLowerCase()
                                    .indexOf(addSearch.toLowerCase())) !==
                            -1 ? (
                                <p
                                    key={u.email}
                                    className="option"
                                    onClick={() => {
                                        setAddSeach('')
                                        setAddUser(u)
                                    }}
                                >
                                    {u.firstName} {u.lastName} ({u.email})
                                </p>
                            ) : null,
                        )}
                </div>
                {error && <div className="text">{error}</div>}
                <div className="button-container">
                    <button className="button submit" onClick={add}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}
