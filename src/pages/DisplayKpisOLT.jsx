import React, { useState, useEffect } from 'react'

import Hour from './OneHour'

const DisplayKpis = (props) => {
  var toLoad = []

  var [oneHour, setOneHour] = useState([])

  var [start, setStart] = React.useState(props.start)
  //new Date('2021-10-14T07:32:00.885Z')
  var [end, setEnd] = React.useState(props.end)
  React.useEffect(() => {
    props.checkedState.map((element, index) => {
      if (element) {
        toLoad.push(props.kpisList[index])
      }
    })

    var hour = []

    toLoad.map((element) => {
      switch (element) {
        case 'Debit IN/OUT':
          hour.push(element)
          break
        case 'Volume IN/OUT':
          hour.push(element)
          break
        case 'Perte IN/OUT':
          hour.push(element)
          break
        case 'Etat des utilisateurs':
          hour.push(element)
          break
        case 'Etat des PON':
          hour.push(element)
          break
        case 'Utilisation de la memoire OLT':
          hour.push(element)
          break
      }
    })

    setOneHour(hour)
  }, [])

  return (
    <>
      {oneHour.length != 0 ? (
        <Hour render={oneHour} start={start} end={end} />
      ) : (
        ''
      )}
    </>
  )
}

export default DisplayKpis
