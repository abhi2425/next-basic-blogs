import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import MarkdownIt from 'markdown-it'
import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { config } from '../../config/config'

export default function PostCard({ id, title, description, content, clickable, ...props }) {
  const router = useRouter()
  const [htmlContent, setHtmlContent] = React.useState()
  const [hover, setHover] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const md = new MarkdownIt()
    const htmlContent = md.render(content)
    setHtmlContent(htmlContent)
  }, [content])

  const onDelete = async () => {
    try {
      setLoading(true)
      const resp = await fetch(`${config.BASE_URL}/api/posts/${id}`, {
        method: 'DELETE',
      })
      const json = await resp.json()
      setLoading(false)
      if (json?.data?.id) {
        router.push('/posts')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Card
      sx={{ maxWidth: 900 }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <CardContent>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Box sx={{ display: hover ? 'block' : 'none' }}>
            <LoadingButton
              color='error'
              onClick={onDelete}
              loading={loading}
              loadingPosition='start'
              startIcon={<DeleteIcon htmlColor='red' />}
              variant='outlined'>
              Delete
            </LoadingButton>
          </Box>
        </Box>
        <CardActionArea onClick={() => clickable && router.push(`/posts/${id}`)} disableRipple>
          <Typography variant='caption' color='text.secondary'>
            {description}
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            dangerouslySetInnerHTML={{ __html: htmlContent }}></Typography>
        </CardActionArea>
      </CardContent>
    </Card>
  )
}
