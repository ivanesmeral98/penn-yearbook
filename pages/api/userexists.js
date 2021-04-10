import db from '../../utils/firestore-backend'

export default function adduser(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query
        const users = db.collection('users').doc(email)
        users.get().then((snapshot) => {
            if (snapshot.exists) {
                users.onSnapshot((doc) => {
                    res.send(doc.data())
                })
            } else {
                res.send({})
            }
        })
    }
}
