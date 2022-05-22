import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'

const Card = ({
  data
}) => {
  
  return (
    <Link to={'/details/'+data.token_id} className="remove-link">
      <div className='card-container'>
        <img src={data.image} alt="image" className='card-image' />
        <div className='card-content'>
          <h1 className='card-title'>{data.title}</h1>
        </div>
        <div className='card-tag'>
          <div className='card-price-type'>Fixed Price</div>
          <div className='card-price-container'>
            {parseFloat(data.price).toFixed(2)} ETH
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card