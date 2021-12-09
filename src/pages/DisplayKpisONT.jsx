import React, { useState, useEffect } from 'react'

import Day from './OneDay'

import Hour from './OneHour'

import Fifteen from './FifteenMinutes'

const DisplayKpis = (props) => {
  var toLoad = []
  var [fifteen, setFifteen] = useState([])
  var [oneHour, setOneHour] = useState([])
  var [oneDay, setOneDay] = useState([])
  var [start, setStart] = React.useState(props.start)
  //new Date('2021-10-14T07:32:00.885Z')
  var [end, setEnd] = React.useState(props.end)
  React.useEffect(() => {
    props.checkedState.map((element, index) => {
      if (element) {
        toLoad.push(props.kpisList[index])
      }
    })
    var fif = []
    var hour = []
    var day = []
    toLoad.map((element) => {
      switch (element) {
        case 'Debit IN/OUT':
          fif.push(element)
          break
        case 'Volume IN/OUT':
          fif.push(element)
          break
        case 'Perte IN/OUT':
          fif.push(element)
          break
        case 'ONT Aggregation Gem':
          fif.push(element)
          break
        case "Etat de l'ONT":
          hour.push(element)
          break
        case "Etat des Ports P1 et P2 de l'ONT":
          hour.push(element)
          break
        case "Etat des Ports P3 et P4 de l'ONT":
          hour.push(element)
          break
        case 'Etat de la carte virtuelle':
          hour.push(element)
          break
        case 'Debit IN/OUT Trafic Management':
          fif.push(element)
          break
        case 'Debit IN/OUT Trafic Voix':
          fif.push(element)
          break
        case 'Debit IN/OUT Trafic Internet':
          fif.push(element)
          break
        case 'Volume IN/OUT Trafic de Management':
          fif.push(element)
          break
        case 'Volume IN/OUT Trafic Voix':
          fif.push(element)
          break
        case 'Volume IN/OUT Trafic Internet':
          fif.push(element)
          break
        case 'Perte IN/OUT Trafic Management':
          fif.push(element)
          break
        case 'Perte IN/OUT Trafic Voix':
          fif.push(element)
          break
        case 'Perte IN/OUT Trafic Internet':
          fif.push(element)
          break
      }
    })
    console.log('fif', fif.length)
    setFifteen(fif)
    setOneDay(day)
    setOneHour(hour)
  }, [])

  return (
    <>
      {fifteen.length != 0 ? (
        <Fifteen render={fifteen} start={start} end={end} />
      ) : (
        <h3>ICI</h3>
      )}
      {oneHour.length != 0 ? (
        <Hour render={oneHour} start={start} end={end} />
      ) : (
        ''
      )}
      {oneDay.length != 0 ? (
        <Hour render={oneDay} start={start} end={end} />
      ) : (
        ''
      )}
    </>
  )
}

export default DisplayKpis
