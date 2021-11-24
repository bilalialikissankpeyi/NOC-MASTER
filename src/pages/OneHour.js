import React from 'react'
import Loading from '../graphe/Loading'
import OntEthPort from '../graphe/OntEthPortChart'
import OntVeiPort from '../graphe/ontVeiPortChart'
import VlanPort from '../graphe/VlanPortChart'
import Ont from '../graphe/OntChart'
import { Card } from 'react-bootstrap'

const Hour = (props) => {
  var [start, setStart] = React.useState(props.start)
  //new Date('2021-10-14T07:32:00.885Z')
  var [end, setEnd] = React.useState(props.end)
  React.useEffect(() => {}, [])
  return (
    <>
      {start && end && <Loading />}
      <div className='row'>
        <Card style={{ color: '#6ab04c' }}>
          <Card.Body>Statut de L'ONT</Card.Body>
        </Card>
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
        <Card style={{ color: '#6ab04c' }}>
          <Card.Body>Information sur La voix</Card.Body>
        </Card>
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
        <Card style={{ color: '#6ab04c' }}>
          <Card.Body>Information sur les Ports de L'ONT</Card.Body>
        </Card>
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
        <Card style={{ color: '#6ab04c' }}>
          <Card.Body>Information sur l'Association vlan et Port</Card.Body>
        </Card>
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
    </>
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
