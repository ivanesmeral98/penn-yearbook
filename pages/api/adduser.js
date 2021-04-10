import db from '../../utils/firestore-backend'

export default function adduser(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const { user } = req.body
        db.collection('users')
            .doc(user.email)
            .set(user)
            .then(() => {
                res.status(200).send({ user })
            })
            .catch((err) => {
                res.status(403).send({
                    err: `Error putting user in DB${err}`,
                })
            })
    } else {
        // Handle any other HTTP method
    }
}
