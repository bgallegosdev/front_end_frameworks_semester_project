import { useState } from 'react'
import Navigation from './components/navigation'
import ImageContainer from './components/ImageContainer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navigation />
        <ImageContainer />
      </div>
    </>
  )
}

export default App
