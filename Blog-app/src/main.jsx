import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AddPost from './pages/AddPost.jsx'

import { UserContextProvider } from './userContext.jsx'
import PostPage from './pages/PostPage.jsx'
import AddEditPost from './pages/AddEditPost.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='create' element={<AddPost />} />
      <Route path='post/:id' element={<PostPage />} />
      <Route path='edit/:id' element={<AddEditPost />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <RouterProvider router={router}/>
  </UserContextProvider>
)
