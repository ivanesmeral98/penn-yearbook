// import db from '../../../utils/firestore-backend'
/*
export default function acceptNote(req, res) {
    if (req.method === 'GET') {
        const { accepted } = req.query
        if (accepted) {
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
                    console.log(err)
                    res.status(500).send({ ERR: err })
                })

        }
    }
}
*/