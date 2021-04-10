import db from '../../utils/firestore-backend'

export default function adduser(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const { user } = req.body
        db.collection('users')
            .doc(user.email)
            .set(user)
            .then(() => {
                console.log('Created user successfully')
                res.status(200).send({ user })
            })
            .catch((err) => {
                console.log(err)
                res.status(403).send({
                    err: 'Error putting user in DB',
                })
            })
    } else {
        // Handle any other HTTP method
    }
}
