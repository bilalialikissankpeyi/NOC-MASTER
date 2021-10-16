import React from 'react'
import { getSum } from '../dataService/getSearchInformations'
import Loading from '../graphe/Loading'

import PerformancePanel from '../graphe//PerformancePanel'

import { Table } from 'reactstrap'

export default function PositionsPanel(props) {
  const [item, setItems] = React.useState([])
  const [rawData, setRawData] = React.useState([])
  const [clicked, setClicked] = React.useState({ clicked: false, key: '' })
  //const forceUpdate = React.useCallback(() =>setClicked({clicked:clicked}), []);
  React.useEffect(() => {
    console.log({ here: props.collection })
    getSum({
      collection: props.collection,
      regular: props.regular,
      start: props.start,
      end: props.end,
    }).then((result) => {
      var keys = Object.keys(result.sum)
      setRawData(result.data)
      setItems(
        keys.map((key, index) => (
          <tr
            onClick={() => {
              if (!clicked.clicked && clicked.key === '') {
                setClicked({ clicked: !clicked.clicked, key: key })
              } else if (clicked.clicked && clicked.key !== key) {
                setClicked({ clicked: clicked.clicked, key: key })
              }
            }}
          >
            <td>{key}</td>
            <td>{result.sum[key]} </td>
          </tr>
        ))
      )
    })
  }, [])

  return (
    <>
      {!item && <Loading />}
      <div className='container'>
        <div className='row justify-content-evenly'>
          <div className='col-8'>
            <Table hover bordered>
              <thead>
                <tr>
                  <th>Object</th>
                  <th>Somme dans le temps</th>
                </tr>
              </thead>
              <tbody>{item}</tbody>
            </Table>
          </div>
          <div className='col-4'>
            {!clicked.clicked ? (
              <h3>Click Items to see detailed figures</h3>
            ) : (
              <PerformancePanel data={rawData} field={clicked.key} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
