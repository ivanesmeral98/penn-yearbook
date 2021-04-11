import db from '../../utils/firestore-backend'

export default async function getGroupNotes(req, res) {
    if (req.method === 'GET') {
        console.log('entered')
        const { groupName } = req.query
        const notes = db.collection('notes')
        const groupNotes = await notes.where('toGroup', '==', groupName).get()
        const snapshots = groupNotes.docs
        const notesOfInterest = []
        // eslint-disable-next-line no-restricted-syntax
        for (let i = 0; i < snapshots.length; i += 1) {
            const doc = snapshots[i].data()
            notesOfInterest.push(doc)
        }
        console.log(notesOfInterest)
    } else {
        // Handle any other HTTP method
        res.status(500)
        res.end()
    }
}
