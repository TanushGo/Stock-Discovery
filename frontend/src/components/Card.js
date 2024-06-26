import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'


const Card = (props) =>  {
  const navigate = useNavigate()
  const onNavigate = () => {
    props.setName(props.name)
    navigate('/company/'+ props.id)
  }
  return (
      <div className="Card" onClick={onNavigate}>
         
          <h1 className="name">{props.name}</h1>
          <div className="line">
          <h5 className="type">{props.type}</h5>
          <h5 className="region">{props.region}</h5>
          </div>
          <h3 className='symbol'>{props.id}</h3>
          <h5 className='currency'>{props.currency}</h5>
          
      </div>
  );
};

export default Card;