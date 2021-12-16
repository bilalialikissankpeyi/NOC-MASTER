import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'
import { Card } from 'react-bootstrap'
const BridgePort = (props) => {
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  const searchTerm = useSelector((state) => state.searched)
  const filtered = useSelector((state) => state.ontFilter)

  var [goptions, setgoptions] = React.useState(null)
  var [g2options, setg2options] = React.useState(null)
  var [g3options, setg3options] = React.useState(null)

  var [isdebit, setDebit] = React.useState(false)
  var [isvolume, setVolume] = React.useState(false)
  var [isperte, setPerte] = React.useState(false)
  React.useEffect(() => {
    props.render.map((element) => {
      console.log('element', element)
      switch (element) {
        case 'Debit IN/OUT':
          setDebit(true)
          break
        case 'Volume IN/OUT':
          setVolume(true)
          break
        case 'Perte IN/OUT':
          setPerte(true)
          break
      }
    })
    var firstsobject = {
      series: [
        { name: 'Debit IN', data: [] },
        { name: 'Debit OUT', data: [] },
      ],
      options: {
        colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
        chart: {
          background: 'transparent',
        },
        title: {
          text: "Debit en Entree et En Sortie de l'ONT",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        xaxis: {
          type: 'datetime',
        },
      },
    }
    var secondsobject = {
      series: [
        { name: 'Volume IN', data: [] },
        { name: 'Volume OUT', data: [] },
      ],
      options: {
        colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
        chart: {
          background: 'transparent',
        },
        title: {
          text: "Volume en entree et sortie de L'ONT",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        xaxis: {
          type: 'datetime',
        },
      },
    }
    var thirdobject = {
      series: [
        { name: 'Perte IN', data: [] },
        { name: 'Perte OUT', data: [] },
      ],
      options: {
        colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
        chart: {
          background: 'transparent',
        },
        title: {
          text: "Perte de Packet en Entree et Sortie de l'ONT",
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: 'datetime',
        },
      },
    }

    getTimeFrameData({
      collection: 'BridgePort',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: searchTerm.ObjectName.split(':')[0],
      ObjectName: searchTerm.ObjectName,
    }).then((result) => {
      if (result.length != 0) {
        console.log('resrrr', result)
        result[0].data.map((value) => {
          if (value.type === 'SERV1') {
            //ToDO
          } else if (value.type === 'C14.P1') {
            //Debit IN
            firstsobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Foward Byte'] * 8) / (900 * 1024 * 1024)),
            ])
            //Debit OUT
            firstsobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Foward Byte'] * 8) / (900 * 1024 * 1024)),
            ])
            //Volume IN
            secondsobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Foward Byte'] * 8) / (1024 * 1024)),
            ])
            //Volume OUT
            secondsobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Foward Byte'] * 8) / (1024 * 1024)),
            ])
            //Ingress Discarded Byte
            thirdobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Discard Byte'] * 8) / (1024 * 1024)),
            ])
            //Outgress Discard Byte
            firstsobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Discard Byte'] * 8) / (3600 * 1024 * 1024)),
            ])
          }
        })
        setgoptions(firstsobject)
        setg2options(secondsobject)
        setg3options(thirdobject)
      } else {
        alert('Information Non Disponible')
      }
    })
  }, [])

  return (
    <>
      {isdebit == true ? (
        <Card>
          <Card.Body>
            {goptions == null ? (
              <Loading />
            ) : (
              <Chart
                options={goptions.options}
                series={goptions.series}
                type='line'
                height='500'
                width='600'
              />
            )}
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {isvolume == true ? (
        <Card>
          <Card.Body>
            {g2options == null ? (
              <Loading />
            ) : (
              <Chart
                options={g2options.options}
                series={g2options.series}
                type='line'
                height='500'
                width='600'
              />
            )}
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {isperte == true ? (
        <Card>
          <Card.Body>
            {g2options == null ? (
              <Loading />
            ) : (
              <Chart
                options={g2options.options}
                series={g2options.series}
                type='line'
                height='500'
                width='600'
              />
            )}
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
    </>
  )
}

export default BridgePort
