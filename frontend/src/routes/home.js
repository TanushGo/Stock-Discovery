import React from 'react'
import { useNavigate } from 'react-router-dom'
import TradingViewWidget from "../components/HeatMap"

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem('user')
      props.setLoggedIn(false)
    } else {
      navigate('/signin')
    }
  }

  const onButtonUpClick = () => {
    navigate('/signup')
  }
  const mystyle = {width: "90vw" , height: "80vh", margin: "0 auto"};
  

  return (
    <div>
      <div className="mainContainer">
      <div className={'titleContainer'}>
      {!loggedIn ? <div>
        <div>Welcome!</div>
      </div> 
      :<div>Stock Discovery</div>}
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Sign Out' : 'Sign In'}
        />
        
        {loggedIn ? <div />: 
      <div>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonUpClick}
          value={"Sign Up"}
        />  
      </div> }
      </div>
    </div>
    {loggedIn ? <div style={mystyle}>
          <TradingViewWidget />
          Your username is {email}
          </div> : <div />}
    </div>
  )
}

export default Home