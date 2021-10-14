import React from 'react'
import {Link} from "react-router-dom"
import Table from '../components/table/Table'
import ontList from '../assets/JsonData/ont.json'

const ontTableHead = [
    
    'Object Name',
    'DescriptionPart1',
    'Description Part2',
    'Serial Number',
    'Subscriber LocationID',
    'Actions'
    
]

const renderHead= (item,index) =><th key={index}>{item}</th>

const renderBody = (item,index) =>(
    <tr>
      
      <td>{item.ObjectName}</td>
      <td>{item.DescriptionPart1}</td>
      <td>{item.DescriptionPart2}</td>
      <td>{item.SerialNumber}</td>
      <td>{item.SubscriberLocationID}</td>
      <td><Link to={`/analytics`}>View All</Link></td>
    </tr>
)

const Ont = () => {
    return (
        <div>
           <h2 className="page-header">
             Ont List
           </h2>
           <div className="row">
             <div className="col-12">
               <div className="card">
                 <div className="card__body">
                   <Table 
                       limit='10'
                       headData={ontTableHead}
                       renderHead={(item, index)=>renderHead(item,index)}
                       bodyData={ontList}
                       renderBody={(item,index)=>renderBody(item,index)}
                   />
                 </div>
               </div>
             </div>
           </div>
        </div>
    )
}

export default Ont
