/* eslint-disable @next/next/no-page-custom-font */
import { Box } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import NavBar from '../components/Navbar/Navbar'
import CreatePost from '../components/PostComponents/CreatePost'
import '../styles/index.css'

function App({ Component, pageProps }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Redressed&display=swap'
          rel='stylesheet'
        />
      </Head>
      <NavBar open={handleOpen} />
      <CreatePost open={open} close={handleClose} />
      <Box sx={{ mt: 10 }}>
        <Component {...pageProps} />
      </Box>
    </>
  )
}

export default App
