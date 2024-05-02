import { useState } from 'react'
import Navbar from './components/Navbar'
import Posts from './components/Posts'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Posts />
      <Posts />
    </>
  )
}

export default App
