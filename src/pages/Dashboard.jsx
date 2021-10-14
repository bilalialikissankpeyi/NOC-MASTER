import React from 'react'

import Table from '../components/table/Table'
import {Link} from "react-router-dom"
import Chart from 'react-apexcharts'
import statusCards from '../assets/JsonData/status-card-data.json'
import StatusCard from '../components/status-card/StatusCard'
import Badge from '../components/badge/Badge'
import './Dashboard.css'

const chartoptions= {
    series:[{
       name:'Online PON' ,
       data:[40,70,20,90,36,80,30,91,60]
    },{
        name:'Store ONT',
        data:[40,30,70,80,40,16,40,20,51,10]
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


const topCustomers = {
   head:[
       'user',
       'total orders',
       'total spending'
   ],
   body:[
       {
          "username": " john Doe",
          "order": " 490",
          "price": " $15,810"
       },
        {
          "username":"john Doe",
          "order":"490",
          "price":"$15,810"
       },
        {
          "username":"john Doe",
          "order":"490",
          "price":"$15,810"
       },
        
       
   ]
}

const latestData = {
    head:[
     
          'Object Name',
          'IP Address',
          'Name',
          'NE Family',
          'Action'
     
    ],
    body:[
        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        },

        {
            "ObjectName": "HED1",
            "IPAddress": "10.178.39.226",
            "Name": "HED1",
            "NEFamily": "ISAM/FTTB/FTTN",
            
        }
        /*,
         {
            id:"#00124",
            user:"John Doe",
            date:"28-07-2021",
            price:"$900",
            status:"shipping"
        }*/

         
    ]
}



const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const renderOrderHead = (item,index)=>(
    <th key={index}>{item}</th>
)

const renderOrderBody = (item,index)=>(
    <tr key={index}  /*onClick={(e) => e.preventDefault()}*/ >
       <td> {item.ObjectName}</td>
       <td> {item.IPAddress}</td>
       <td> {item.Name}</td>
       <td> {item.NEFamily}</td>
       <td ><Link to={`/ont`}>View ONT</Link></td>
      
      
    </tr>
)

const renderCustomerHead = (item,index)=>(
    <th key={index}>{item}</th>
)

const renderCustomersBody = (item,index)=>(
    <tr key={index} onClick={(e) => e.preventDefault()} style={{cursor:"pointer"}}>
       <td> {item.username}</td>
       <td> {item.order}</td>
       <td> {item.price}</td>
    </tr>
)

const Dashboard = () => {
    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
              <div className="col-6">
               <div className='row'>
                 {
                     statusCards.map((item,index)=>(
                         <div className="col-6">
                          
                          <StatusCard
                             icon={item.icon}
                             count={item.count}
                             title={item.title}
                          />
                         </div>
                     ))
                 }
               </div>
              </div>
              <div className="col-6">
                <div className="card full-height">
                    {/*  */}
                    <Chart
                        options={chartoptions.options}
                        series={chartoptions.series}
                        type='line'
                        height='100%'
                    />
                </div>
              </div>
              {/*
              <div className="col-4" >
                  <div className="card">
                    <div className="card-header">
                       <h3> ISAM ONT</h3>
                    </div>
                    <div className="card-body">
                      {/*  table 
                      <Table
                         headData={topCustomers.head}
                         renderHead={(item,index)=>renderCustomerHead(item, index)}
                         bodyData={topCustomers.body}
                         renderBody={(item,index)=> renderCustomersBody(item, index)}
                         
                      />
                    </div>
                    <div className="card-footer">
                     <Link to="/"> View All </Link>
                    </div>
                  </div>
                </div>*/}
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3>OLT LIST</h3>
                    </div>
                    <div className="card-body">
                      <Table
                         headData={latestData.head}
                         renderHead={(item,index)=>renderOrderHead(item, index)}
                         bodyData={latestData.body}
                         renderBody={(item,index)=> renderOrderBody(item, index)}
                      />
                    </div>
                    <div className="card-footer">
                       <Link to={`/ont`}>View ONT</Link>
                    </div>
                  </div>
                </div>
              
            </div>
        </div>
    )
}

export default Dashboard
