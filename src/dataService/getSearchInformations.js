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

export function getTimeFrameData(value) {
  console.log({ send: value })
  var url = 'http://localhost:3001/' + `${value.typeOfSearch}`
  return new Promise(async (resolve, reject) => {
    try {
      var data = await axios.get(url, {
        params: {
          dbname: 'mydb',
          collection: `${value.collection}`,
          ObjectName: value.ObjectName,
          start: value.start,
          end: value.end,
          olt: value.olt,
        },
      })
      console.log('Last', data.data)
      resolve(data.data)
    } catch (err) {
      console.log(err)
    }
  })
}
export function getLastData(value) {
  var url = 'http://localhost:3001/' + `${value.typeofSearch}`
  return new Promise(async (resolve, reject) => {
    try {
      var data = await axios.get(url, {
        params: {
          dbname: 'mydb',
          collection: `${value.collection}`,
          ObjectName: value.ObjectName,
          last: value.last,
          olt: value.olt,
        },
      })
      console.log('Last', data.data)
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
              olt: value.olt,
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

export function getSum(value) {
  return new Promise(async (resolve) => {
    var data = []
    try {
      console.log({ here: value.collection })
      data = await axios.get('http://localhost:3001/getSum', {
        params: {
          dbname: 'mydb',
          collection: `${value.collection}`,
          regular: `${value.regular}`,
          start: new Date(value.start),
          end: new Date(value.end),
        },
      })

      var sumObject = {}
      data.data.map((e) => {
        for (var key in e) {
          if (key !== 'ObjectID' && key !== '_id' && key !== 'timestamp') {
            if (sumObject[key] == null) {
              sumObject[key] = 0
            }
            sumObject[key] += parseInt(e[key])
          }
        }
      })
      console.log('avant')
      console.log({ sum: sumObject, data: data.data })
      resolve({ sum: sumObject, data: data.data })
    } catch (err) {
      console.log(err)
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
