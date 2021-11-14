import React from 'react'

import Table from '../components/table/Table'
import { Link } from 'react-router-dom'
import Chart from 'react-apexcharts'
import statusCards from '../assets/JsonData/status-card-data.json'
import StatusCard from '../components/status-card/StatusCard'
import Badge from '../components/badge/Badge'
import './Dashboard.css'
import parse from 'parse'
//ALCLB2F6B123

const topCustomers = {
  head: ['user', 'total orders', 'total spending'],
  body: [
    {
      username: ' john Doe',
      order: ' 490',
      price: ' $15,810',
    },
    {
      username: 'john Doe',
      order: '490',
      price: '$15,810',
    },
    {
      username: 'john Doe',
      order: '490',
      price: '$15,810',
    },
  ],
}

const orderStatus = {
  shipping: 'primary',
  pending: 'warning',
  paid: 'success',
  refund: 'danger',
}

const renderOrderHead = (item, index) => <th key={index}>{item}</th>

const renderOrderBody = (item, index) => (
  <tr key={index} /*onClick={(e) => e.preventDefault()}*/>
    <td> {item.ObjectName}</td>
    <td> {item.IPAddress}</td>
    <td> {item.Name}</td>
    <td> {item.NEFamily}</td>
    <td>
      <Link to={`/ont`}>View ONT</Link>
    </td>
  </tr>
)

const renderCustomerHead = (item, index) => <th key={index}>{item}</th>

const renderCustomersBody = (item, index) => (
  <tr
    key={index}
    onClick={(e) => e.preventDefault()}
    style={{ cursor: 'pointer' }}
  >
    <td> {item.username}</td>
    <td> {item.order}</td>
    <td> {item.price}</td>
  </tr>
)

const Dashboard = () => {
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
            {statusCards.map((item, index) => (
              <div className='col-4'>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
