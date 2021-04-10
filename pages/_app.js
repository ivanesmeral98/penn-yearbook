import '../styles/globals.scss'
import Head from '../components/head'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
