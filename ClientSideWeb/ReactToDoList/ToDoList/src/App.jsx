import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './RegistrationForm.jsx'
import LoginForm from './LoginForm.jsx'
import AuthSection from './AuthSection.jsx'
import UserSection from './UserSection.jsx'
import EditModal from './EditModal.jsx'

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
