
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/home'
import Login from './routes/login'
import SignUp from './routes/signUp'
import DetailView from './routes/company'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
  
    // If the token exists, verify it with the auth server to see if it is valid
    fetch('http://localhost:5555/check_login', {
      method: 'GET',
      headers: {
        'x-access-token': user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn('success' === r.message)
        setEmail(user.username || '')
      })
  }, [])
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setName={setName} />}
          />
          <Route index={false} path="/company/:id" element={<DetailView name ={name} setLoggedIn={setLoggedIn} />} />
          <Route path="/signin" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App