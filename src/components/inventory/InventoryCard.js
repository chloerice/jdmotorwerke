import React from 'react'
import { Image } from 'react-bootstrap'
import PropTypes from 'prop-types'

const InventoryCard = props => {
  const {car, yrMkModel, handleOnLoad, opacity} = props
  const {color} = car.specs.exterior
  const sold = car.status === 'sold'

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
        {sold && <h1 className='sold'>SOLD</h1>}
      </div>
      <div className='InventoryCard__text'>
        <h2 className='InventoryCard__model'>{yrMkModel}</h2>
        <div className='InventoryCard__text-right'>
          <p className='InventoryCard__miles'>{`${car.mileage} miles`}</p>
          <p className='InventoryCard__price'>
            {sold ? car.soldPrice : car.sellingPrice}
          </p>
        </div>
      </div>
    </div>
  )
}

InventoryCard.propTypes = {
  car: PropTypes.object,
  specs: PropTypes.object,
  handleOnLoad: PropTypes.func,
  opacity: PropTypes.number,
  yrMkModel: PropTypes.string,
  color: PropTypes.string
}

export default InventoryCard
