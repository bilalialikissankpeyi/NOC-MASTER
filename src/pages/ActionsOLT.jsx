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

import PerformancePanel from '../graphe/PerformancePanel'

import DisplayKpis from './DisplayKpisOLT'

import Day from './OneDay'

import Hour from './OneHour'

import Fifteen from './FifteenMinutes'

import { Card, InputGroup, FormControl } from 'react-bootstrap'

const Actions = () => {
  const kpiList = [
    'Debit IN/OUT',
    'Volume IN/OUT',
    'Perte IN/OUT',
    'Etat des utilisateurs',
    'Etat des PON',
    'Utilisation de la memoire OLT',
  ]

  const [checkedState, setCheckedState] = useState(
    new Array(kpiList.length).fill(false)
  )

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState)
  }

  const [isclicked, setClicked] = useState({ clicked: false, button: 'search' })

  const [startDate, setStartDate] = useState(
    new Date('13 November 2021 00:00 UTC').toISOString()
  )
  const [endDate, setEndDate] = useState(
    new Date('13 November 2021 05:00 UTC').toISOString()
  )
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => state.searched)
  const searchedData = useSelector((state) => state.searchInTime)

  const handleStartDate = (date) => {
    setStartDate(date)
  }

  const handleEndDate = (date) => {
    setEndDate(date)
  }

  return (
    <div>
      {/*Premiere Ligne */}
      <Card>
        <Card.Body>
          <Card.Text>Trafic OLT </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <>
            <ul className='toppings-list'>
              {kpiList.map((kpi, index) => {
                return (
                  <li key={index}>
                    <div className='toppings-list-item'>
                      <div className='left-section'>
                        <input
                          type='checkbox'
                          id={`custom-checkbox-${index}`}
                          name={kpi}
                          value={kpi}
                          checked={checkedState[index]}
                          onChange={() => handleOnChange(index)}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>
                          {kpi}
                        </label>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <div className='row'>
            <div className='col-9'>
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
            <DisplayKpis
              kpisList={kpiList}
              checkedState={checkedState}
              start={startDate}
              end={endDate}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Actions
