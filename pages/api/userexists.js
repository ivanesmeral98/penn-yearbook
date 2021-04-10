import db from '../../utils/firestore-backend'

export default function userexists(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query
        console.log('here', email)
        const users = db.collection('users').doc(email)
        users.get().then((doc) => {
            if (doc.exists) {
                res.send(doc.data())
            } else {
                res.send({})
            }
        })
    }
}
