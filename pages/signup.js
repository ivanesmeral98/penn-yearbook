import { useState, useEffect } from 'react'
import { withIronSession } from 'next-iron-session'
import Cookies from 'js-cookie'
import FileUpload from '../components/fileUpload'
import { schools, majors, minors } from '../helpers/constants'
import { login } from '../helpers/auth'

export default function Signup({ activities }) {
    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()

    const [selectedSchools, setSelectedSchools] = useState([])
    const [schoolSearch, setSchoolSearch] = useState()

    const [selectedMajors, setSelectedMajors] = useState([])
    const [majorSearch, setMajorSearch] = useState()

    const [selectedMinors, setSelectedMinors] = useState([])
    const [minorSearch, setMinorSearch] = useState()

    const [selectedActivities, setSelectedActivities] = useState([])
    const [activitySearch, setActivitySearch] = useState()

    const [quote, setQuote] = useState()
    const [image, setImage] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        let verifiedEmail = localStorage.getItem('verifiedEmail')
        // check for mobile cookie
        if (!verifiedEmail) {
            verifiedEmail = Cookies.get('verifiedEmail')
        }
        // neither on desktop nor mobile
        if (!verifiedEmail) window.location.assign('/')
        else {
            setEmail(verifiedEmail)
            localStorage.removeItem('verifiedEmail')
            Cookies.remove('verifiedEmail')
        }
    }, [])

    function removeQuotes(str) {
        let newStr = str
        if (newStr.charAt(0) === '"') newStr = newStr.substring(1)
        if (newStr.charAt(newStr.length - 1) === '"')
            newStr = newStr.substring(0, newStr.length - 1)
        return newStr
    }

    async function submit() {
        if (
            !firstName ||
            !lastName ||
            !selectedSchools.length ||
            !selectedMajors.length
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
                    quote: removeQuotes(quote),
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
                console.error('Error creating user', err)
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
                                <div className="names-input-container">
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
                                    <label className="label">Minor(s)</label>
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
                                            selectedMinors.map((n) => (
                                                <span className="tag" key={n}>
                                                    {n}
                                                </span>
                                            ))}
                                    </div>
                                    {minorSearch &&
                                        minors.map((n) =>
                                            n
                                                .toLowerCase()
                                                .indexOf(
                                                    minorSearch.toLowerCase(),
                                                ) !== -1 ? (
                                                <p
                                                    key={n}
                                                    className="option"
                                                    onClick={() => {
                                                        setMinorSearch('')
                                                        if (
                                                            selectedMinors.includes(
                                                                n,
                                                            )
                                                        )
                                                            return
                                                        setSelectedMinors([
                                                            n,
                                                            ...selectedMinors,
                                                        ])
                                                    }}
                                                >
                                                    {n}
                                                </p>
                                            ) : null,
                                        )}
                                </div>
                                <div className="field">
                                    <label className="label">Activities</label>
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Search for an activity..."
                                        onChange={(e) =>
                                            setActivitySearch(e.target.value)
                                        }
                                        value={activitySearch}
                                    />
                                    <span
                                        className="button link"
                                        onClick={() =>
                                            setSelectedActivities([])
                                        }
                                    >
                                        Clear
                                    </span>
                                    <div className="tags">
                                        {selectedActivities &&
                                            selectedActivities.map((a) => (
                                                <span className="tag" key={a}>
                                                    {a}
                                                </span>
                                            ))}
                                    </div>
                                    {activitySearch &&
                                        activities.map((a) =>
                                            a
                                                .toLowerCase()
                                                .indexOf(
                                                    activitySearch.toLowerCase(),
                                                ) !== -1 ? (
                                                <p
                                                    key={a}
                                                    className="option"
                                                    onClick={() => {
                                                        setActivitySearch('')
                                                        if (
                                                            selectedActivities.includes(
                                                                a,
                                                            )
                                                        )
                                                            return
                                                        setSelectedActivities([
                                                            a,
                                                            ...selectedActivities,
                                                        ])
                                                    }}
                                                >
                                                    {a}
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

        const resp = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/getactivities`,
        )
        const activities = resp.status === 200 ? await resp.json() : []
        return {
            props: { activities: activities.map((a) => a.name) },
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
