const firebase = require('firebase')
// inside the firebase console, create a new project
// then you'll be able to copy your config object by simply clicking the
// 'Add Firebase to your web app' button on the Overview screen at
// https://console.firebase.google.com/project/YOUR_PROJECT_ID/overview
const config = {
  apiKey: 'AIzaSyBxN9hLOuoq8MU5dQFVETu1CxRjItjZjGc',
  authDomain: 'jdmotorwerke.firebaseapp.com',
  databaseURL: 'https://jdmotorwerke.firebaseio.com',
  projectId: 'jdmotorwerke',
  storageBucket: 'jdmotorwerke.appspot.com',
  messagingSenderId: '590261283764'
}

firebase.initializeApp(config)

module.exports = firebase
