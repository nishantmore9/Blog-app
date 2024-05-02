import React, { useEffect, useState } from 'react'
import Posts from '../components/Posts'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("/api/user/post")
      .then(response => response.json())
      .then(posts => setPosts(posts))
  }, [])

  return (
    <>
      { 
        posts.length > 0 && posts.map((post) => (
        <Posts {...post} key={post._id}/>
      ))
      }
    </>
  )
}

export default HomePage