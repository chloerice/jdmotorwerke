import React from 'react'
import { Image, Row, Col, Panel } from 'react-bootstrap'
import PropTypes from 'prop-types'

const InventoryCard = props => {
  const {car, yrMkModel, color, handleOnLoad, opacity} = props
  const {status} = car

  return (
    <div className='thumbnail'>
      <div
        className='img-placeholder'
        style={{
          paddingTop: '69%'
        }}
      >
        <Image
          className='InventoryCard__image'
          responsive
          style={{opacity}}
          onLoad={handleOnLoad}
          src={car.images.featured}
          alt={`A photo of a ${color} ${yrMkModel} ${status} by JD Motorwerke.`}
        />
        {
          status === 'sold' &&
          <div className='sold-overlay'>
            <h1 className='sold-overlay__text'>SOLD</h1>
          </div>
        }
      </div>
      <Col className='caption' xs={12} sm={12} md={12} lg={12}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <h2 className='InventoryCard__header'>{yrMkModel}</h2>
              </Col>
            </Row>
            <Row>
              <Col className='InventoryCard__specs' xs={6} sm={6} md={6} lg={6}>
                <p>PRICE</p>
                <p>MILEAGE</p>
                <p>TRANSMISSION</p>
                <p>ENGINE</p>
                <p>EXTERIOR</p>
                <p>INTERIOR</p>
              </Col>
              <Col className='InventoryCard__specs' xs={6} sm={6} md={6} lg={6}>
                <p>{car.sellingPrice}</p>
                <p>{car.mileage}</p>
                <p>{car.specs.transmission}</p>
                <p>{car.specs.engine}</p>
                <p>{`${car.specs.exterior.color} ${car.specs.exterior.finish}`}</p>
                <p>{`${car.specs.interior.color} ${car.specs.interior.fabrication}`}</p>
              </Col>
              <Col className='InventoryCard__features' xs={12} sm={12} md={12} lg={12}>
                <Panel header='FEATURES'>
                  <p>{car.specs.features.join(', ')}</p>
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
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
