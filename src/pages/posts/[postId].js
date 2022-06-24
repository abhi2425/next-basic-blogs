import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import PostCard from '../../components/PostComponents/Post'
import { config } from '../../config/config'

const SinglePost = ({ post }) => {
  const {
    query: { postId },
  } = useRouter()

  return (
    <div>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '20px',
        }}>
        <Box sx={{ alignSelf: 'center', minWidth: '500px' }}>
          <PostCard {...post?.attributes} id={post?.id} />
        </Box>
      </main>
    </div>
  )
}
export default SinglePost

export async function getServerSideProps(context) {
  const {
    params: { postId },
  } = context
  const rsp = await fetch(`${config.BASE_URL}/api/posts/${postId}`)

  const result = await rsp.json()
  return {
    props: {
      post: result?.data,
    },
  }
}
