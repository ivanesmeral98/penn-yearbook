import { useRef } from 'react'

export default function FileUpload(props) {
    const hiddenFileInput = useRef(null)
    const { handleFile } = props

    function handleClick() {
        hiddenFileInput.current.click()
    }

    function handleChange(event) {
        const file = event.target.files[0]
        handleFile(file)
    }

    return (
        <div className="clickable" onClick={handleClick}>
            <input
                type="file"
                accept="image/*"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            <div className="button">Upload Image</div>
        </div>
    )
}
