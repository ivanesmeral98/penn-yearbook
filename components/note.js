export default function Student({ note }) {
    return (
        <div className="note">
            <p className="text bold">
                {note.message}
            </p>
        </div>
    )
}
