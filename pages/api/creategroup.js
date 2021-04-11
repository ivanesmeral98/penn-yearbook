import db from '../../utils/firestore-backend'

export default function creategroup(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        const { name, description } = req.body
        const group = {
            name,
            description,
        }
        console.log(group)
        const groupOfInterest = db.collection('groups').doc(name)
        // checking existence of group, if already made then dont make
        groupOfInterest
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    db.collection('groups')
                        .doc(name)
                        .set(group)
                        .then(() => {
                            res.status(200).send({ ...group, id: name })
                        })
                        .catch((err) => {
                            res.status(403).send({
                                err: `Error putting group in DB${err}`,
                            })
                        })
                } else {
                    res.status(500).send({
                        err: `Group aleady exists in DB`,
                    })
                }
            })
            .catch(() => {
                res.status(404).send({ Message: 'Group already exists!' })
            })
    } else {
        // Handle any other HTTP method
    }
}
