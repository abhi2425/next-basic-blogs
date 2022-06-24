import { Box } from '@mui/material'
import React from 'react'
import PostCard from '../../components/PostComponents/Post'
import { config } from '../../config/config'

const Posts = ({ posts }) => {
  const post = posts?.map((data) => (
    <Box key={data.id} sx={{ alignSelf: 'center', minWidth: '400px' }}>
      <PostCard {...data?.attributes} id={data.id} clickable />
    </Box>
  ))
  return (
    <div>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '30px',
          marginBottom: 50,
        }}>
        {post}
      </main>
    </div>
  )
}

export default Posts

export async function getStaticProps() {
  const rsp = await fetch(`${config.BASE_URL}/api/posts`)

  const result = await rsp.json()
  return {
    props: {
      posts: result?.data?.reverse(),
    },
  }
}
