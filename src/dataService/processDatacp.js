import axios from 'axios'
export function getX(data, field) {
  return new Promise((resolve, reject) => {
    var timesArray = []
    console.log({ Perform: data })
    data.map((e) => {
      for (var key in e) {
        if (
          field === key &&
          key !== 'ObjectID' &&
          key !== '_id' &&
          key !== 'timestamp'
        ) {
          var time = new Date(e['timestamp'])

          timesArray.push(`${time.getHours()}` + ':' + `${time.getMinutes()}`)
        }
      }
    })
    console.log('times', timesArray)
    resolve(timesArray)
    /*if (data.length !== 0) {
     
      console.log('times', timesArray)
      resolve(timesArray)
    }*/
  })
}

export function getY(data, field) {
  return new Promise((resolve, reject) => {
    var fieldArray = []
    console.log({ Perform: data })
    data.map((e) => {
      for (var key in e) {
        if (
          field === key &&
          key !== 'ObjectID' &&
          key !== '_id' &&
          key !== 'timestamp'
        ) {
          fieldArray.push(e[key])
        }
      }
    })

    console.log('yy', fieldArray)
    return resolve(fieldArray)
    /*
    if (data.length !== 0) {
      
    }*/
  })
}
