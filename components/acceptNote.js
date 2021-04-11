export default function AcceptNote({ close, note, onSubmit }) {
    if (!note) return <div />

    function accept() {
        fetch(`/api/acceptNote/${note.id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    const newNote = { ...note, accepted: true }
                    onSubmit('Accepted', newNote)
                } else {
                    onSubmit('Error')
                }
            })
            .catch((err) => {
                console.error('Error accepting note', err)
                onSubmit('Error')
            })
    }

    function deny() {
        fetch(`/api/deleteNote/${note.id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    onSubmit('Deleted', note)
                } else {
                    onSubmit('Error')
                }
            })
            .catch((err) => {
                console.error('Error deleting note', err)
                onSubmit('Error')
            })
    }

    return (
        <div className="modal accept-note is-active">
            <div className="modal-background" onClick={close}></div>
            <div className="modal-content">
                <span className="close" onClick={close}>
                    <img src="/x-circle.svg" />
                </span>
                <label className="label">From:</label>
                <div className="text">
                    {note.fromName} ({note.fromEmail})
                </div>
                <label className="label">Message:</label>
                <div className="text">{note.message}</div>
                <div className="button-container">
                    <button className="button link" onClick={deny}>
                        No, thanks
                    </button>
                    <button className="button submit" onClick={accept}>
                        Accept
                    </button>
                </div>
                <p className="help">
                    Accepting this note will add it to your yearbook! Clicking
                    &quot;No, thanks&quot; will delete the note. This action
                    cannot be undone.
                </p>
            </div>
        </div>
    )
}
