import db from '../../../utils/firestore-backend'

export default function getGroups(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query
        const userRef = db.collection('users').doc(email)

        db.collection('groups')
            .where('members', 'array-contains', userRef)
            .get()
            .then(async (groups) => {
                const groupsPromise = groups.docs.map(async (doc) => {
                    const group = doc.data()
                    const membersPromise = group.members.map((ref) =>
                        ref.get().then((member) => member.data()),
                    )
                    const members = await Promise.all(membersPromise).then(
                        (vals) => vals,
                    )
                    return { ...group, members }
                })
                const data = await Promise.all(groupsPromise).then(
                    (vals) => vals,
                )
                res.status(200).send(data)
            })
    } else {
        console.log('NEED GET REQUEST')
    }
}
