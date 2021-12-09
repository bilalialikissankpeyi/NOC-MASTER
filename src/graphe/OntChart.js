import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'

import { Card } from 'react-bootstrap'

const Ont = (props) => {
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  const currentont = useSelector((state) => state.currentONT)
  const filtered = useSelector((state) => state.ontFilter)

  var [goptions, setgoptions] = React.useState({
    series: [{}],
    options: {
      colors: ['#6ab04c', '#2980b9'],
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
  var [isOnt, setOnt] = React.useState(false)
  React.useEffect(() => {
    props.render.map((element) => {
      switch (element) {
        case "Etat de l'ONT":
          setOnt(true)
          break
      }
    })

    var operobject = {
      series: [
        { name: 'interface Administration Status', data: [] },
        { name: 'interface Operation Status', data: [] },
      ],
      options: {
        colors: ['#6ab04c', '#2980b9'],
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

    console.log('avant', currentont.ObjectName, 'olt', currentolt.ObjectName)
    getTimeFrameData({
      collection: 'ISAM_ONT',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: currentont.ObjectName.split(':')[0],
      ObjectName: currentont.ObjectName,
    }).then((result) => {
      if (result.length != 0) {
        console.log({ ISAM_ONT: result })
        result[0].data.map((value) => {
          if (value['interface Operation Status'] === 'up') {
            operobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              100,
            ])
          } else if (value['interface Operation Status'] === 'down') {
            operobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              0,
            ])
          }
        })
        setgoptions(operobject)
      }
    })
  }, [])

  return (
    <>
      {!goptions && <Loading />}
      {isOnt == true ? (
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
            <h3>Etat Operationnel de l'ONT</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
    </>
  )
}
export default Ont
