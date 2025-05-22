import { useState } from 'react'
import './App.css'
import RegistrationForm from './RegistrationForm.jsx'
import LoginForm from './LoginForm.jsx'
import AuthSection from './AuthSection.jsx'
import UserSection from './UserSection.jsx'
import EditModal from './EditModal.jsx'
import todo from './todo.js'

// Example: use todo in your React app
console.log('Todo module:', todo)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthSection></AuthSection>
      <UserSection></UserSection>
      <EditModal></EditModal>
    </>
  )
}

export default App
