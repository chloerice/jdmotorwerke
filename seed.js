const database = require('./firebase').database()
const Promise = require('bluebird')

function seedData (tableName, data) {
  const newKey = database.ref().child(tableName).push().key
  data.id = newKey
  return database.ref(`/${tableName}/${newKey}`).set(data)
}

const date = new Date().toLocaleString()

const customers = [
  {
    name: 'Beth Allspach',
    email: 'beth.allspach@morganstanley.com',
    phone: '616-893-1555',
    zipCode: '49348',
    yrMkModel: '2012 Toyota Rav4',
    message: 'Jaaaan, can you find me a Toyota Rav4 so I can carry my herd of dog beastules?',
    status: 'Search Pending',
    createdAt: date,
    updatedAt: date
  },
  {
    name: 'Carol Allspach',
    email: 'carol.sue.allspach@gmail.com',
    phone: '530-823-3760',
    zipCode: '95817',
    yrMkModel: '2014 BMW i3',
    message: 'Jaaaan, looking for any year with less than 150000 miles--Honda Elements are cool too!',
    status: 'Search Pending',
    createdAt: date,
    updatedAt: date
  }
]

const cars = [
  {
    year: '2010',
    make: 'Suburu',
    model: 'Legacy',
    color: 'Silver',
    purchasePrice: '$1000',
    sellingPrice: '$4000',
    soldPrice: '',
    status: 'requires parts/service',
    stateOfOrigin: 'CA',
    title: 'salvage',
    specs: {},
    VIN: '',
    createdAt: date,
    updatedAt: date
  }
]

Promise.map(customers, customer => seedData('Customers', customer))
.then(custys => {
  console.log(`Successfully seeded ${custys.length} customers!`)
  return Promise.map(cars, car => seedData('Cars', car))
})
.then(cars => console.log(`Successfully seeded ${cars.length} cars!`))
.finally(() => process.exit(0))
.catch(err => console.error(`Error (${err.code})`, err.stack))
