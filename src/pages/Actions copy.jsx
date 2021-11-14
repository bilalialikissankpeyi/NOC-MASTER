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
  const [isclicked, setClicked] = useState(false)
  const [timeSelected, setTimeSelected] = useState('15Minutes')
  const [tableSelected, setTableSelected] = useState('')
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

  const initialise = () => {
    var item = []
    setItemClicked({ clicked: false, key: '' })
    for (var key in data[timeSelected]) {
      if (key === tableSelected) {
        console.log('key', key)
        console.log('value', data[timeSelected][tableSelected])
        var keys = Object.keys(data[timeSelected][tableSelected])

        keys.map((cle, index) => {
          item.push(
            <tr
              onClick={() => {
                {
                  if (!itemclicked.clicked && itemclicked.key === '') {
                    console.log('first time', cle)
                    console.log('.value', data[timeSelected][tableSelected].cle)
                    console.log(
                      '[value]',
                      data[timeSelected][tableSelected][`${cle}`]
                    )
                    console.log('[value]', data[timeSelected][tableSelected])
                    setItemClicked({
                      clicked: !itemclicked.clicked,
                      key: data[timeSelected][tableSelected][cle],
                    })
                  } else if (
                    itemclicked.clicked &&
                    itemclicked.key !== data[timeSelected][tableSelected][cle]
                  ) {
                    console.log('others time')
                    setItemClicked({
                      clicked: itemclicked.clicked,
                      key: data[timeSelected][tableSelected][cle],
                    })
                  }
                }
              }}
            >
              <td>{`${data[timeSelected][tableSelected][cle].replace(
                /([a-z])(A-Z)/g,
                '$1 $2'
              )}`}</td>
            </tr>
          )
        })

        /* for (var key2 in data[timeSelected][key]) {
          item.push(
            
          )
        }*/
      }
    }
    setItems(item)
  }

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
        initialise()
        break
      case '1heure':
        initialise()
        break
      case '24heure':
        initialise()
        break
      default:
    }
    if (type) {
      setOptions(type.map((el) => <option key={el}>{el}</option>))
    }
  }, [isclicked])
  new Date('2021-08-03-11T12:00:00')

  const timeSelectOptionHandler = (e) => {
    setTimeSelected(e.target.value)
  }
  const tableSelectOptionHandler = (e) => {
    setTableSelected(e.target.value)
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
  return (
    <div>
      <h2 className='page-header'>Time Selection</h2>
      <div className='row'>
        <div className='col-3'>
          <form onSubmit={onsubmit}>
            <div className='row'>
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
                  }}
                >
                  {timeOptions}
                </select>
              </Grid>
            </div>
          </form>
        </div>

        <div className='col-3'>
          <form onSubmit={onsubmit}>
            <div className='row'>
              <Grid container justify='space-between'>
                <select
                  className='select-timeperiod'
                  style={{
                    padding: '20px',
                    borderBottom: '1px solid gray',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    width: '200px',
                    borderRadius: '13px',
                  }}
                  onChange={tableSelectOptionHandler}
                >
                  {options}
                </select>
              </Grid>
            </div>
          </form>
        </div>
        <div className='col-6'>
          <div className='row'>
            <div className='col-4'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  /*disableToolbar*/
                  variant='inline'
                  format='MM/dd/yyy hh:mm'
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
            </div>
            <div className='col-4'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  /*disableToolbar*/
                  variant='inline'
                  format='MM/dd/yyy hh:mm'
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
            </div>
            <div className='col-4'>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                onClick={() => {
                  dispatch(
                    loadSearchInTimeData({
                      collection: tableSelected,
                      ObjectName: searchTerm.ObjectName.split(':')[1],
                      startdate: startDate,
                      enddate: endDate,
                      olt: searchTerm.ObjectName.split(':')[0],
                    })
                  )
                  setClicked(!isclicked)
                }}
              >
                Search{' '}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='row' style={{ marginTop: '100px' }}>
        {!isclicked ? (
          <div className='card full-height'>
            <h3>Fill All Required Information First</h3>
          </div>
        ) : (
          <>
            <div className='col-6'>
              <Table hover>
                <thead>
                  <th>Indicateurs</th>
                </thead>
                <tbody>{items}</tbody>
              </Table>
            </div>
            <div className='col-6'>
              <div className='card' style={{ marginTop: '60px' }}>
                {!itemclicked.clicked ? (
                  <h3>Click Items to see detailed figures</h3>
                ) : (
                  <PerformancePanel
                    data={searchedData}
                    field={itemclicked.key}
                    type='line'
                  />
                )}
                {/*  */}
              </div>
            </div>

            {/*     <div className='col-6'>
              {!itemclicked.clicked ? (
                <h3>Click Items to see detailed figures</h3>
              ) : (
                <PerformancePanel data={searchedData} field={itemclicked.key} />
              )}
            </div>*/}
          </>
        )}
      </div>
    </div>
  )
}

export default Actions
