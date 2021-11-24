import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { loadSearchInTimeData } from '../reducers/searchInTime'

import Grid from '@material-ui/core/Grid'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import { Button } from '@material-ui/core'

import { Table } from 'reactstrap'

import data from '../assets/models/data.json'

import PerformancePanel from '../graphe//PerformancePanel'

import Day from './OneDay'

import Hour from './OneHour'

import Fifteen from './FifteenMinutes'

import { Card } from 'react-bootstrap'

const Actions = () => {
  let type = null
  const fifteen = ['BridgePort', 'ONTAggGem', 'vlanPort']
  const oneHour = [
    ' Uni',
    'Pon',
    'OntVeipPort',
    ' OntEthPort',
    'Ont',
    'EthernetLineSlot',
    'CpuUsage',
    'EthernetPort',
    'vlanPortAssociation',
  ]
  const oneDay = ['vlanPortAssociation']

  var [items, setItems] = useState([])
  var [options, setOptions] = useState([])
  const [isclicked, setClicked] = useState({ clicked: false, button: 'search' })
  const [timeSelected, setTimeSelected] = useState('15Minutes')

  const [startDate, setStartDate] = useState(
    new Date('2021-10-14T06:30:00.885Z')
  )
  const [endDate, setEndDate] = useState(new Date('2021-10-14T08:30:00.885Z'))
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => state.searched)
  const searchedData = useSelector((state) => state.searchInTime)
  const [itemclicked, setItemClicked] = React.useState({
    clicked: false,
    key: '',
  })

  React.useEffect(() => {
    switch (timeSelected) {
      case '15Minutes':
        type = fifteen
        break
      case '1heure':
        type = oneHour
        break
      case '24heure':
        type = oneDay
        break
      default:
    }
    if (type) {
      console.log('thyp', type)
      setOptions(type.map((el) => <option key={el}>{el}</option>))
    }
  }, [timeSelected])
  React.useEffect(() => {
    switch (timeSelected) {
      case '15Minutes':
        break
      case '1heure':
        break
      case '24heure':
        break
      default:
    }
    if (type) {
      setOptions(type.map((el) => <option key={el}>{el}</option>))
    }
  }, [isclicked.clicked])
  new Date('2021-08-03-11T12:00:00')

  const timeSelectOptionHandler = (e) => {
    setTimeSelected(e.target.value)
  }

  const timeOptions = [
    <option>15Minutes</option>,
    <option>1heure</option>,
    <option>24heure</option>,
  ]

  const handleStartDate = (date) => {
    setStartDate(date)
  }

  const handleEndDate = (date) => {
    setEndDate(date)
  }
  const onsubmit = (e) => {
    const data = {
      startdate: this.state.setSelectDate,
      enddate: this.state.setCheckOutDate,
    }
    e.preventDefault()
  }

  const changeDate = (day, hour, min) => {
    //setEndDate(new Date(2021, 10, 13, 0, 0, 0))
    //setStartDate(new Date(2021, 10, 13 - day, 0 - hour, 0 - min, 0))
    var start = new Date('13 December 2021 01:00 UTC')
    var end = new Date('13 December 2021 02:02: UTC')
    console.log(
      'start',
      new Date(end.toISOString()),
      'end',
      new Date(start.toISOString())
    )
    setEndDate(new Date('13 November 2021 05:00 UTC'))
    setStartDate(new Date('13 November 2021 00:00 UTC'))
    // console.log(new Date().toUTCString())
  }

  return (
    <div>
      {/*Premiere Ligne */}
      <Card>
        <Card.Body>
          <div className='row'>
            <div className='col-3'>
              <form onSubmit={onsubmit}>
                <Grid container justify='space-between'>
                  <select
                    onChange={timeSelectOptionHandler}
                    className='select-timeperiod'
                    style={{
                      padding: '20px',
                      borderBottom: '1px solid gray',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      width: '200px',
                      borderRadius: '13px',
                      margin: '25px',
                    }}
                  >
                    {timeOptions}
                  </select>
                </Grid>
              </form>
            </div>
            <div className='col-6'>
              <Grid container justify='space-around'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    /*disableToolbar*/
                    variant='inline'
                    format='MM/dd/yyy HH:mm'
                    margin='normal'
                    id='date-picker'
                    label='Start Time'
                    value={startDate}
                    onChange={handleStartDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    /*disableToolbar*/
                    variant='inline'
                    format='dd/MM/yyyy HH:mm'
                    margin='normal'
                    id='date-picker'
                    label='End Time'
                    value={endDate}
                    onChange={handleEndDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </div>
            <div ClassName='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{ height: '50px', width: '100px', paddingTop: '12px' }}
                padding='10px 10px'
                onClick={() => {
                  setClicked({ clicked: !isclicked.clicked, button: 'search' })
                }}
              >
                Search{' '}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          {/*deuxieme Ligne 15 min*/}
          <div className='row'>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                  width: '100px',
                }}
                onClick={() => {
                  changeDate(0, 0, 15)
                  setClicked({ clicked: !isclicked.clicked, button: '15 Min' })
                }}
              >
                15 Min
              </Button>
            </div>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                  width: '100px',
                }}
                onClick={() => {
                  changeDate(0, 0, 30)
                  setClicked({ clicked: !isclicked.clicked, button: '30 Min' })
                }}
              >
                30 Min
              </Button>
            </div>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                  width: '100px',
                }}
                onClick={() => {
                  changeDate(0, 0, 45)
                  setClicked({ clicked: !isclicked.clicked, button: '45 Min' })
                }}
              >
                45 Min
              </Button>
            </div>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                  width: '100px',
                }}
                onClick={() => {
                  changeDate(0, 1, 0)
                  setClicked({
                    clicked: !isclicked.clicked,
                    button: '4x15 Min',
                  })
                }}
              >
                4x15 Min
              </Button>
            </div>
          </div>

          {/*troisieme Ligne heure */}
          <div className='row'>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                  width: '100px',
                }}
                onClick={() => {
                  changeDate(0, 1, 0)
                  setClicked({ clicked: !isclicked.clicked, button: '1 heure' })
                }}
              >
                1 heure
              </Button>
            </div>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                }}
                onClick={() => {
                  changeDate(0, 3, 0)
                  setClicked({ clicked: !isclicked.clicked, button: '3 heure' })
                }}
              >
                3 heures
              </Button>
            </div>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                }}
                onClick={() => {
                  changeDate(0, 6, 0)
                  setClicked({ clicked: !isclicked.clicked, button: '6 heure' })
                }}
              >
                6 heures
              </Button>
            </div>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                }}
                onClick={() => {
                  changeDate(0, 12, 0)
                  setClicked({
                    clicked: !isclicked.clicked,
                    button: '12 heure',
                  })
                }}
              >
                12 heures
              </Button>
            </div>
          </div>

          {/*quatrieme Ligne J*/}
          <div className='row'>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                  width: '100px',
                }}
                onClick={() => {
                  changeDate(1, 0, 0)
                  setClicked({ clicked: !isclicked.clicked, button: '1 J' })
                }}
              >
                1 J
              </Button>
            </div>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                  width: '100px',
                }}
                onClick={() => {
                  changeDate(2, 0, 0)
                  setClicked({ clicked: !isclicked.clicked, button: '2 J' })
                }}
              >
                2 J
              </Button>
            </div>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                  width: '100px',
                }}
                onClick={() => {
                  changeDate(3, 0, 0)
                  setClicked({ clicked: !isclicked.clicked, button: '3 J' })
                }}
              >
                3 J
              </Button>
            </div>
            <div className='col-3'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                style={{
                  margin: '10px',
                  width: '100px',
                }}
                onClick={() => {
                  changeDate(4, 0, 0)
                  setClicked({ clicked: !isclicked.clicked, button: '4 J' })
                }}
              >
                4 J
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/*Resultat */}
      <div
        className='row col-9'
        style={{
          marginTop: '3px',
          paddingRigth: '30pX',
        }}
      >
        {!isclicked.clicked ? (
          <div className='card full-height'>
            <h3>Fill All Required Information First</h3>
          </div>
        ) : (
          <>
            <div
              className='row col-3'
              style={{
                marginTop: '10px',
                padding: '12pX',
                marginBottom: '30px',
                alignItems: 'center',
                alignContent: 'center',
                textAlign: 'right',
              }}
            >
              {isclicked.button.includes('heure') ? (
                <Hour
                  clicked={isclicked.button}
                  start={startDate}
                  end={endDate}
                />
              ) : isclicked.button.includes('J') ? (
                <Day
                  clicked={isclicked.button}
                  start={startDate}
                  end={endDate}
                  style={{
                    width: '300px',
                    height: '200px',
                  }}
                  display='flex'
                  justifyContent='space-between'
                />
              ) : isclicked.button.includes('Min') ? (
                <Fifteen
                  clicked={isclicked.button}
                  start={startDate}
                  end={endDate}
                />
              ) : timeSelected === '1heure' ? (
                <Hour
                  clicked={isclicked.button}
                  start={startDate}
                  end={endDate}
                />
              ) : timeSelected === '24heure' ? (
                <Day
                  clicked={isclicked.button}
                  start={startDate}
                  end={endDate}
                />
              ) : (
                <Fifteen
                  clicked={isclicked.button}
                  start={startDate}
                  end={endDate}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Actions
