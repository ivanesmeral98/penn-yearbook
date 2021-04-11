import db from '../../../utils/firestore-backend'

export default function acceptNote(req, res) {
    if (req.method === 'GET') {
        const { noteid } = req.query
        if (accepted) {
            const noteOfInterest = db.collection('notes').doc(noteid)
            noteOfInterest
                .update({ accepted: true })
                .then(() => {
                    res.status(200).send({
                        Message: 'Successfully accepted note',
                    })
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    }
}
