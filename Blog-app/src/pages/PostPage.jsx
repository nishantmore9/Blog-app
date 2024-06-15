import React, { useContext, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { format } from 'date-fns'
import { UserContext } from '../userContext'

const PostPage = () => {
  const {id} = useParams()
  const [postInfo, setPostInfo] = useState(null)
  const {userInfo} = useContext(UserContext)
  useState(() => {
    fetch(`/api/user/post/${id}`)
      .then(response => response.json())
      .then(postInfo => setPostInfo(postInfo))
  },[])

  if(!postInfo) return ''

  return (
    <section className='max-w-5xl mx-auto p-4 border'>
      { !userInfo.id && (
        <div className='flex gap-2 justify-center items-center'>
          <p className='text-lg'>Login to see the post</p>
          <Link to ="/login"><img src="https://img.icons8.com/?size=100&id=zWS3SNRj7odb&format=png&color=000000" alt="link" width={25} height={25}  /></Link>
        </div>
      )}
      { userInfo.id && (
        <div>
        <h1 className='font-bold text-5xl mt-4 text-center'>{postInfo.title}</h1>
        <time className='block text-center my-3'>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
        { userInfo.id === postInfo.author._id && (
          <Link to={`/edit/${postInfo._id}`}>
            <button className='bg-slate-900 text-white flex gap-1 px-4 py-1 rounded-[4px] mx-auto my-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              Edit this post
            </button>
          </Link>
        )}
        <div className='text-center font-bold'>by @{postInfo.author.username}</div>
        <div className='my-3 max-h-[500px] overflow-hidden flex'>
          <img src={`http://localhost:3000/${postInfo.cover}`} alt="img" className='object-cover object-center mx-auto' />
        </div>
        <div dangerouslySetInnerHTML={{__html: postInfo.content}} className='my-5'/>
      </div>
      )}
      
    </section>
  )
}

export default PostPage