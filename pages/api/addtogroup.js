import admin from 'firebase-admin'
import db from '../../utils/firestore-backend'

export default async function addtogroup(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const { groupName, email } = req.body

        const groupOfInterest = db.collection('groups').doc(groupName)
        await groupOfInterest
            .update({
                members: admin.firestore.FieldValue.arrayUnion(
                    db.doc(`users/${email}`),
                ),
            })
            .then(() => {
                res.status(200).send({
                    Message: 'Successfully added to group',
                })
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    } else {
        res.status(404).send()
    }
}
