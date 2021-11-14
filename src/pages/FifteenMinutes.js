import React from 'react'
import Loading from '../graphe/Loading'
import BridgePort from '../graphe/BridgeChart'
import GponAggGem from '../graphe/GponAggGemChart'
import VlanPort from '../graphe/VlanPortChart'
const Fifteen = (props) => {
  var [start, setStart] = React.useState()
  //new Date('2021-10-14T07:32:00.885Z')
  var [end, setEnd] = React.useState(new Date(2021, 10, 14, 7, 32, 0))
  React.useEffect(() => {
    switch (props.clicked) {
      case '15 Min':
        //setEnd(new Date(2021, 10, 14, 7, 32, 0))
        console.log('start', start)
        setStart(
          new Date(
            end.getFullYear(),
            end.getMonth(),
            end.getDay(),
            end.getHours(),
            end.getMinutes() - 15,
            end.getSeconds()
          )
        )
        break
      case '30 Min':
        //setEnd(new Date(2021, 10, 14, 7, 32, 0))
        setStart(
          new Date(
            end.getFullYear(),
            end.getMonth(),
            end.getDay(),
            end.getHours(),
            end.getMinutes() - 30,
            end.getSeconds()
          )
        )

        break
      case '45 Min':
        //setEnd(new Date(2021, 10, 14, 7, 32, 0))
        setStart(
          new Date(
            end.getFullYear(),
            end.getMonth(),
            end.getDay(),
            end.getHours(),
            end.getMinutes() - 45,
            end.getSeconds()
          )
        )

        break
      case '4x15 Min':
        //setEnd(new Date(2021, 10, 14, 7, 32, 0))
        setStart(
          new Date(
            end.getFullYear(),
            end.getMonth(),
            end.getDay(),
            end.getHours() - 1,
            end.getMinutes(),
            end.getSeconds()
          )
        )

        break
      case 'search':
        break
      default:
    }
  }, [])

  return (
    <div className='col-12'>
      {start && end && <Loading />}
      <div className='row'>
        <div className='row'>
          <h3>Information sur le Bridge Port</h3>
        </div>
        <BridgePort
          start={start}
          end={end}
          style={{
            borderBottom: '1px solid gray',
            fontSize: '16px',
            fontWeight: 'bold',
            width: '300px',
          }}
        />
      </div>

      <div className='row'>
        <div className='row'>
          <h3>Information sur l'aggregation</h3>
        </div>
        <GponAggGem
          start={start}
          end={end}
          style={{
            borderBottom: '1px solid gray',
            fontSize: '16px',
            fontWeight: 'bold',
            width: '300px',
          }}
        />
      </div>

      <div className='row'>
        <div className='row'>
          <h3>Information sur le vlan Port</h3>
        </div>
        <VlanPort
          start={start}
          end={end}
          style={{
            borderBottom: '1px solid gray',
            fontSize: '16px',
            fontWeight: 'bold',
            width: '300px',
          }}
        />
      </div>
    </div>
  )
}

export default Fifteen