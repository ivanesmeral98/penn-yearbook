// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '../../utils/firestore'

export default (req, res) => {
    db.collection('users')
        .get()
        .then((data) => {
            data.docs.map((u) => console.log(u))
        })
    res.status(200).send({ name: 'John Doe' })
}
