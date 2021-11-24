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
  const currentont = useSelector((state) => state.currentONT)
  const filtered = useSelector((state) => state.ontFilter)

  var [goptions, setgoptions] = React.useState({
    series: [{}, {}],
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
  var [g2options, setg2options] = React.useState({
    series: [],
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
    var serv1object = {
      series: [
        { name: 'Up Fowarded Byte', data: [] },
        { name: 'Down Fowarded Byte', data: [] },
      ],
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
    }
    var c14P1object = {
      series: [
        { name: 'Up Fowarded Byte', data: [] },
        { name: 'Down Fowarded Byte', data: [] },
      ],
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
    }

    getTimeFrameData({
      collection: 'BridgePort',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: currentont.ObjectName.split(':')[0],
      ObjectName: currentont.ObjectName,
    }).then((result) => {
      if (result.length != 0) {
        console.log('resrrr', result)
        result[0].data.map((value) => {
          if (value.type === 'SERV1') {
            serv1object.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt(value['Up Foward Byte'] * 0.001),
            ])
            serv1object.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt(value['Down Foward Byte'] * 0.001),
            ])
          } else if (value.type === 'C14.P1') {
            c14P1object.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt(value['Up Foward Byte'] * 0.001),
            ])
            c14P1object.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt(value['Down Foward Byte'] * 0.001),
            ])
          }
        })

        setgoptions(serv1object)
        setg2options(c14P1object)
      } else {
      }
    })
  }, [])

  return (
    <>
      {!goptions && !g2options && <Loading />}
      <Card>
        <Card.Body>
          {goptions.series === [{}, {}] ? (
            <Loading />
          ) : (
            <Chart
              options={goptions.options}
              series={goptions.series}
              height='500'
              width='600'
            />
          )}
          <h3>BridgePort Port SERV1</h3>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          {g2options.series === [] ? (
            <Loading />
          ) : (
            <Chart
              options={g2options.options}
              series={g2options.series}
              height='500'
              width='600'
            />
          )}
          <h3>BridgePort Port C14 P1 </h3>
        </Card.Body>
      </Card>
    </>
  )
}

export default BridgePort
