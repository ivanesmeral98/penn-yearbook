import db from '../../utils/firestore-backend'

export default function getactivities(req, res) {
    if (req.method === 'GET') {
        const activities = db.collection('activities').orderBy('name', 'asc')
        activities
            .get()
            .then((result) => {
                const data = result.docs.map((doc) => doc.data())
                res.status(200).send(data)
            })
            .catch((error) => {
                console.error('Error getting activities', error)
                res.status(500).send()
            })
    }
}
