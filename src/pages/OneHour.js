import React from 'react'
import Loading from '../graphe/Loading'
import OntEthPort from '../graphe/OntEthPortChart'
import OntVeiPort from '../graphe/ontVeiPortChart'
import VlanPort from '../graphe/VlanPortChart'
import Ont from '../graphe/OntChart'

const Hour = (props) => {
  var [start, setStart] = React.useState(props.start)
  //new Date('2021-10-14T07:32:00.885Z')
  var [end, setEnd] = React.useState(props.end)
  React.useEffect(() => {}, [])
  return (
    <div className='col-12'>
      {start && end && <Loading />}
      <div className='row'>
        <div className='row'>
          <h3>Statut de L'ONT</h3>
        </div>
        <Ont
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
          <h3>Information sur La voix</h3>
        </div>
        <OntVeiPort
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
          <h3>Information sur les Ports de L'ONT</h3>
        </div>
        <OntEthPort
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
          <h3>Information sur l'Association vlan et Port</h3>
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

export default Hour
/* switch (props.clicked) {
      case '1 heure':
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
      case '3 heure':
        //setEnd(new Date(2021, 10, 14, 7, 32, 0))
        setStart(
          new Date(
            end.getFullYear(),
            end.getMonth(),
            end.getDay(),
            end.getHours() - 3,
            end.getMinutes(),
            end.getSeconds()
          )
        )

        break
      case '6 heure':
        //setEnd(new Date(2021, 10, 14, 7, 32, 0))
        setStart(
          new Date(
            end.getFullYear(),
            end.getMonth(),
            end.getDay(),
            end.getHours() - 6,
            end.getMinutes(),
            end.getSeconds()
          )
        )

        break
      case '12 heure':
        setStart(
          new Date(
            end.getFullYear(),
            end.getMonth(),
            end.getDay(),
            end.getHours() - 12,
            end.getMinutes(),
            end.getSeconds()
          )
        )

        break
      case 'search':
        break
      default:
    }*/
