import React from 'react'

import { Table } from 'reactstrap'

import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { currentONT, ontFilter } from '../actions'
import { loadData } from '../reducers/searched'

const Details = (props) => {
  var [details_list, setDetails_list] = React.useState([])
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  console.log(2)
  console.log({ curentoool: currentolt })
  const history = useHistory()
  const gotToOlt = (element) => {
    if (element.SerialNumber != undefined) {
      dispatch(currentONT(element))
      dispatch(loadData(element.SerialNumber))
      history.push(`/actions`)
    } else {
      alert('Informations Insuffisante Pour Analyser le Trafic')
    }
  }
  React.useEffect(() => {
    var items = []
    console.log('props.states', props.location.state[0])
    props.location.state.map((element) => {
      var item = []
      item.push(<td>{element['ObjectID']}</td>)
      item.push(<td>{element['interface Administration Status']}</td>)
      item.push(<td>{element['interface Operation Status']}</td>)
      item.push(<td>{element['olt']}</td>)
      items.push(<tr onClick={() => gotToOlt(element)}>{item}</tr>)
    })
    setDetails_list(items)
  }, [])

  return (
    <Table hover bordered limit={10}>
      <thead>
        <tr>
          <th>Network Level ID</th>
          <th>interface Administration Status</th>
          <th>interface Operation Status</th>
          <th>OLT</th>
        </tr>
      </thead>
      <tbody>{details_list}</tbody>
    </Table>
  )
}

export default Details
