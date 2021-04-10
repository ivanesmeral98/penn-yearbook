import db from '../../utils/firestore-backend'

export default function userexists(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query
        const users = db.collection('users').doc(email)
        users.get().then((doc) => {
            if (doc.exists) {
                res.send({ user: doc.data() })
            } else {
                res.send({})
            }
        })
    }
}
