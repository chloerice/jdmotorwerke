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
    yrMkModel: '2012 Toyota Rav4, green',
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
    yrMkModel: '2014 BMW i3, blue',
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
    color: 'Black',
    purchasePrice: '$1000',
    sellingPrice: '$4000',
    soldPrice: '',
    status: 'requires parts/service',
    stateOfOrigin: 'CA',
    title: 'Salvage',
    mileage: '64798',
    specs: {
      interior: {
        color: 'Gray',
        fabrication: 'Cloth'
      },
      exterior: {
        color: 'Black',
        finish: 'Gloss'
      },
      transmission: 'Automatic',
      engine: '3.6R 6cyl',
      fuelType: 'regular unleaded',
      fuelEconomy: '18-25mpg',
      drivetrain: 'AWD',
      type: '4dr Sedan',
      features: ['Split-Folding Rear Seatback', 'Heated Power Mirrors', 'Cruise Control', 'Keyless Entry', 'USB/AUX Audio Inputs']
    },
    images: {
      featured: 'http://media.ed.edmunds-media.com/subaru/legacy/2010/oem/2010_subaru_legacy_sedan_25i_fq_oem_1_500.jpg',
      all: [
        'http://media.ed.edmunds-media.com/subaru/legacy/2010/oem/2010_subaru_legacy_sedan_25i_fq_oem_1_500.jpg'
      ]
    },
    VIN: 'W1234567890123457',
    createdAt: date,
    updatedAt: date
  },
  {
    year: '2012',
    make: 'Toyota',
    model: 'Rav4',
    color: 'Black',
    purchasePrice: '$9300',
    sellingPrice: '$9300',
    soldPrice: '$11750',
    status: 'sold',
    stateOfOrigin: 'TX',
    title: 'Clean',
    mileage: '78000',
    specs: {
      interior: {
        color: 'Gray',
        fabrication: 'Cloth'
      },
      exterior: {
        color: 'Black',
        finish: 'Gloss'
      },
      transmission: 'Automatic',
      engine: '2.5L 4cyl',
      fuelType: 'regular unleaded',
      fuelEconomy: '22-28mpg',
      drivetrain: 'Front Wheel Drive',
      type: '4dr Sedan',
      features: [
        'Split-Folding Rear Seatback',
        'Heated Power Mirrors',
        'Cruise Control',
        'Keyless Entry',
        'USB/AUX Audio Inputs'
      ]
    },
    images: {
      featured: 'gs://jdmotorwerke.appspot.com/cars/2T3BF4DV6CW240237/2012-Toyota-Rav4-Black.jpg',
      all: [
        'gs://jdmotorwerke.appspot.com/cars/2T3BF4DV6CW240237/2012-Toyota-Rav4-Black.jpg'
      ]
    },
    VIN: 'W1234567890123457',
    createdAt: date,
    updatedAt: date
  }
]

const siteContent = [
  {
    page: 'Home',
    sections: {
      hero: {
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/jdmotorwerke.appspot.com/o/site-assets%2Fhero-home.jpeg?alt=media&token=3d1cd30f-8e7e-4b72-ab9f-07538ca6a074',
        text: [
          'Your dream car is out there.',
          'We\'ll help you find it.'
        ]
      },
      services: {
        title: 'At Your Service',
        text: [
          {
            title: 'Quality Guaranteed',
            text: 'We purchase only the highest quality vehicles, fully inspected and detailed.'
          },
          {
            title: 'Licensed & Insured',
            text: 'We are a certified, licensed and insured auto dealer located in Northern California.'
          },
          {
            title: 'Nationwide Search',
            text: 'We source and ship clean, low mileage vehicles from exclusive, dealer-only auctions.'
          }
        ]
      },
      contact: {
        title: 'Contact Us',
        text: [
          'Having trouble finding the car you want at a reasonable price without cringeworthy mileage?',
          'We\'ve got you covered. Give us a call at (530) 238-5853 or fill out the form below.'
        ]
      }
    }
  }, {
    page: 'About',
    sections: {
      owner: {
        imageUrl: '',
        title: 'About the Owner',
        text: [
          `Jon D. Rice founded JD Motorwerke in the fall of 2016. A vet of America's auto parts capital--California's Recycle Rd--he's got almost a decade of automotive industry experience servicing, dismantling, and selling European cars. For years he's used his expertise and resources to save family and friends the time, money and stress involved in purchasing from a car lot. Jon believes everyone should have access to an auto insider and is thrilled to extend this service to the broader community of car buyers. When he's not hunting down deals for his clients, he enjoys travelling with the love of his life, Kylee, and restoring rare BMWs.`
        ]
      },
      process: {
        title: 'How It Works',
        text: [

        ]
      }
    }
  }, {
    page: 'Inventory',
    sections: {
      cars: {
        title: 'Used Cars For Sale',
        text: [

        ]
      }
    }
  }, {
    page: 'Single Car',
    sections: {
      hero: {
        images: {
          featuredUrl: '',
          allUrls: [

          ]
        }
      },
      description: {
        title: 'Description',
        text: [

        ]
      },
      specs: {
        title: 'Details & Specs',
        text: [

        ]
      }
    }
  }
]

Promise.map(customers, customer => seedData('Customers', customer))
.then(custys => {
  console.log(`Successfully seeded ${custys.length} customers!`)
  return Promise.map(cars, car => seedData('Cars', car))
})
.then(cars => {
  console.log(`Successfully seeded ${cars.length} cars!`)
  return Promise.map(siteContent, page => seedData('SiteContent', page))
})
.then(pages => console.log(`Successfully seeded ${pages.length} pages!`))
.finally(() => process.exit(0))
.catch(err => console.error(`Error (${err.code})`, err.stack))
