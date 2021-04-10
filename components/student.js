export default function Student({ user }) {
    return (
        <div className="student">
            <img className="image" src={user.image} />
            <p className="text bold">
                {user.firstName} {user.lastName}
            </p>
            <p className="help">&quot;{user.quote}&quot;</p>
        </div>
    )
}
