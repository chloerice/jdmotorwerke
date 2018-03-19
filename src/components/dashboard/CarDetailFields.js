import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap'
import './Form.css'

const CarDetailFields = ({
  state,
  handleChange,
  isInvalid,
  validate,
  buttonText,
  formheadingText,
  handleSubmit
}) => (
  <Row className='Dashboard__form'>
    <Col className='form-header' xs={12} sm={12} md={12} lg={12}>
      <h1>{formheadingText}</h1>
    </Col>
    <form onSubmit={handleSubmit}>
      <Col className='form-fields-container--left' xs={12} sm={6} md={6} lg={6}>
        <FormGroup controlId='VIN'>
          <ControlLabel>VIN</ControlLabel>
          <FormControl
            required
            value={state.VIN}
            onChange={handleChange('VIN')}
          />
        </FormGroup>
        <FormGroup controlId='year'>
          <ControlLabel>Year</ControlLabel>
          <FormControl
            required
            type='tel'
            value={state.year}
            onChange={handleChange('year')}
          />
        </FormGroup>
        <FormGroup controlId='make'>
          <ControlLabel>Make</ControlLabel>
          <FormControl
            required
            value={state.make}
            onChange={handleChange('make')}
          />
        </FormGroup>
        <FormGroup controlId='model'>
          <ControlLabel>Model</ControlLabel>
          <FormControl
            required
            value={state.model}
            onChange={handleChange('model')}
          />
        </FormGroup>
        <FormGroup controlId='status' onChange={handleChange('status')}>
          <ControlLabel>Sale Status</ControlLabel>
          <FormControl componentClass='select' defaultValue={state.status} required>
            <option>select</option>
            <option value='for sale'>for sale</option>
            <option value='sold'>sold</option>
            <option value='requires service/parts'>requires service/parts</option>
            <option value='sale pending'>sale pending</option>
          </FormControl>
          <HelpBlock>
            Only cars for sale or sold are part of your website's inventory.
          </HelpBlock>
        </FormGroup>
        <FormGroup controlId='purchasePrice'>
          <ControlLabel>Purchase Price</ControlLabel>
          <FormControl
            value={state.purchasePrice}
            onChange={handleChange('purchasePrice')}
          />
        </FormGroup>
        <FormGroup controlId='sellingPrice'>
          <ControlLabel>Selling Price</ControlLabel>
          <FormControl
            value={state.sellingPrice}
            onChange={handleChange('sellingPrice')}
          />
        </FormGroup>
        <FormGroup controlId='soldPrice'>
          <ControlLabel>Sold Price</ControlLabel>
          <FormControl
            value={state.soldPrice}
            onChange={handleChange('soldPrice')}
          />
        </FormGroup>
        <FormGroup controlId='stateOfOrigin'>
          <ControlLabel>State of Origin</ControlLabel>
          <FormControl
            required
            value={state.stateOfOrigin}
            onChange={handleChange('stateOfOrigin')}
          />
        </FormGroup>
        <FormGroup controlId='title' onChange={handleChange('title')}>
          <ControlLabel>Title Status</ControlLabel>
          <FormControl componentClass='select' defaultValue={state.title}>
            <option>select</option>
            <option value='Clean'>clean</option>
            <option value='Salvage'>salvage</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId='mileage'>
          <ControlLabel>Mileage</ControlLabel>
          <FormControl
            type='tel'
            value={state.mileage}
            onChange={handleChange('mileage')}
          />
        </FormGroup>
      </Col>
      <Col className='form-fields-container--right' xs={12} sm={6} md={6} lg={6}>
        <FormGroup controlId='drivetrain'>
          <ControlLabel>Drivetrain</ControlLabel>
          <FormControl
            value={state.specs.drivetrain}
            onChange={handleChange('drivetrain', 'specs')}
          />
        </FormGroup>
        <FormGroup controlId='engine'>
          <ControlLabel>Engine</ControlLabel>
          <FormControl
            required
            value={state.specs.engine}
            onChange={handleChange('engine', 'specs')}
            placeholder='e.g., 2.5L 4cyl'
          />
        </FormGroup>
        <FormGroup controlId='transmission'>
          <ControlLabel>Transmission</ControlLabel>
          <FormControl
            required
            value={state.specs.transmission}
            onChange={handleChange('transmission', 'specs')}
          />
        </FormGroup>
        <FormGroup controlId='fuelType'>
          <ControlLabel>Fuel Type</ControlLabel>
          <FormControl
            required
            value={state.specs.fuelType}
            onChange={handleChange('fuelType', 'specs')}
            placeholder='e.g., regular unleaded'
          />
        </FormGroup>
        <FormGroup controlId='fuelEconomy'>
          <ControlLabel>Fuel Economy</ControlLabel>
          <FormControl
            required
            value={state.specs.fuelEconomy}
            onChange={handleChange('fuelEconomy', 'specs')}
            placeholder='e.g., 22-28mpg'
          />
        </FormGroup>
        <FormGroup controlId='exteriorColor'>
          <ControlLabel>Exterior Color</ControlLabel>
          <FormControl
            required
            value={state.specs.exteriorColor}
            onChange={handleChange('exteriorColor', 'specs')}
          />
        </FormGroup>
        <FormGroup
          controlId='finish'
        >
          <ControlLabel>Exterior Finish</ControlLabel>
          <FormControl
            required
            value={state.specs.finish}
            onChange={handleChange('finish', 'specs')}
          />
        </FormGroup>
        <FormGroup controlId='interiorColor'>
          <ControlLabel>Interior Color</ControlLabel>
          <FormControl
            required
            value={state.specs.interiorColor}
            onChange={handleChange('interiorColor', 'specs')}
            placeholder='Gray Cloth'
          />
        </FormGroup>
        <FormGroup
          controlId='fabrication'
        >
          <ControlLabel>Interior Fabrication</ControlLabel>
          <FormControl
            required
            value={state.specs.fabrication}
            onChange={handleChange('fabrication', 'specs')}
            placeholder='Gray Cloth'
          />
        </FormGroup>
        <FormGroup controlId='features'>
          <ControlLabel>Features</ControlLabel>
          <FormControl
            componentClass='textarea'
            value={state.specs.features}
            onChange={handleChange('features', 'specs')}
            placeholder='Split-Folding Rear Seatback, Heated Power Mirrors, Cruise Control, Keyless Entry, USB/AUX Audio Inputs'
          />
        </FormGroup>
        <Button
          disabled={isInvalid()}
          bsStyle='primary'
          type='submit'
        >
          {buttonText}
        </Button>
      </Col>
    </form>
  </Row>
)

CarDetailFields.propTypes = {
  state: PropTypes.object,
  handleChange: PropTypes.func,
  isInvalid: PropTypes.func,
  validate: PropTypes.func,
  buttonText: PropTypes.string,
  formheadingText: PropTypes.string,
  handleSubmit: PropTypes.func
}

export default CarDetailFields
