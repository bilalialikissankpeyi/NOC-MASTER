import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'
const OntVeiPort = (props) => {
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  const currentont = useSelector((state) => state.currentONT)
  const filtered = useSelector((state) => state.ontFilter)

  var [goptions, setgoptions] = React.useState({
    series: [{}],
    options: {
      color: ['#6ab04c', '#2980b9'],
      chart: {
        background: 'transparent',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
      },
      grid: {
        show: true,
      },
    },
    chart: {
      width: '100%',
    },
  })

  React.useEffect(() => {
    var operobject = {
      series: [
        { name: 'interface Administration Status', data: [] },
        { name: 'interface Operation Status', data: [] },
      ],
      options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
          background: 'transparent',
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
      collection: 'OntVeipPort',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: currentont.ObjectName.split(':')[0],
      ObjectName: currentont.ObjectName,
    }).then((result) => {
      if (result.length) {
        console.log({ VEIP: result })
        result[0].data.map((value) => {
          if (value['interface Operation Status'] === 'up') {
            operobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              100,
            ])
          } else if (value['interface Operation Status'] === 'down') {
            operobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              50,
            ])
          }
          if (value['interface Administration Status'] === 'up') {
            console.log(
              'timestamp',
              value['timestamp'],
              'date',
              new Date(value['timestamp'])
            )
            operobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              200,
            ])
          } else if (value['interface Administration Status'] === 'down') {
            operobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              150,
            ])
          }
        })
        setgoptions(operobject)
      } else {
      }
    })
  }, [])

  return (
    <>
      {!goptions && <Loading />}
      <Card>
        <Card.Body>
          {goptions.series === [{}] ? (
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
          <h3>Etat Operationnel et Administratif de la Voix</h3>
        </Card.Body>
      </Card>
    </>
  )
}

export default OntVeiPort
