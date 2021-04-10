import { auth } from '../utils/firestore'

export function login(email) {
    console.log(email)
    // Process a POST request
    const actionCodeSettings = {
        // URL you want to redirect back to
        // URL must be in the authorized domains list in the Firebase Console.
        url: `http://localhost:3000`,
        handleCodeInApp: true,
    }
    auth.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            console.log('SENT EMAIL!')
            localStorage.setItem('emailForSignIn', email)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
        })
}

export function completeSignIn() {
    // Confirm the link is a sign-in with email link.
    if (auth.isSignInWithEmailLink(window.location.href)) {
        console.log('is link')
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let savedEmail = window.localStorage.getItem('emailForSignIn')
        if (!savedEmail) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            savedEmail = window.prompt(
                'Please provide your email for confirmation',
            )
        }
        // The client SDK will parse the code from the link for you.
        auth.signInWithEmailLink(savedEmail, window.location.href)
            .then((result) => {
                // Clear email from storage.
                window.localStorage.removeItem('emailForSignIn')
                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
                console.log(result)
            })
            .catch((error) => {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
                console.log(error)
            })
    }
}
