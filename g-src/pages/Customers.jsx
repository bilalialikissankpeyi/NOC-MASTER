import React from 'react'
import { useHistory } from 'react-router-dom'

//import Table from '../components/table/Table'
import { Table } from 'reactstrap'
import customerList from '../assets/JsonData/admin.json'
import Loading from '../graphe/Loading'
import { getAllList } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import { currentOLT, oltFilter } from '../actions'

const Customers = () => {
  const [oltInformation, setOltInformation] = React.useState([])
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  const filtered = useSelector((state) => state.oltFilter)
  const history = useHistory()
  const gotToOlt = (element) => {
    dispatch(currentOLT(element))
    history.push(`/analytics`)
  }

  React.useEffect(() => {
    getAllList({
      typeofSearch: 'getEntries',
      collection: 'OLT_INFO',
      query: '',
    }).then((result) => {
      console.log('resultat', result)
      var items = []
      if (filtered != '') {
        result
          .filter((value) => {
            if (value.ObjectName.includes(filtered)) return value
          })
          .map((element) => {
            var item = []
            for (var key in element) {
              if (key !== '_id' && key !== 'FIELD5') {
                item.push(<td>{element[key]}</td>)
              }
            }
            items.push(<tr onClick={() => gotToOlt(element)}>{item}</tr>)
          })
      } else {
        result.map((element) => {
          var item = []
          for (var key in element) {
            if (key !== '_id' && key !== 'FIELD5') {
              item.push(<td>{element[key]}</td>)
            }
          }
          items.push(<tr onClick={() => gotToOlt(element)}>{item}</tr>)
        })
      }

      setOltInformation(items)
    })
  }, [filtered])

  return (
    <>
      <div>
        <div className='row'>
          <div className='col-6'>
            <h2 className='page-header'>OLT</h2>
          </div>

          <div className='col-6'>
            <div className='topnav_search'>
              <input
                type='text'
                placeholder='Filter...'
                onChange={(e) => {
                  if (e !== '') {
                    dispatch(oltFilter(e.target.value))
                  }
                }}
              />
            </div>
          </div>
        </div>
        {!oltInformation && <Loading />}
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <Table hover bordered>
                  <thead>
                    <tr>
                      <th>ObjectName</th>
                      <th>IPAddress</th>
                      <th>Name</th>
                      <th>NEFamily</th>
                    </tr>
                  </thead>
                  <tbody>{oltInformation}</tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Customers

/*import React from 'react'
import {Link} from "react-router-dom"
import Table from '../components/table/Table'
import customerList from '../assets/JsonData/admin.json'

const customerTableHead = [
    
    'Object Name',
    'IP Address',
    'NE Family',
    'Actions'
    
]

const renderHead= (item,index) =><th key={index}>{item}</th>

const renderBody = (item,index) =>(
    <tr>
      
      <td>{item.Object_Name}</td>
      <td>{item.IP_Address}</td>
      <td>{item.NE_Family}</td>
      <td><Link to={`/analytics`}>View All</Link></td>
    </tr>
)

const Customers = () => {
    return (
        <div>
           <h2 className="page-header">
             customers
           </h2>
           <div className="row">
             <div className="col-12">
               <div className="card">
                 <div className="card__body">
                   <Table 
                       limit='10'
                       headData={customerTableHead}
                       renderHead={(item, index)=>renderHead(item,index)}
                       bodyData={customerList}
                       renderBody={(item,index)=>renderBody(item,index)}
                   />
                 </div>
               </div>
             </div>
           </div>
        </div>
    )
}

export default Customers
*/
