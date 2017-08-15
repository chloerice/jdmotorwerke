import React from 'react'
import { Image } from 'react-bootstrap'
import PropTypes from 'prop-types'

const InventoryCard = props => {
  const {car, yrMkModel, color, handleOnLoad, opacity} = props
  const {status} = car

  return (
    <div className='img-placeholder'>
      <Image
        className='InventoryCard__image'
        responsive
        style={{opacity}}
        onLoad={handleOnLoad}
        src={car.images.featured}
        alt={`A photo of a ${color} ${yrMkModel} ${status} by JD Motorwerke.`}
      />
      <div className='overlay'>
        {status === 'sold' && <h1 className='sold'>SOLD</h1>}
      </div>
      <div className='InventoryCard__text'>
        <h2 className='InventoryCard__model'>{yrMkModel}</h2>
        <div className='InventoryCard__text-right'>
          <p className='InventoryCard__miles'>{`${car.mileage} miles`}</p>
          <p className='InventoryCard__price'>
            {status === 'sold' ? car.soldPrice : car.sellingPrice}
          </p>
        </div>
      </div>
    </div>
  )
}

InventoryCard.propTypes = {
  car: PropTypes.object,
  handleOnLoad: PropTypes.func,
  opacity: PropTypes.string,
  yrMkModel: PropTypes.string,
  color: PropTypes.string
}

export default InventoryCard
