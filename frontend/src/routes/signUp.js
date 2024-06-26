
import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'

const SignUp = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
    setNameError('')
    
    if ('' === name) {
        setNameError('Please enter your name')
        return
      }
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
  
    // Authentication calls will be made here...
    // Check if email has an account associated with it
    signUp()
        
    
    }
    // Sign up a user using email and password
    const signUp = () => {
        fetch('http://localhost:5555/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, "username" : email, password }),
        })
        .then((r) => r.json())
        .then((r) => {
            console.log(r)
            if ("success" === r[0]) {
            localStorage.setItem('user', JSON.stringify({ "username" : email, token: r.token }))
            window.alert('Signed Up')
            navigate('/')
            } else {
            window.alert('Account already exists')
            }
        })
    }

  return (
    <div>
       <header>
        <Link to={"/"}><a id="site-logo" href="/" >Stock Discovery</a></Link>
      </header>
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Sign Up</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={name}
          placeholder="Enter your name here"
          onChange={(ev) => setName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{nameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign Up'} />
      </div>
    </div>
    </div>
  )
}

export default SignUp
