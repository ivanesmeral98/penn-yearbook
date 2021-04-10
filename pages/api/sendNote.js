import db from '../../utils/firestore-backend'

export default function sendNote(req, res) {
    if (req.method === 'POST') {
        const {
            fromEmail,
            toEmail,
            toGroup,
            message,
            accepted,
            photo,
        } = req.body
        const note = {
            fromEmail,
            toEmail,
            toGroup,
            message,
            accepted,
            photo,
        }
        db.collection('notes')
            .add(note)
            .then((ref) => {
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
