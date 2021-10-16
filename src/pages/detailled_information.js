import React from 'react'
import PositionsPanel from './PositionsPanel'

export default function Detailed(props) {
  var fifCollection = ['ONTAggGem', 'BridgePort', ' vlanPort']
  var oneCollection = [
    'vlanPortAssociation',
    'Uni',
    'Pon',
    'OntVeipPort',
    'OntEthPort',
    'Ont',
    'EthernetLineSlot',
    'CpuUsage',
    'EthernetPort',
  ]
  var dayCollection = ['vlanPortAssociation']
  var items = []

  if (props.dimension === '15 Minutes') {
    for (var i = 0; i < fifCollection.length; i++) {
      items.push(
        <div>
          <h3>{fifCollection[i]}</h3>
          <PositionsPanel
            collection={fifCollection[i]}
            regular={props.regular}
            start={props.start}
            end={props.end}
          />
        </div>
      )
    }
  } else if (props.dimension === '1 hour') {
    for (var i = 0; i < oneCollection.length; i++) {
      items.push(
        <div>
          <h3>{oneCollection[i]}</h3>
          <PositionsPanel
            collection={oneCollection[i]}
            regular={props.regular}
            start={props.start}
            end={props.end}
          />
        </div>
      )
    }
  } else if (props.dimension === '24 hours') {
    for (var i = 0; i < dayCollection.length; i++) {
      items.push(
        <div>
          <h3>{dayCollection[i]}</h3>
          <PositionsPanel
            collection={dayCollection[i]}
            regular={props.regular}
            start={props.start}
            end={props.end}
          />
        </div>
      )
    }
  }

  return <>{items}</>
}
