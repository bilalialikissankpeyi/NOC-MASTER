import React from 'react'
import { useHistory } from 'react-router-dom'

//import Table from '../components/table/Table'
import { Table } from 'reactstrap'
import customerList from '../assets/JsonData/admin.json'
import Loading from '../graphe/Loading'
import { getAllList } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import { currentONT, ontFilter } from '../actions'
import { loadData } from '../reducers/searched'

const Analytics = () => {
  const [ontInformation, setOntInformation] = React.useState([])
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  const filtered = useSelector((state) => state.ontFilter)
  console.log('fffffff')
  const history = useHistory()
  const gotToOlt = (element) => {
    dispatch(currentONT(element))
    dispatch(loadData(element.SerialNumber))
    history.push(`/actions`)
  }

  React.useEffect(() => {
    console.log('fffffff', currentolt.ObjectName)
    getAllList({
      typeofSearch: 'getRelatedONT',
      collection: 'ONT_INFO',
      query: `${currentolt.ObjectName}`,
    }).then((result) => {
      if (filtered != '') {
        console.log('resultat', result)
        var items = []
        result
          .filter((value) => {
            if (
              value.ObjectName.includes(filtered) ||
              value.DescriptionPart1.includes(filtered) ||
              value.DescriptionPart2.includes(filtered) ||
              value.SerialNumber.includes(filtered) ||
              value.SubscriberLocationID.includes(filtered)
            )
              return value
          })
          .map((element) => {
            var item = []
            for (var key in element) {
              if (key !== '_id' && key !== 'FIELD10') {
                item.push(<td>{element[key]}</td>)
              }
            }
            items.push(<tr onClick={() => gotToOlt(element)}>{item}</tr>)
          })
      } else {
        console.log('resultat', result)
        var items = []
        result.map((element) => {
          var item = []
          for (var key in element) {
            if (key !== '_id' && key !== 'FIELD10') {
              item.push(<td>{element[key]}</td>)
            }
          }
          items.push(<tr onClick={() => gotToOlt(element)}>{item}</tr>)
        })
      }
      setOntInformation(items)
    })
  }, [filtered])

  return (
    <>
      <div>
        <div className='row'>
          <div className='col-6'>
            <h2 className='page-header'>ONT</h2>
          </div>

          <div className='col-6'>
            <div className='topnav_search'>
              <input
                type='text'
                placeholder='Filter...'
                onChange={(e) => {
                  if (e !== '') {
                    dispatch(ontFilter(e.target.value))
                  }
                }}
              />
            </div>
          </div>
        </div>
        {!ontInformation && <Loading />}
        <div className='row'>
          <div className='col-12'>
            <Table hover bordered limit={10}>
              <thead>
                <tr>
                  <th>ObjectName </th>
                  <th> CustomerID </th>
                  <th>DescriptionPart1 </th>
                  <th> DescriptionPart2 </th>
                  <th>FamilyType</th>
                  <th>PlannedUp</th>
                  <th>PlannedSoftware</th>
                  <th>SerialNumber</th>
                  <th> SubscriberLocationID </th>
                </tr>
              </thead>
              <tbody>{ontInformation}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Analytics
