import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import TradingViewWidget from "../components/HeatMap"
import Card from '../components/Card'

const Home = (props) => {
  const { loggedIn, email } = props
  const [stock, setStock] = useState('')
  const [result, setResult] = useState([])
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

  const onSearchClick = () => {
    fetch('http://localhost:5555/search', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "key" : stock }),
      })
      .then((r) => r.json())
      .then((r) => {
          console.log(r)
          if (200 === r[1]) {
          setResult(r[0]["bestMatches"])
          } else {
          window.alert('API issue')
          }
      })
  }
  const mystyle = {width: "90vw" , height: "80vh", margin: "0 auto"};
  const buttonStyle = {border: 'none',
    background: 'ForestGreen',
    color: 'white',
    padding: '8px 12px',
    margin: '8px',
    fontSize: '12px',
    borderRadius: '8px',
    cursor: 'pointer'}
  

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
          <input
            type="text"
            name="ticker-search"
            placeholder="Search for Stocks..."
            onChange={(ev) => setStock(ev.target.value)}
          />
          
          <input className={'searchButton'} type="button" onClick={onSearchClick} value={'Search'} style={buttonStyle} />
          
          <TradingViewWidget />
          <div className={'company-container'}> 
          {result && result.length> 0 ?
            result.map((i,index) => {              
              console.log(i)
              return <Card id={i["1. symbol"]} name={i["2. name"]} type={i["3. type"]} region={i['4. region']} key={i["1. symbol"]} currency = {i['8. currency']}/>}
           ) 
           : <div></div>}
           </div>
          Your username is {email}
          </div> : <div />}
    </div>
  )
}

export default Home