export default function Student({ note }) {
    return (
        <div className="note">
            <div className="text">{note.message}</div>
            <label className="label">-{note.fromName}</label>
        </div>
    )
}
