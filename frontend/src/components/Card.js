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
         
          <h2 className="name">{props.name}</h2>
          <h2 className="type">{props.type}</h2>
          <h2 className="region">{props.region}</h2>
          <h2 className='symbol'>{props.id}</h2>
          <h2 className='currency'>{props.currency}</h2>
          
      </div>
  );
};

export default Card;