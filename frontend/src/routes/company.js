import { useParams } from "react-router-dom";
import React, { useState } from "react";
import "./company.css"
import TickerWidget from "../components/ticker";
import ChartWidget from "../components/chart";
import SymbolWidget from "../components/symbol"
import { useNavigate, Link} from 'react-router-dom'
import ProfileWidget from "../components/profile"
import FinancialWidget from "../components/financial"
import TechnicalWidget from "../components/technical"

const DetailView = (props) => {
    const [senti, setSenti] = useState("");
    const [color, setColor] = useState("black")
    let params = useParams();

    const navigate = useNavigate()

    const onButtonClick = () => {
      localStorage.removeItem('user')
      props.setLoggedIn(false)
      navigate('/')
    }

    // console.log(props.name)
    
    fetch('http://localhost:5555/news', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "key" : props.name }),
      })
      .then((r) => r.json())
      .then((r) => {
          console.log(r)
          if (200 === r[1]) {
            let val = r[0]["data"]
            if (val >= 0.05){
              setSenti("positive")
              setColor("green")
            }
            else if (val <= -0.05){
              setSenti("negative")
              setColor("red")
            }
            else{
              setSenti("neutral")
              setColor("gray")
            }
            
          } 
          else if(201 === r[1]){
            console.log("ahh")
          }
          else {
           window.alert('API issue')
          }
      })
  
    return (
      <div className="company-box">
        <header>
        <Link to={"/"}><a id="site-logo" href="#" >Stock Discovery</a></Link>
        <input className={'inputButton'} type="button"  onClick={onButtonClick} value={'Sign Out'} style={{"fontSize": "19px"}} />
        </header>
        <nav id="ticker-tape">
          <TickerWidget />
        </nav>
        
        <main>
        <section id="symbol-info">
          <SymbolWidget name={params.id} />
        </section>
        <section id="advanced-chart">
          <ChartWidget name={params.id} />
        </section>
        <section id="company-profile">
          <ProfileWidget name={params.id} />
          </section>
       
        <section id="fundamental-data"><FinancialWidget name={params.id} /></section>
        <section id="technical-analysis"><TechnicalWidget name={params.id} /></section>
        {senti ?<div style={{"margin" : "auto", "width": "50%"}}>
        <h2 style={{"textAlign" : "center"}}>Sentiment News Analysis</h2>
        <p>The average news sentiment for {params.id} is <span style={{"color" : {color}}}>{senti}</span>. This is based on AI analysis of popular news articles regarding the company.  </p></div> : <div><h2>No Sentiment Analysis Available</h2></div>}
        </main>
    </div>
    );
  };
  
export default DetailView;
