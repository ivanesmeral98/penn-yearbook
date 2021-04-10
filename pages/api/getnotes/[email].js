import db from '../../../utils/firestore-backend'

export default function getNotesPerUser(req, res) {
    if (req.method === 'GET') {
        const vals = []
        const { email } = req.query
        const notes = db.collection('notes')
        notes
            .where('toEmail', '==', email)
            .get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    res.status(404).send({ Message: 'No notes found!' })
                }
                snapshot.forEach((doc) => {
                    vals.push({ ...doc.data(), id: doc.id })
                })
                res.send({ notes: vals })
            })
            .catch((err) => {
                console.error(err)
                res.status(500).send({ ERR: err })
            })
    }
}
