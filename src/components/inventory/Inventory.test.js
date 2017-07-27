import React from 'react'
import ReactDOM from 'react-dom'
import Inventory from '../inventory/Inventory'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Inventory />, div)
})
