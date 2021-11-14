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
    dispatch(currentONT(element))
    dispatch(loadData(element.SerialNumber))
    history.push(`/actions`)
  }
  React.useEffect(() => {
    var items = []
    console.log({ props: props.location.state })
    props.location.state.map((element) => {
      var item = []
      for (var key in element) {
        if (key !== '_id' && key !== 'olt' && key !== 'timestamp') {
          item.push(<td>{element[key]}</td>)
        }
      }
      items.push(<tr onClick={() => gotToOlt(element)}>{item}</tr>)
    })
    setDetails_list(items)
  }, [])

  return (
    <Table hover bordered limit={10}>
      <thead>
        <tr>
          <th>bponOntEquipId</th>
          <th> bponOntSerialNumber</th>
          <th>bponOntSubscriberId1</th>
          <th>bponOntSubscriberLocId</th>
          <th>interface Administration Status</th>
          <th>interface Operation Status</th>
        </tr>
      </thead>
      <tbody>{details_list}</tbody>
    </Table>
  )
}

export default Details
