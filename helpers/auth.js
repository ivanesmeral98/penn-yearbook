import { auth } from '../utils/firestore'

export function sendVerification(email, callback) {
    const actionCodeSettings = {
        // Redirects to verify page
        url: 'http://localhost:3000',
        handleCodeInApp: true,
    }
    auth.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user. Save the email locally
            localStorage.setItem('emailForSignIn', email)
            callback('emailSent')
        })
        .catch((error) => {
            console.log(error.code, error.message)
            callback('emailError')
        })
}

export function completeSignIn(email, callback) {
    // Confirm the link is a sign-in with email link.
    if (auth.isSignInWithEmailLink(window.location.href)) {
        auth.signInWithEmailLink(email, window.location.href)
            .then((result) => {
                // Clear email from storage.
                window.localStorage.removeItem('emailForSignIn')
                callback(result.user)
            })
            .catch((error) => {
                console.log(error.code, error.message)
                callback()
            })
    } else callback()
}

export function login(user) {
    fetch('/api/sessions', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ user }),
    }).then((resp) => {
        if (resp.status === 200) window.location.assign('/home')
        else console.log('Error creating session', resp.status)
    })
}
