import db from '../../utils/firestore-backend'

export default function addactivity(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const { name } = req.body
        db.collection('activities')
            .doc(name)
            .set({ name })
            .then(() => {
                res.status(200).send({ name })
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
