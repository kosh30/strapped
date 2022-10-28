import { AppProps } from 'next/app';
import Head from 'next/head';
// serverless-http import required to prevent from being removed by tree shaking
import 'serverless-http';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Welcome to frontend!</title>
            </Head>
            <main className="app">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default CustomApp;
