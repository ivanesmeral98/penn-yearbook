import db from '../../../utils/firestore-backend'

export default function deletenote(req, res) {
    if (req.method === 'GET') {
        const { noteid } = req.query
        const noteOfInterest = db.collection('notes').doc(noteid)
        // checking existence of note
        noteOfInterest.get().then((doc) => {
            if (doc.exists) {
                noteOfInterest
                    .delete()
                    .then(() =>
                        res
                            .status(200)
                            .send({ Message: 'Note Successfully Deleted!' }),
                    )
                    .catch((err) => {
                        res.status(500).send({ 'Message:': err })
                    })
            } else {
                res.status(500).send({
                    'Message:': 'ID Does not match a note, could not delete',
                })
            }
        })
    }
}
