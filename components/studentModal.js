export default function StudentModal({ user, close }) {
    if (!user) return <></>
    const { firstName, lastName, image, quote, majors, schools, minors } = user
    return (
        <div className="modal student-modal is-active">
            <div className="modal-background" onClick={close}></div>
            <div className="modal-content">
                <span className="close" onClick={close}>
                    <img src="/x-circle.svg" />
                </span>
                <img className="image" src={image} />
                <div>
                    <p className="header">
                        {firstName} {lastName}
                    </p>
                    <p className="text">&quot;{quote}&quot;</p>
                    <div className="tags">
                        {schools && (
                            <>
                                <label className="label">
                                    {schools.length > 1 ? 'Schools' : 'School'}
                                </label>
                                {schools.map((s) => (
                                    <span className="tag" key={s}>
                                        {s}
                                    </span>
                                ))}
                            </>
                        )}
                    </div>
                    <div className="tags">
                        {majors && (
                            <>
                                <label className="label">
                                    {majors.length > 1 ? 'Majors' : 'Major'}
                                </label>
                                {majors.map((m) => (
                                    <span className="tag" key={m}>
                                        {m}
                                    </span>
                                ))}
                            </>
                        )}
                    </div>
                    <div className="tags">
                        {minors && (
                            <>
                                <label className="label">
                                    {minors.length > 1 ? 'Minors' : 'Minor'}
                                </label>
                                {minors.map((n) => (
                                    <span className="tag" key={n}>
                                        {n}
                                    </span>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
