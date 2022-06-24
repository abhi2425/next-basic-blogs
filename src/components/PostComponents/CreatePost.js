import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { Alert, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { config } from '../../config/config'
import BasicAlert from '../UI/Alert'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export default function CreatePost({ open = false, close = () => {} }) {
  const router = useRouter()
  const [alert, setAlert] = React.useState({ show: false, message: '', type: '' })
  const [loading, setLoading] = React.useState(false)
  const [postData, setPostData] = React.useState({
    title: '',
    description: '',
    content: '',
  })

  const onSubmit = async () => {
    if (!postData.title && !postData.description) return
    try {
      setLoading(true)
      const data = JSON.stringify({ data: postData })
      const resp = await fetch(`${config.BASE_URL}/api/posts`, {
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await resp.json()
      setLoading(false)
      close()
      router.push('/posts')
      if (json?.data?.id) {
        setAlert({ show: true, message: 'Post Created Successfully!!', type: 'success' })
        setPostData({ title: '', content: '', description: '' })
      } else {
        setAlert({ show: true, message: 'Sorry! Something went wrong.', type: 'error' })
      }
      setTimeout(() => setAlert({ show: false }), 3500)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <div>
      <BasicAlert alert={alert} />
      <Modal open={open} onClose={close} keepMounted={false}>
        <Box sx={style}>
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            sx={{ width: '100%' }}
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            required
          />
          <TextField
            id='outlined-basic'
            label='Description'
            variant='outlined'
            rows={4}
            multiline
            sx={{ width: '100%', mt: 2.5 }}
            value={postData.description}
            onChange={(e) => setPostData({ ...postData, description: e.target.value })}
            required
          />
          <TextField
            id='outlined-basic'
            label='Content'
            variant='outlined'
            multiline
            rows={8}
            value={postData?.content}
            onChange={(e) => setPostData({ ...postData, content: e.target.value })}
            sx={{ width: '100%', mt: 2.5 }}
          />
          <Button variant='contained' sx={{ mt: 3 }} onClick={onSubmit} disabled={loading}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
