import db from '../../utils/firestore-backend'

export default function sendNote(req, res) {
    if (req.method === 'POST') {
        const {
            fromFirstName,
            fromLastName,
            fromEmail,
            toEmail,
            toGroup,
            message,
            accepted,
        } = req.body
        const note = {
            fromName: `${fromFirstName} ${fromLastName}`,
            fromEmail,
            toEmail: toEmail || '',
            toGroup: toGroup || '',
            message,
            accepted,
        }
        db.collection('notes')
            .add(note)
            .then(() => {
                res.status(200).send({
                    note,
                })
            })
            .catch((err) => {
                res.status(403).send({
                    err: `Error putting user in DB${err}`,
                })
            })
    } else {
        // Handle any other HTTP method
        res.status(500)
        res.end()
    }
}
