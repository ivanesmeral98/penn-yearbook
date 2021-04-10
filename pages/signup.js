import { useState, useEffect } from 'react'
import { withIronSession } from 'next-iron-session'
import FileUpload from '../components/fileUpload'
import { schools, majors, minors } from '../helpers/constants'
import { login } from '../helpers/auth'

export default function Signup() {
    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [selectedSchools, setSelectedSchools] = useState([])
    const [schoolSearch, setSchoolSearch] = useState()
    const [selectedMajors, setSelectedMajors] = useState([])
    const [majorSearch, setMajorSearch] = useState()
    const [selectedMinors, setSelectedMinors] = useState([])
    const [minorSearch, setMinorSearch] = useState()
    const [quote, setQuote] = useState()
    const [image, setImage] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const verifiedEmail = localStorage.getItem('verifiedEmail')
        if (!verifiedEmail) window.location.assign('/')
        else {
            setEmail(verifiedEmail)
            localStorage.removeItem('verifiedEmail')
        }
    }, [])

    async function submit() {
        if (
            !firstName ||
            !lastName ||
            !selectedSchools.length ||
            !selectedMajors.length ||
            !selectedMinors.length
        ) {
            setError('required')
            return
        }
        await fetch(`/api/adduser`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    email,
                    firstName,
                    lastName,
                    quote,
                    image,
                    schools: selectedSchools,
                    majors: selectedMajors,
                    minors: selectedMinors,
                },
            }),
        })
            .then((resp) => resp.json())
            .then(({ user }) => {
                login(user)
            })
            .catch((err) => {
                console.log('Error creating user', err)
                setError('user')
            })
    }

    return (
        <div className="signup">
            <div className="gray-background">
                <p className="header">Create a Profile</p>
            </div>
            <div className="form">
                {error === 'required' && (
                    <p className="text">Please enter all required fields.</p>
                )}
                {error === 'user' && (
                    <p className="text">
                        Error creating user, please try again.
                    </p>
                )}
                {error === 'photo' && (
                    <p className="text">
                        Error uploading photo, please try again.
                    </p>
                )}
                {email ? (
                    <>
                        <div className="columns">
                            <div className="column">
                                <div className="is-flex">
                                    <div className="field">
                                        <label className="label">
                                            First Name*
                                        </label>
                                        <input
                                            className="input name"
                                            type="text"
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="field">
                                        <label className="label">
                                            Last Name*
                                        </label>
                                        <input
                                            className="input name"
                                            type="text"
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Quote</label>
                                    <textarea
                                        className="textarea"
                                        type="text"
                                        onChange={(e) =>
                                            setQuote(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="field">
                                    {image && (
                                        <img className="image" src={image} />
                                    )}
                                    <FileUpload handleFile={setImage} />
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">School(s)*</label>
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Search for your school..."
                                        onChange={(e) =>
                                            setSchoolSearch(e.target.value)
                                        }
                                        value={schoolSearch}
                                    />
                                    <span
                                        className="button link"
                                        onClick={() => setSelectedSchools([])}
                                    >
                                        Clear
                                    </span>
                                    <div className="tags">
                                        {selectedSchools &&
                                            selectedSchools.map((s) => (
                                                <span className="tag" key={s}>
                                                    {s}
                                                </span>
                                            ))}
                                    </div>
                                    {schoolSearch &&
                                        schools.map((s) =>
                                            s
                                                .toLowerCase()
                                                .indexOf(
                                                    schoolSearch.toLowerCase(),
                                                ) !== -1 ? (
                                                <p
                                                    key={s}
                                                    className="option"
                                                    onClick={() => {
                                                        setSchoolSearch('')
                                                        if (
                                                            selectedSchools.includes(
                                                                s,
                                                            )
                                                        )
                                                            return
                                                        setSelectedSchools([
                                                            s,
                                                            ...selectedSchools,
                                                        ])
                                                    }}
                                                >
                                                    {s}
                                                </p>
                                            ) : null,
                                        )}
                                </div>
                                <div className="field">
                                    <label className="label">Major(s)*</label>
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Search for your major..."
                                        onChange={(e) =>
                                            setMajorSearch(e.target.value)
                                        }
                                        value={majorSearch}
                                    />
                                    <span
                                        className="button link"
                                        onClick={() => setSelectedMajors([])}
                                    >
                                        Clear
                                    </span>
                                    <div className="tags">
                                        {selectedMajors &&
                                            selectedMajors.map((m) => (
                                                <span key={m} className="tag">
                                                    {m}
                                                </span>
                                            ))}
                                    </div>
                                    {majorSearch &&
                                        majors.map((m) =>
                                            m
                                                .toLowerCase()
                                                .indexOf(
                                                    majorSearch.toLowerCase(),
                                                ) !== -1 ? (
                                                <p
                                                    key={m}
                                                    className="option"
                                                    onClick={() => {
                                                        setMajorSearch('')
                                                        if (
                                                            selectedMajors.includes(
                                                                m,
                                                            )
                                                        )
                                                            return
                                                        setSelectedMajors([
                                                            m,
                                                            ...selectedMajors,
                                                        ])
                                                    }}
                                                >
                                                    {m}
                                                </p>
                                            ) : null,
                                        )}
                                </div>
                                <div className="field">
                                    <label className="label">Minor(s)*</label>
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Search for your minor..."
                                        onChange={(e) =>
                                            setMinorSearch(e.target.value)
                                        }
                                        value={minorSearch}
                                    />
                                    <span
                                        className="button link"
                                        onClick={() => setSelectedMinors([])}
                                    >
                                        Clear
                                    </span>
                                    <div className="tags">
                                        {selectedMinors &&
                                            selectedMinors.map((m) => (
                                                <span key={m} className="tag">
                                                    {m}
                                                </span>
                                            ))}
                                    </div>
                                    {minorSearch &&
                                        minors.map((mi) =>
                                            mi
                                                .toLowerCase()
                                                .indexOf(
                                                    minorSearch.toLowerCase(),
                                                ) !== -1 ? (
                                                <p
                                                    key={mi}
                                                    className="option"
                                                    onClick={() => {
                                                        setMinorSearch('')
                                                        if (
                                                            selectedMinors.includes(
                                                                mi,
                                                            )
                                                        )
                                                            return
                                                        setSelectedMinors([
                                                            mi,
                                                            ...selectedMinors,
                                                        ])
                                                    }}
                                                >
                                                    {mi}
                                                </p>
                                            ) : null,
                                        )}
                                </div>
                            </div>
                        </div>
                        <button className="button submit" onClick={submit}>
                            Submit
                        </button>
                    </>
                ) : (
                    <p className="text loading">Loading...</p>
                )}
            </div>
        </div>
    )
}

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get('user')

        if (user) {
            res.setHeader('location', '/home')
            res.statusCode = 302
            res.end()
        }

        return {
            props: {},
        }
    },
    {
        cookieName: 'MYSITECOOKIE',
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
        password: process.env.APPLICATION_SECRET,
    },
)
