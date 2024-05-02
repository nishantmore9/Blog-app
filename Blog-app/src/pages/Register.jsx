import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const register = async(e) => {
    e.preventDefault()
    const response = await fetch("/api/auth/register", {
      method : "POST",
      body : JSON.stringify({username,email,password}),
      headers : {"Content-Type" : "application/json"}
    })

    if(response.status === 200) {
      alert("Registraton succesful")
      navigate("/login")
    } else {
      alert("registration failed")
    }
  }

  return (
    <section className='mx-auto p-4 max-w-lg'>
      <h1 className="text-3xl text-center font-semibold my-7">Register</h1>
      <form className='flex flex-col gap-3 max-w-full' onSubmit={register}>
        <input 
        type="text" 
        placeholder='username' 
        className='bg-slate-200 p-3 max-w-full'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <input 
        type="text" 
        placeholder='email' 
        className='bg-slate-200 p-3 max-w-full'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        type="password" 
        placeholder='password' 
        className='bg-slate-200 p-3'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className='bg-black text-white p-4 uppercase'>Register</button>
      </form>
    </section>
  )
}

export default Register