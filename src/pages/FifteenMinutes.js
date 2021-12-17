import React from 'react'
import Loading from '../graphe/Loading'
import BridgePort from '../graphe/BridgeChart'
import GponAggGem from '../graphe/GponAggGemChart'
import VlanPort from '../graphe/VlanPortChart'
import { Card } from 'react-bootstrap'
const Fifteen = (props) => {
  var [start, setStart] = React.useState(props.start)
  //new Date('2021-10-14T07:32:00.885Z')
  var [end, setEnd] = React.useState(props.end)
  var [bridge, setBridge] = React.useState([])
  var [gponAgg, setGponAgg] = React.useState([])
  var [vlan, setVlan] = React.useState([])
  React.useEffect(() => {
    var bridgeArray = []
    var gponAggArray = []
    var vlanArray = []
    props.render.map((element) => {
      switch (element) {
        case 'Debit IN/OUT':
          bridgeArray.push(element)
          break
        case 'Volume IN/OUT':
          bridgeArray.push(element)
          break
        case 'Perte IN/OUT':
          bridgeArray.push(element)
          break
        case 'ONT Aggregation Gem':
          gponAggArray.push(element)
          break
        case 'Debit IN/OUT Trafic Management':
          vlanArray.push(element)
          break
        case 'Debit IN/OUT Trafic Voix':
          vlanArray.push(element)
          break
        case 'Debit IN/OUT Trafic Internet':
          vlanArray.push(element)
          break
        case 'Volume IN/OUT Trafic Management':
          vlanArray.push(element)
          break
        case 'Volume IN/OUT Trafic Voix':
          vlanArray.push(element)
          break
        case 'Volume IN/OUT Trafic Internet':
          vlanArray.push(element)
          break
        case 'Perte IN/OUT Trafic Management':
          vlanArray.push(element)
          break
        case 'Perte IN/OUT Trafic Voix':
          vlanArray.push(element)
          break
        case 'Perte IN/OUT Trafic Internet':
          vlanArray.push(element)
          break
      }
    })
    console.log('bridegArray', bridgeArray)
    setBridge(bridgeArray)
    setGponAgg(gponAggArray)
    setVlan(vlanArray)
  }, [])

  return (
    <div className='col-12'>
      {!start && !end && <Loading />}
      {bridge.length != 0 ? (
        <div className='row'>
          <Card style={{ color: '#6ab04c' }}>
            <Card.Body>Information sur le Bridge Port</Card.Body>
          </Card>
          <BridgePort
            start={start}
            end={end}
            style={{
              borderBottom: '1px solid gray',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '300px',
            }}
            render={bridge}
          />
        </div>
      ) : (
        ''
      )}
      {gponAgg.length != 0 ? (
        <div className='row'>
          <Card style={{ color: '#6ab04c' }}>
            <Card.Body>Information sur l'aggregation</Card.Body>
          </Card>
          <GponAggGem
            start={start}
            end={end}
            style={{
              borderBottom: '1px solid gray',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '300px',
            }}
            render={gponAgg}
          />
        </div>
      ) : (
        ''
      )}
      {vlan.length != 0 ? (
        <div className='row'>
          <Card style={{ color: '#6ab04c' }}>
            <Card.Body>Information sur le vlan Port</Card.Body>
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
            render={vlan}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Fifteen
