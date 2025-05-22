import './main.css'
import { useState } from 'react'
import './App.css'
import AuthSection from './AuthSection.jsx'
import UserSection from './UserSection.jsx'
import EditModal from './EditModal.jsx'
import './todo.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AuthSection></AuthSection>
        <UserSection></UserSection>
        <EditModal></EditModal>
      </div>
    </>
  )
}

export default App
