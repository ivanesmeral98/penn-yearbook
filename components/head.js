import Head from 'next/head'

export default function HeadComponent() {
    return (
        <Head>
            <title>2021 Penn Digital Yearbook</title>
            <link rel="icon" href="/favicon.ico" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta charSet="utf-8" />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css"
            />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,600&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Frank+Ruhl+Libre:wght@400;500;700&display=swap"
                rel="stylesheet"
            />
            <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
        </Head>
    )
}
