import db from '../../utils/firestore-backend'

export default function getusers(req, res) {
    if (req.method === 'GET') {
        const users = db.collection('users').orderBy('lastName', 'asc')
        users
            .get()
            .then((result) => {
                const data = result.docs.map((doc) => doc.data())
                res.status(200).send(data)
            })
            .catch((error) => {
                console.error('Error getting users', error)
                res.status(500).send()
            })
    }
}
