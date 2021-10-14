import React, {useState}from 'react'

import Grid from '@material-ui/core/Grid'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers'
import { Button } from '@material-ui/core';

import Table from '../components/table/Table'
import {Link} from "react-router-dom"
import Chart from 'react-apexcharts'
import statusCards from '../assets/JsonData/status-card-data.json'
import StatusCard from '../components/status-card/StatusCard'
import Badge from '../components/badge/Badge'


const chartoptions= {
    series:[{
       name:'Online' ,
       data:[40,70,20,90,36,80,30,91,60]
    },{
        name:'Offline',
        data:[40,30,70,80,40,16,40,20,51]
    }],
    options:{
       color:['#6ab04c','#2980b9'] ,
       chart:{
           background:'transparent'
       },
       dataLabels:{
           enabled:false
       },
       stroke: {
           curve:'smooth'
       },
       xaxis:{
           categories:['jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
       },
       legend :{
           position:'top'
       },
       grid:{
           show:false
       }
    }
}


const Analytics = () => {
    const [selectDate, setSelectDate]= useState();
    const [checkOutDate, setCheckOutDate] = useState(null);
    new Date("2021-08-03-11T12:00:00")

    const   handleDateChange = (date)=> {
       setSelectDate(date);
       setCheckOutDate(null);
    } 

   const handleCheckOutDate = (date) => {
     setCheckOutDate(date);
   };
   const onsubmit = (e) => {    
      
       const data = { startdate:this.state.setSelectDate, enddate:this.state.setCheckOutDate};    
         e.preventDefault();    
           /*axios.post('http://localhost:1141/Api/Searchdata/search',data).then(response => {  
             console.log(response.data);  
              this.setState({  
                employeedata: response.data  
              });  
           });  */
    }     
    return (
        <div>
          <h2 className="page-header">Time Selection</h2>
          <div className="row">
              <div className="col-6">
              <form onSubmit={onsubmit}>
               <div className='row'>
                
                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <Grid container justify='space-around'>
                  <KeyboardDatePicker
                    /*disableToolbar*/
                    variant='inline'
                    format='MM/dd/yyy'
                    margin='normal'
                    id='date-picker'
                    label='Start Time'
                    value={selectDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                       'aria-label':'change date' 
                    }}
                  />
                  <KeyboardTimePicker
                    margin='normal'
                    id='time-picker'
                    label='Select time'
                    value={selectDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                       'aria-label':'change date' 
                    }}

                  />
                 </Grid>
               </MuiPickersUtilsProvider>

               <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <Grid container justify='space-around'>
                  <KeyboardDatePicker
                    /*disableToolbar*/
                    variant='inline'
                    format='MM/dd/yyy'
                    margin='normal'
                    id='date-picker'
                    label='End Time'
                    value={checkOutDate}
                    onChange={handleCheckOutDate}
                    KeyboardButtonProps={{
                       'aria-label':'change date' 
                    }}
                  />
                  <KeyboardTimePicker
                    margin='normal'
                    id='time-picker'
                    label='Select time'
                    value={checkOutDate}
                    onChange={handleCheckOutDate}
                    KeyboardButtonProps={{
                       'aria-label':'change date' 
                    }}

                  />
                 </Grid>
               </MuiPickersUtilsProvider>
               
               <Button variant="contained" type="submit" color="primary">Search </Button>

               </div>
               </form>   
              </div>
              <div className="col-6">
                <div className="card full-height">
                    {/*  */}
                    <span>User Information</span>
                    
                </div>
              </div>

              <div className="col-4" >
              <div className="card">
                <div className="card-header">
                   <h3> Result</h3>
                </div>
                <div className="card-body">
                  {/*  table */}
                  <table className="table">  
                           <thead className="thead-dark">  
                       <tr>  
                       <th scope="col">Id</th>  
                   <th scope="col">Name</th>  
                   
                   <th scope="col">JoiningDate</th>  
                  </tr>  
                  </thead>  
                    <tbody>  
                   
                   </tbody>  
                 </table>  
                  
                </div>
                <div className="card-footer">
                 
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="card full-height">
              <Chart
              options={chartoptions.options}
              series={chartoptions.series}
              type='area'
              height='200%'
          />
              </div>
            </div>
            </div>
        </div>
    )
}

export default Analytics
