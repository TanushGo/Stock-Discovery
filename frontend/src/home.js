import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem('user')
      props.setLoggedIn(false)
    } else {
      navigate('/login')
    }
  }

  const onButtonUpClick = () => {
    navigate('/signup')
  }
  

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Sign Out' : 'Sign In'}
        />
        {loggedIn ? <div>Your username is {email}</div> : <div />}
      </div>
      {loggedIn ? <div />: 
      <div>
        <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonUpClick}
          value={"Sign Up"}
        />  </div>
      </div> }
    </div>
  )
}

export default Home