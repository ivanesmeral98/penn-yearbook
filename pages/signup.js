import { useState, useEffect } from 'react'
import FileUpload from '../components/fileUpload'
import { schools, majors, minors } from '../helpers/constants'

export default function Signup() {
    const [email, setEmail] = useState('evakill@seas.upenn.edu')
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [selectedSchools, setSelectedSchools] = useState([])
    const [schoolSearch, setSchoolSearch] = useState()
    const [selectedMajors, setSelectedMajors] = useState([])
    const [majorSearch, setMajorSearch] = useState()
    const [selectedMinors, setSelectedMinors] = useState([])
    const [minorSearch, setMinorSearch] = useState()
    // const [activities, setActivities] = useState()
    const [quote, setQuote] = useState()
    const [image, setImage] = useState()
    const [err, setErr] = useState()

    useEffect(() => {
        // const email = localStorage.getItem('verifiedEmail')
        // if (!email) window.location.assign('/')
        // else {
        //     setEmail(email)
        //     localStorage.removeItem('verifiedEmail')
        // }
    }, [])

    async function uploadFile() {
        const photoData = new FormData()
        photoData.append('image', image)
        await fetch(`/api/imageupload`, {
            method: 'POST',
            body: photoData,
            header: {
                'content-type': 'multipart/form-data',
            },
        })
            .then((resp) => resp.json())
            .then(() => {})
            .catch((err) => {
                console.log('Error setting photo', err)
                setErr('photo')
            })
    }

    async function submit() {
        if (!firstName) {
            setErr('required')
            return
        }
        if (!lastName) {
            setErr('required')
            return
        }
        await fetch(`/api/createuser`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                firstName,
                lastName,
                schools: selectedSchools,
                majors: selectedMajors,
                minors: selectedMinors,
            }),
            header: {
                'content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then(() => {})
            .catch((err) => {
                console.log('Error creating user', err)
                setErr('user')
            })
    }

    return (
        <div className="signup">
            <div className="gray-background">
                <p className="header">Create a Profile</p>
            </div>
            <div className="form">
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
                                            className="input"
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
                                            className="input"
                                            type="text"
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Quote</label>
                                    <input
                                        className="input long"
                                        type="text"
                                        onChange={(e) =>
                                            setQuote(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="field">
                                    {image && (
                                        <img
                                            className="image"
                                            src={URL.createObjectURL(image)}
                                        />
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
                                    <button
                                        className="button"
                                        onClick={() => setSelectedSchools([])}
                                    >
                                        Clear
                                    </button>
                                    <div className="tags">
                                        {selectedSchools &&
                                            selectedSchools.map((s) => (
                                                <span className="tag">{s}</span>
                                            ))}
                                    </div>
                                    {schoolSearch &&
                                        schools.map((s) => {
                                            if (
                                                s
                                                    .toLowerCase()
                                                    .indexOf(
                                                        schoolSearch.toLowerCase(),
                                                    ) !== -1
                                            )
                                                return (
                                                    <p
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
                                                )
                                        })}
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
                                    <button
                                        className="button"
                                        onClick={() => setSelectedMajors([])}
                                    >
                                        Clear
                                    </button>
                                    <div className="tags">
                                        {selectedMajors &&
                                            selectedMajors.map((m) => (
                                                <span className="tag">{m}</span>
                                            ))}
                                    </div>
                                    {majorSearch &&
                                        majors.map((m) => {
                                            if (
                                                m
                                                    .toLowerCase()
                                                    .indexOf(
                                                        majorSearch.toLowerCase(),
                                                    ) !== -1
                                            )
                                                return (
                                                    <p
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
                                                )
                                        })}
                                </div>
                                <div className="field">
                                    <label className="label">Minor(s)*</label>
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Search for your major..."
                                        onChange={(e) =>
                                            setMinorSearch(e.target.value)
                                        }
                                        value={minorSearch}
                                    />
                                    <button
                                        className="button"
                                        onClick={() => setSelectedMinors([])}
                                    >
                                        Clear
                                    </button>
                                    <div className="tags">
                                        {selectedMinors &&
                                            selectedMinors.map((m) => (
                                                <span className="tag">{m}</span>
                                            ))}
                                    </div>
                                    {minorSearch &&
                                        minors.map((m) => {
                                            if (
                                                m
                                                    .toLowerCase()
                                                    .indexOf(
                                                        minorSearch.toLowerCase(),
                                                    ) !== -1
                                            )
                                                return (
                                                    <p
                                                        className="option"
                                                        onClick={() => {
                                                            setMinorSearch('')
                                                            if (
                                                                selectedMinors.includes(
                                                                    m,
                                                                )
                                                            )
                                                                return
                                                            setSelectedMinors([
                                                                m,
                                                                ...selectedMinors,
                                                            ])
                                                        }}
                                                    >
                                                        {m}
                                                    </p>
                                                )
                                        })}
                                </div>
                            </div>
                        </div>
                        <button className="button submit">Submit</button>
                    </>
                ) : (
                    <p className="text loading">Loading...</p>
                )}
            </div>
        </div>
    )
}
