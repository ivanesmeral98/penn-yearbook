import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const app = firebase.app()
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export { auth, db, storage }
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(')
