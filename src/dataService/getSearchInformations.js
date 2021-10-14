import axios from 'axios'

export function getAllList(value) {
  var url = 'http://localhost:3001/' + `${value.typeofSearch}`
  return new Promise(async (resolve, reject) => {
    try {
      var data = await axios.get(url, {
        params: {
          dbname: 'mydb',
          collection: `${value.collection}`,
          query: `${value.query}`,
        },
      })
      console.log('ddd', data.data)
      resolve(data.data)
    } catch (err) {
      console.log(err)
    }
  })
}

export function getSearched(collection, value, typeofSearch) {
  var url = 'http://localhost:3001/' + `${typeofSearch}`
  return new Promise(async (resolve, reject) => {
    switch (typeofSearch) {
      case 'getUserCollection':
        try {
          var data = await axios.get(url, {
            params: {
              dbname: 'mydb',
              collection: `${collection}`,
              serialNumber: value.serialNumber,
            },
          })
          resolve(data.data)
        } catch (err) {
          console.log(err)
        }
        break
      case 'getUserRecordsInTime':
        try {
          var data = await axios.get(url, {
            params: {
              dbname: 'mydb',
              collection: `${collection}`,
              ObjectName: value.ObjectName,
              startdate: value.startdate,
              enddate: value.enddate,
            },
          })
          resolve(data.data)
        } catch (err) {
          console.log(err)
        }
        break

      default:
    }
  })
}
/*import axios from 'axios'
export function getSearched(collection, value, typeofSearch) {
  var url = 'http://localhost:3001/' + `${typeofSearch}`
  return new Promise(async (resolve, reject) => {
    switch (typeofSearch) {
      case 'getUserCollection':
        try {
          var data = await axios.get(url, {
            params: {
              dbname: 'mydb',
              collection: `${collection}`,
              serialNumber: value.serialNumber,
            },
          })
          resolve(data.data)
        } catch (err) {
          console.log(err)
        }
        break
      default:
    }
  })
}
*/
