import React from 'react'
import Loading from '../graphe/Loading'
import OntEthPort from '../graphe/OntEthPortChart'
import OntVeiPort from '../graphe/ontVeiPortChart'
import PonChart from '../graphe/PonChartDash'
import CpuUsageChart from '../graphe/CpuChart'
import VlanPort from '../graphe/VlanPortChart'
import Ont from '../graphe/OntChart'
import { Card } from 'react-bootstrap'
import ontEthLinesLoT from '../graphe/OntEthLinesLoTChart'
const Hour = (props) => {
  var [start, setStart] = React.useState(props.start)
  //new Date('2021-10-14T07:32:00.885Z')
  var [end, setEnd] = React.useState(props.end)
  var [ont, setOnt] = React.useState([])
  var [ethport, setEthport] = React.useState([])
  var [veip, setVeip] = React.useState([])
  var [ethernetLinesLoT, setEthernetLinesLoT] = React.useState([])
  var [cpuUsage, setCpuUsage] = React.useState([])
  var [pon, setPon] = React.useState([])
  React.useEffect(() => {
    var ontArray = []
    var ethportArray = []
    var veipArray = []
    var ethernetLinesArray = []
    var cpuUsageArray = []
    var ponArray = []

    props.render.map((element) => {
      switch (element) {
        //Information Pour OLT
        case "Etat de l'ONT":
          ontArray.push(element)
          break
        case "Etat des Ports P1 et P2 de l'ONT":
          ethportArray.push(element)
          break
        case "Etat des Ports P3 et P4 de l'ONT":
          ethportArray.push(element)
          break
        case 'Etat de la carte virtuelle':
          veipArray.push(element)
          break

        //Information Pour OLT
        case 'Debit IN/OUT':
          ethernetLinesArray.push(element)
          break
        case 'Volume IN/OUT':
          ethernetLinesArray.push(element)
          break
        case 'Perte IN/OUT':
          ethernetLinesArray.push(element)
          break
        case 'Etat des utilisateurs':
          ontArray.push(element)
          break
        case 'Etat des PON':
          ponArray.push(element)
          break
        case 'Utilisation de la memoire OLT':
          cpuUsageArray.push(element)
          break
      }
    })
    setOnt(ontArray)
    setEthport(ethportArray)
    setVeip(veipArray)
    setEthernetLinesLoT(ethernetLinesArray)
    setPon(ponArray)
    setCpuUsage(cpuUsageArray)
  }, [])
  return (
    <>
      {start && end && <Loading />}
      {ont.length != 0 ? (
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
            render={ont}
          />
        </div>
      ) : (
        ''
      )}
      {veip.length != 0 ? (
        <div className='row'>
          <Card style={{ color: '#6ab04c' }}>
            <Card.Body>Information sur La carte Virtuel</Card.Body>
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
            render={veip}
          />
        </div>
      ) : (
        ''
      )}
      {ethport.length != 0 ? (
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
            render={ethport}
          />
        </div>
      ) : (
        ''
      )}
      {ethernetLinesLoT.length != 0 ? (
        <div className='row'>
          <Card style={{ color: '#6ab04c' }}>
            <Card.Body>Information sur L'UPLink DE L'OLT</Card.Body>
          </Card>
          <ontEthLinesLoT
            start={start}
            end={end}
            style={{
              borderBottom: '1px solid gray',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '300px',
            }}
            render={ethernetLinesLoT}
          />
        </div>
      ) : (
        ''
      )}
      {pon.length != 0 ? (
        <div className='row'>
          <Card style={{ color: '#6ab04c' }}>
            <Card.Body>Information sur L'Etat des Pon</Card.Body>
          </Card>
          <PonChart
            start={start}
            end={end}
            style={{
              borderBottom: '1px solid gray',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '300px',
            }}
            render={pon}
          />
        </div>
      ) : (
        ''
      )}
      {cpuUsage.length != 0 ? (
        <div className='row'>
          <Card style={{ color: '#6ab04c' }}>
            <Card.Body>
              Information sur l'utilisation de la Memoire de L'OLT
            </Card.Body>
          </Card>
          <CpuUsageChart
            start={start}
            end={end}
            style={{
              borderBottom: '1px solid gray',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '300px',
            }}
            render={cpuUsage}
          />
        </div>
      ) : (
        ''
      )}
    </>
  )
}
export default Hour
