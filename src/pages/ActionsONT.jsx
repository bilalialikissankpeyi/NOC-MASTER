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

import DisplayKpis from './DisplayKpisONT'

import Day from './OneDay'

import Hour from './OneHour'

import Fifteen from './FifteenMinutes'

import { Card, InputGroup, FormControl } from 'react-bootstrap'

const Actions = () => {
  const kpiList = [
    'Debit IN/OUT',
    'Volume IN/OUT',
    'Perte IN/OUT',
    'ONT Aggregation Gem',
    "Etat de l'ONT",
    "Etat des Ports P1 et P2 de l'ONT",
    "Etat des Ports P3 et P4 de l'ONT",
    'Etat de la carte virtuelle',
    'Debit IN/OUT Trafic Management',
    'Debit IN/OUT Trafic Voix',
    'Debit IN/OUT Trafic Internet',
    'Volume IN/OUT Trafic Management',
    'Volume IN/OUT Trafic Voix',
    'Volume IN/OUT Trafic Internet',
    'Perte IN/OUT Trafic Management',
    'Perte IN/OUT Trafic Voix',
    'Perte IN/OUT Trafic Internet',
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
    new Date('11 December 2021 00:00 UTC').toISOString()
  )
  const [endDate, setEndDate] = useState(
    new Date('11 December 2021 23:00 UTC').toISOString()
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
          <Card.Text>Trafic ONT </Card.Text>
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

/* {/*deuxieme Ligne 15 min}
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

          {/*troisieme Ligne heure }
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

          {/*quatrieme Ligne J}
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
          </div>*/
/*<InputGroup>
              <InputGroup.Checkbox aria-label='Checkbox for following text input' />
              <InputGroup.Text>BridgePort Port SERV1</InputGroup.Text>
              <FormControl aria-label='Text input with checkbox' />
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox aria-label='Checkbox for following text input' />
              <InputGroup.Text>BridgePort Port C14 P1</InputGroup.Text>
              <FormControl aria-label='Text input with checkbox' />
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox aria-label='Checkbox for following text input' />
              <InputGroup.Text>ONT Aggregation Gem</InputGroup.Text>
              <FormControl aria-label='Text input with checkbox' />
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox aria-label='Checkbox for following text input' />
              <InputGroup.Text>
                Etat Operationnel et Administreatif de l'ONT
              </InputGroup.Text>
              <FormControl aria-label='Text input with checkbox' />
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox aria-label='Checkbox for following text input' />
              <InputGroup.Text>
                Etat Operationnel Et Administratif des Ports P1 et P2 de l'ONT
              </InputGroup.Text>
              <FormControl aria-label='Text input with checkbox' />
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox aria-label='Checkbox for following text input' />
              <InputGroup.Text>
                Etat Operationnel Et Administratif des Ports P3 et P4 de l'ONT
              </InputGroup.Text>
              <FormControl aria-label='Text input with checkbox' />
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox aria-label='Checkbox for following text input' />
              <InputGroup.Text>
                Etat Operationnel et Administratif de la Voix
              </InputGroup.Text>
              <FormControl aria-label='Text input with checkbox' />
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox aria-label='Checkbox for following text input' />
              <InputGroup.Text>Association VLAN 3001/SERV1</InputGroup.Text>
              <FormControl aria-label='Text input with checkbox' />
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox aria-label='Checkbox for following text input' />
              <InputGroup.Text>Association VLAN 3000/C14 P1</InputGroup.Text>
              <FormControl aria-label='Text input with checkbox' />
            </InputGroup>
            <InputGroup>
              <InputGroup.Checkbox aria-label='Checkbox for following text input' />
              <InputGroup.Text>Association VLAN 1000/C14 P1</InputGroup.Text>
              <FormControl aria-label='Text input with checkbox' />
            </InputGroup>*/

/*<div
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
            </div>*/
