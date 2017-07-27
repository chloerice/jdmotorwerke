const database = require('./firebase').database

// We use these methods in our thunks to read and write to firebase

const readDataOnce = (tableName, key) => {
  const path = key ? `/${tableName}/${key}` : `/${tableName}/`
  return new Promise((resolve, reject) => {
    database.ref(path)
    .once('value')
    .then(snapshot => resolve(snapshot.val()))
    .catch(err => reject(err))
  })
}

const writeData = (tableName, dataObj) => {
  const newKey = database.ref().child(tableName).push().key;
  return new Promise((resolve, reject) => {
    database.ref(`/${tableName}/${newKey}`)
    .set(dataObj)
    .then(sucess => resolve('success'))
    .catch(err => reject(err))
  })
}

const updateData = (key, tableName, dataObj) => {
  let updates = {}
  updates[`/${tableName}/${key}`] = dataObj

  return new Promise((resolve, reject) => {
    database.ref()
    .update(updates)
    .then(success => resolve('sucess'))
    .catch(err => reject(err))
  })
}

module.exports = {
  readDataOnce,
  writeData,
  updateData
}
