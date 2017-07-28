import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './Inventory.css'

const Inventory = props => (
  <Row id='Inventory'>
    <Col xs={12} sm={12} md={12} lg={12}>
      <header className='Inventory-header'>
        <h2>INVENTORY</h2>
      </header>
    </Col>
  </Row>
)

export default Inventory
