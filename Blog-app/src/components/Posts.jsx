import React from 'react'
import {format} from "date-fns"
import { Link } from "react-router-dom"

const Posts = ({_id,title, summary, cover, content, createdAt, author}) => {
  return (
    <section className='flex max-w-5xl m-auto gap-3 mt-3 p-3 border'>
      <Link to={`/post/${_id}`}>
        <div className='max-h-[250px] w-[400px] overflow-hidden flex'>
          <img src={"http://localhost:3000/"+cover} alt="img" className='object-cover object-center'/>
        </div>
      </Link>
      <Link to={`/post/${_id}`}>
          <div className='flex min-w-[500px] flex-col gap-4'>
            <h2 className='font-bold text-2xl'>{title}</h2>
            <p><span className='font-medium mr-3'>{author.username}</span>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</p>
            <p className='overflow-hidden'>{summary} </p>
          </div>
      </Link>
    </section>
  )
}

export default Posts