import React from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>foxbin</title>
        <link rel="shortcut icon" href="images/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp