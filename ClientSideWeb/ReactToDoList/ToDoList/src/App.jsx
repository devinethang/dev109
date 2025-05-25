import './main.css'
import { useState } from 'react'
import './App.css'
import AuthSection from './AuthSection.jsx'
import UserSection from './UserSection.jsx'
import EditModal from './EditModal.jsx'
import './todo.js'
import Header from './Header.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <AuthSection></AuthSection>
      <UserSection></UserSection>
      <EditModal></EditModal>

    </>
  )
}

export default App
