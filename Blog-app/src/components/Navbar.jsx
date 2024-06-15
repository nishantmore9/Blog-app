import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../userContext';

const Navbar = () => {
  const { userInfo, setUserInfo} = useContext(UserContext)

  useEffect(() => {
    fetch("/api/auth/profile", {
      credentials: "include"
    })
    .then(response => response.json())
    .then(userInfo => {
      setUserInfo(userInfo);
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
    });
  }, []);
  
  const logout = () => {
    fetch("/api/auth/logout", {
      credentials: "include",
      method: "POST"
    })
      .then(() => {
        setUserInfo(null);
      })
      .catch(error => {
        console.error("Logout failed:", error);
      });
  };
 
  const username = userInfo?.username

  return (
    <nav className='flex justify-between items-center max-w-5xl m-auto h-16'>
      <div className='flex gap-3 items-center'>
        <img src="https://img.icons8.com/?size=100&id=58240&format=png&color=000000" alt="img" width={50} height={50} />
        <Link to="/"><h1 className='font-bold text-2xl font-mono'>Blog-Spot</h1></Link>
      </div>
      <div>
        <ul className='flex justify-around gap-4 items-center'>
          {username && (
            <>
              <Link to="/create" className='bg-blue-700 text-white px-5 py-1 font-bold rounded-[4px]'><li>Create new post</li></Link>
              <li onClick={logout} className='bg-black text-white px-5 py-1 font-bold rounded-[4px]'>Logout</li>
            </>
          )}

          { !username && (
            <>
              <Link to="/login" className='bg-black text-white px-5 py-1 font-bold rounded-[4px]' ><li>Login</li></Link>
              <Link to="/register" className='bg-black text-white px-5 py-1 font-bold rounded-[4px]'><li>Register</li></Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar