import db from '../../utils/firestore-backend'

export default function adduser(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const {
            firstName,
            lastName,
            email,
            schools,
            activities,
            majors,
            minors,
            quote,
            picture,
        } = req.body
        const user = {
            firstName,
            lastName,
            email,
            schools,
            activities,
            majors,
            minors,
            quote,
            picture,
        }
        db.collection('users')
            .doc(email)
            .set(user)
            .then(() => {
                console.log('Created user successfully')
            })
            .catch((err) => {
                console.log(err)
                res.status(403).send({
                    err: 'Error putting user in DB',
                })
            })
        res.status(200).send({
            message: 'User successfully added to database.',
        })
    } else {
        // Handle any other HTTP method
    }
}
