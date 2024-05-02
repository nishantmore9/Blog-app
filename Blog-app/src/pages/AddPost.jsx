import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import {useNavigate} from "react-router-dom"
import Editor from "../components/Editor";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()

  const createNewPost = async (e) =>{
    const data = new FormData
    data.set("title", title)
    data.set("summary", summary)
    data.set("content", content)
    data.set("file", files[0])
    e.preventDefault()
    const response = await fetch("/api/user/post",{
      method : "POST",
      body : data,
      credentials: "include"
    })
    
    if (response.ok) {
      setRedirect(true)
      navigate("/")
    }
  
  }
  return (
    <form className="flex flex-col gap-4 max-w-5xl mx-auto mt-10" onSubmit={createNewPost}>
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
      {/* <ReactQuill value={content} modules={modules} formats={formats} onChange={(value) => setContent(value)} /> */}
      <Editor value={content} onChange={setContent} />
      <button className="bg-black text-white p-3">Create Post</button>
    </form>
  );
};

export default AddPost;
