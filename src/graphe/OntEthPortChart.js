import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'
import { Card } from 'react-bootstrap'
const OntEthPort = (props) => {
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
  var [g2options, setg2options] = React.useState({
    series: [],
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
  var [isOper, setOper] = React.useState(false)
  var [isAdmin, setAdmin] = React.useState(false)
  React.useEffect(() => {
    props.render.map((element) => {
      switch (element) {
        case "Etat des Ports P1 et P2 de l'ONT":
          setOper(true)
          break
        case "Etat des Ports P3 et P4 de l'ONT":
          setAdmin(true)
          break
      }
    })
    var firstsobject = {
      series: [
        { name: 'interface Administration Status C1P1', data: [] },
        { name: 'interface Operation Status C1P1', data: [] },

        { name: 'interface Administration Status C1P2', data: [] },
        { name: 'interface Operation Status C1P2', data: [] },
      ],
      options: {
        colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
        chart: {
          background: 'transparent',
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
        },
      },
    }
    var secondsobject = {
      series: [
        { name: 'interface Administration Status C1P3', data: [] },
        { name: 'interface Operation Status C1P3', data: [] },

        { name: 'interface Administration Status C1P4', data: [] },
        { name: 'interface Operation Status C1P4', data: [] },
      ],
      options: {
        colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
        chart: {
          background: 'transparent',
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
        },
      },
    }
    getTimeFrameData({
      collection: 'OntEthPort',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: currentont.ObjectName.split(':')[0],
      ObjectName: currentont.ObjectName,
    }).then((result) => {
      if (result.length) {
        console.log({ EthPort: result })
        result[0].data.map((value) => {
          //Carte 1 et 2 Operationnelement Up et Down
          if (value['type'] === 'C1.P1') {
            if (value['interface Operation Status'] === 'up') {
              firstsobject.series[2].data.push(parseInt(100))
            } else if (value['interface Operation Status'] === 'down') {
              firstsobject.series[2].data.push(parseInt(0))
            }
          } else if (value['type'] === 'C1.P2') {
            if (value['interface Operation Status'] === 'up') {
              firstsobject.series[3].data.push(parseInt(100))
            } else if (value['interface Operation Status'] === 'down') {
              firstsobject.series[3].data.push(parseInt(0))
            }
          }
          //Carte 3 et 4 Operationnelement Up et Down
          if (value['type'] === 'C1.P3') {
            if (value['interface Operation Status'] === 'up') {
              secondsobject.series[2].data.push(parseInt(100))
            } else if (value['interface Operation Status'] === 'down') {
              secondsobject.series[2].data.push(parseInt(0))
            }
          } else if (value['type'] === 'C1.P4') {
            if (value['interface Operation Status'] === 'up') {
              secondsobject.series[3].data.push(parseInt(100))
            } else if (value['interface Operation Status'] === 'down') {
              secondsobject.series[3].data.push(parseInt(0))
            }
          }
        })
        setgoptions(firstsobject)
        setg2options(secondsobject)
      } else {
      }
    })
  }, [])

  return (
    <>
      {!goptions && !g2options && <Loading />}
      {isOper == true ? (
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
            <h3>Etat Operationnel des Ports P1 et P2 de l'ONT</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {isAdmin == true ? (
        <Card>
          <Card.Body>
            {g2options.series === [] ? (
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
            <h3>Etat Operationnel des Ports P3 et P4 de l'ONT</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
    </>
  )
}

export default OntEthPort
