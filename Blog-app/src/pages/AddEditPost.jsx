import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import  { useNavigate, useParams} from "react-router-dom"

const AddEditPost = () => {
  const {id} = useParams()
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    fetch("/api/user/post/"+id)
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title)
        setSummary(postInfo.summary)
        setContent(postInfo.content)
      }) 
  },[id])

  const updatePost = async (e) => {
    const data = new FormData
    data.set("title", title)
    data.set("summary", summary)
    data.set("content", content)
    data.set("id", id)
    if (files?.[0]) {
      data.set("file", files?.[0])
    }
    e.preventDefault()
    const response = await fetch("/api/post",{
      method : "PUT",
      body : data,
      credentials : "include"
    })

    if(response.ok) {
      navigate(`/post/${id}`)
    }
  }

  return (
    <div>
      <form className="flex flex-col gap-4 max-w-5xl mx-auto mt-10" onSubmit={updatePost}>
      <input 
        type="title" 
        placeholder={"Title"} 
        className="bg-slate-100 p-3" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        className="bg-slate-100 p-3"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)}/>
      <Editor value={content} onChange={setContent} />
      <button className="bg-black text-white p-3">Update Post</button>
    </form>
    </div>
  )
}

export default AddEditPost