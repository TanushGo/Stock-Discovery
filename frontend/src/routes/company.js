import { useParams } from "react-router-dom";
import React, { useState } from "react";
import "./company.css"
import TickerWidget from "../components/ticker";
import ChartWidget from "../components/chart";
import { useNavigate, Link} from 'react-router-dom'

const DetailView = (props) => {
    const [senti, setSenti] = useState(-2);
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
          //console.log(r)
          if (200 === r[1]) {
            setSenti(r[0]["data"])
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
        <a id="site-logo" href="#" >Stock Discovery</a>
        <input className={'inputButton'} type="button"  onClick={onButtonClick} value={'Sign Out'} />
        </header>
        <nav id="ticker-tape">
        <TickerWidget />
        </nav>
        
        <main>
        <section id="advanced-chart">
          <ChartWidget />
        </section>
        <section id="company-profile">Company Profile</section>
        <section id="fundamental-data">Fundamental Data</section>
        <section id="technical-analysis">Technical Analysis</section>
        </main>
    </div>
    );
  };
  
export default DetailView;
