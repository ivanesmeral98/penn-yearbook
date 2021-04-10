import { auth } from '../utils/firestore'

export function login(user) {
    fetch('/api/sessions', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ user }),
    }).then((resp) => {
        if (resp.status === 200) window.location.assign('/home')
        else console.error('Error creating session', resp.status)
    })
}

export function sendVerification(email, callback) {
    const actionCodeSettings = {
        // Redirects to verify page
        url: process.env.NEXT_PUBLIC_DOMAIN,
        handleCodeInApp: true,
    }
    auth.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user. Save the email locally
            localStorage.setItem('emailForSignIn', email)
            callback('emailSent')
        })
        .catch((error) => {
            console.error(error.code, error.message)
            callback('emailError')
        })
}

export function completeSignIn(email) {
    // Confirm the link is a sign-in with email link.
    if (auth.isSignInWithEmailLink(window.location.href)) {
        auth.signInWithEmailLink(email, window.location.href)
            .then((result) => {
                // Clear email from storage.
                window.localStorage.removeItem('emailForSignIn')
                fetch(`/api/userexists?email=${result.user.email}`)
                    .then((resp) => resp.json())
                    .then(({ user }) => {
                        if (user) login(user)
                        else {
                            localStorage.setItem(
                                'verifiedEmail',
                                result.user.email,
                            )
                            window.location.assign('/signup')
                        }
                    })
                    .catch((err) => console.error('Error in fetch', err))
            })
            .catch((error) => {
                console.error(error.code, error.message)
            })
    }
}
