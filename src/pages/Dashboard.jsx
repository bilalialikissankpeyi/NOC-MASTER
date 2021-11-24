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

import PonChart from '../graphe/PonChart'

import UserInformationChart from '../graphe/UserInformationChart'

import parse from 'parse'
//ALCLB2F6B123

const Dashboard = () => {
  var date = new Date('13 November 2021 05:00 UTC')
  var last = new Date(date.toISOString())
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
          <div
            className='row col-8'
            style={{
              margin: '60px',
            }}
          >
            <PonChart last={last} />
          </div>
          <div
            className='row col-8'
            style={{
              margin: '60px',
            }}
          >
            <UserInformationChart last={last} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
