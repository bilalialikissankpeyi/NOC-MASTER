import React from 'react'

import Table from '../components/table/Table'
import { Link } from 'react-router-dom'
import Chart from 'react-apexcharts'
import statusCards from '../assets/JsonData/status-card-data.json'
import StatusCard from '../components/status-card/StatusCard'
import Badge from '../components/badge/Badge'
import TotalOnt from '../DashBoardCompoent/TotalOnt'
import TotalOlt from '../DashBoardCompoent/TotalOlt'
import TotalPon from '../DashBoardCompoent/TotalPon'
import './Dashboard.css'

import PonChartDash from '../graphe/PonChartDash'

import UserInformationChart from '../graphe/UserInformationChart'

import parse from 'parse'
//ALCLB2F6B123

const Dashboard = () => {
  var date = new Date('11 December 2021 23:00 UTC')
  var end = new Date(date.toISOString())
  var start = new Date(date.toISOString())
  start.setDate(end.getDate() - 24)
  React.useEffect(async () => {
    parse.initialize('myAppId', '', 'myMsterKey')
    parse.serverURL = 'http://localhost:1337/parse'
    parse.liveQueryServerURL = 'ws://localhost:1337/parse'
    //parse.LiveQuerySubscription.on()
    let query = new parse.Query('Ont')
    // query.equalTo('ifAdminStatus', 'down')
    var subscription = await query.subscribe()

    subscription.on('create', (ont) => {
      alert(ont.get('ObjectID'))
      console.log(ont.get('ObjectID')) // This should output Mengyan
    })
  }, [])
  return (
    <div>
      <h2 className='page-header'>Dashboard</h2>
      <div className='row'>
        <div className='col-12'>
          <div className='row'>
            <div className='col-4'>
              <TotalOnt />
            </div>
            <div className='col-4'>
              <TotalOlt />
            </div>
            <div className='col-4'>
              <TotalPon />
            </div>
          </div>
          <div className='row'>
            <PonChartDash start={start} end={end} />
          </div>
          <div className='row'>
            <UserInformationChart start={start} end={end} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
