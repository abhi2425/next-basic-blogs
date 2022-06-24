import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import CreatePost from '../PostComponents/CreatePost'
import Link from 'next/link'

function NavBar({ open = () => {} }) {
  const router = useRouter()

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav' sx={{ px: 5 }}>
        <Toolbar>
          <Link href='/' as={'home'}>
            <Typography
              variant='h6'
              component='div'
              sx={{
                cursor: 'pointer',
                flexGrow: 1,
                fontSize: 35,
                fontFamily: "'Redressed', cursive",
              }}>
              Next Blogs
            </Typography>
          </Link>

          <Box>
            <Button sx={{ color: '#fff' }} onClick={() => router.push('/posts')}>
              All Posts
            </Button>

            <Button sx={{ color: '#fff' }} onClick={open}>
              Create Post
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
