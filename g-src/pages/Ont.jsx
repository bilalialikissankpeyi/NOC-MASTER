import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
//import { Button } from '@material-ui/core'

import {
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  Select,
  TextField,
} from '@material-ui/core'

import Detailed from './detailled_information'
import Loading from '../graphe/Loading'
export default function Ont() {
  const [startDate, setStartDate] = React.useState(
    new Date('2021-10-14T06:30:00.885Z')
  )
  const [endDate, setEndDate] = React.useState(
    new Date('2021-10-14T08:30:00.885Z')
  )
  const handleStartDate = (date) => {
    setStartDate(date)
  }

  const handleEndDate = (date) => {
    setEndDate(date)
  }
  const [time, setTime] = React.useState('15 Minutes')
  const [open, setOpen] = React.useState(false)
  const [clicked, setClicked] = React.useState(false)
  const [, setSearchWord] = React.useState('')
  const searchWord = useSelector((state) => state.searched)
  const options = ['15 Minutes', '1 hour', '24 hours']
  React.useEffect(() => {
    console.log({ here: time })
  }, [])
  const handleSelectChange = (event) => {
    setTime(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div>
      <div className='row' style={{ marginTop: '60px' }}>
        <div className='col-4'>
          <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
            Open the select
          </Button>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-controlled-open-select-label'>Time</InputLabel>
            <Select
              labelId='demo-controlled-open-select-label'
              id='demo-controlled-open-select'
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={time}
              label='Time'
              onChange={handleSelectChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={options[0]}>{options[0]}</MenuItem>
              <MenuItem value={options[1]}>{options[1]}</MenuItem>
              <MenuItem value={options[2]}>{options[2]}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='col-8'>
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
                color='primary'
                onClick={() => setClicked(true)}
              >
                Go
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {!clicked ? (
          <Loading />
        ) : (
          <Detailed
            dimension={time}
            regular={searchWord.ObjectName.split(':')[1]}
            start={startDate}
            end={endDate}
          />
        )}
      </div>
    </div>
  )
}
