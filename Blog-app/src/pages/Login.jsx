import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../userContext";


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const {setUserInfo} = useContext(UserContext)

  const navigate = useNavigate()

  const login = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
  
      if (response.ok) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          setRedirect(true);
          navigate("/");
        });
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  }

  return (
    <section className="mx-auto p-4 max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form className="flex flex-col gap-3 max-w-full" onSubmit={login}>
        <input
          type="text"
          placeholder="username"
          className="bg-slate-200 p-3 max-w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-slate-200 p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-black text-white p-4 ">Log in</button>
      </form>
    </section>
  );
};

export default Login;
