import admin from 'firebase-admin'

// Credentials accessed through environment
const serviceAccount = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_CERT_URL,
}

if (!admin.apps.length) {
    try {
        // Initialize Cloud Firestore through Firebase
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        })
    } catch (err) {
        console.log('Firebase admin initialization error', err.stack)
    }
}

export default admin.firestore()
