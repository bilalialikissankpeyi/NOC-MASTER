import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'
import Loading from './Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'
import { Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
const OntEthLinesLoT = (props) => {
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  const currentont = useSelector((state) => state.currentONT)
  const filtered = useSelector((state) => state.ontFilter)

  var [goptions, setgoptions] = React.useState(null)
  var [g2options, setg2options] = React.useState(null)
  var [g3options, setg3options] = React.useState(null)

  var [isdebit, setDebit] = React.useState(false)
  var [isvolume, setVolume] = React.useState(false)
  var [isperte, setPerte] = React.useState(false)

  React.useEffect(() => {
    props.render.map((element) => {
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
          Text: "Debit IN/OUT UPLINK de l'OLT",
        },
        dataLabels: {
          enabled: false,
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
          Text: "Volume IN/OUT Uplink de L'OLT",
        },
        dataLabels: {
          enabled: false,
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
          Text: " Perte de Packet IN/OUT UPLINK de l'OLT",
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
      collection: 'EthernetLinesLot',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: currentolt.ObjectName,
      ObjectName: currentolt.ObjectName,
    }).then((result) => {
      if (result.length != 0) {
        console.log({ EthPort: result })
        result[0].data.map((value) => {
          if (
            value['interface Operation Status'] === 'up' &&
            value['interface High Speed'] != 0
          ) {
            //Debit IN
            firstsobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt(
                value['interface Ingress Octets'] / (3600 * 1024 * 1024)
              ),
            ])
            //Debit OUT
            firstsobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt(
                value['Interface Outgress Octets'] / (3600 * 1024 * 1024)
              ),
            ])
            //Volume IN
            secondsobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt(value['interface Ingress Octets'] / (1024 * 1024)),
            ])
            //Volume OUT
            secondsobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt(value['Interface Outgress Octets'] / (1024 * 1024)),
            ])
            //Ingress Discarded Byte
            thirdobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt(value['interface Ingress Discards'] / (1024 * 1024)),
            ])
            //Outgress Discard Byte
            thirdobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt(value['interface Outgress Discards'] / (1024 * 1024)),
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

export default OntEthLinesLoT
