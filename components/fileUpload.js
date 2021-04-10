import FileUploader from 'react-firebase-file-uploader'
import { storage } from '../utils/firestore'

export default function FileUpload({ handleFile }) {
    function handleUploadError(err) {
        console.error(err)
    }

    function handleUploadSuccess(filename) {
        storage
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then((url) => handleFile(url))
    }

    return (
        <label className="button">
            Upload Image
            <FileUploader
                hidden
                accept="image/*"
                storageRef={storage.ref('images')}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
            />
        </label>
    )
}
