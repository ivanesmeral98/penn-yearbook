import db from '../../../utils/firestore-backend'

export default async function acceptnote(req, res) {
    if (req.method === 'GET') {
        const { noteid } = req.query
        const noteOfInterest = db.collection('notes').doc(noteid)
        await noteOfInterest
            .update({ accepted: true })
            .then(() => {
                res.status(200).send({
                    Message: 'Successfully accepted note',
                })
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    } else {
        res.status(404).send()
    }
}
