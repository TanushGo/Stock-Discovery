import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  return (
    <Link to={'/company/'+ props.id}>
      <div className="Card">
         
          <h2 className="name">{props.name}</h2>
          <h2 className="type">{props.type}</h2>
          <h2 className="region">{props.region}</h2>
          <h2 className='symbol'>{props.id}</h2>
          <h2 className='currency'>{props.currency}</h2>
          
      </div>
      </Link>
  );
};

export default Card;