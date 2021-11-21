import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'

const OntEthPort = (props) => {
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
    var firstsobject = {
      series: [
        { name: 'interface Administration Status C1P1', data: [] },
        { name: 'interface Operation Status C1P1', data: [] },

        { name: 'interface Administration Status C1P2', data: [] },
        { name: 'interface Operation Status C1P2', data: [] },
      ],
      options: {
        color: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
        color: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
          //Carte 1 et 2 Administrativement Up et Down
          if (value['type'] === 'C1.P1') {
            firstsobject.options.xaxis.categories.push(value['timestamp'])
            if (value['interface Administration Status'] === 'up') {
              firstsobject.series[0].data.push(parseInt(100))
            } else if (value['interface Administration Status'] === 'down') {
              firstsobject.series[0].data.push(parseInt(50))
            }
          } else if (value['type'] === 'C1.P2') {
            firstsobject.options.xaxis.categories.push(value['timestamp'])
            if (value['interface Administration Status'] === 'up') {
              firstsobject.series[1].data.push(parseInt(200))
            } else if (value['interface Administration Status'] === 'down') {
              firstsobject.series[1].data.push(parseInt(150))
            }
          }
          //Carte 1 et 2 Operationnelement Up et Down
          if (value['type'] === 'C1.P1') {
            if (value['interface Operation Status'] === 'up') {
              firstsobject.series[2].data.push(parseInt(300))
            } else if (value['interface Operation Status'] === 'down') {
              firstsobject.series[2].data.push(parseInt(350))
            }
          } else if (value['type'] === 'C1.P2') {
            if (value['interface Operation Status'] === 'up') {
              firstsobject.series[3].data.push(parseInt(400))
            } else if (value['interface Operation Status'] === 'down') {
              firstsobject.series[3].data.push(parseInt(450))
            }
          }

          //Carte 3 et 4 Administrativement Up et Down
          if (value['type'] === 'C1.P3') {
            secondsobject.options.xaxis.categories.push(value['timestamp'])
            if (value['interface Administration Status'] === 'up') {
              secondsobject.series[0].data.push(parseInt(100))
            } else if (value['interface Administration Status'] === 'down') {
              secondsobject.series[0].data.push(parseInt(50))
            }
          } else if (value['type'] === 'C1.P4') {
            secondsobject.options.xaxis.categories.push(value['timestamp'])
            if (value['interface Administration Status'] === 'up') {
              secondsobject.series[1].data.push(parseInt(200))
            } else if (value['interface Administration Status'] === 'down') {
              secondsobject.series[1].data.push(parseInt(150))
            }
          }
          //Carte 3 et 4 Operationnelement Up et Down
          if (value['type'] === 'C1.P3') {
            if (value['interface Operation Status'] === 'up') {
              secondsobject.series[2].data.push(parseInt(300))
            } else if (value['interface Operation Status'] === 'down') {
              secondsobject.series[2].data.push(parseInt(350))
            }
          } else if (value['type'] === 'C1.P4') {
            if (value['interface Operation Status'] === 'up') {
              secondsobject.series[3].data.push(parseInt(400))
            } else if (value['interface Operation Status'] === 'down') {
              secondsobject.series[3].data.push(parseInt(450))
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
      <div className='row'>
        <div className='col-4'>
          <div className='row'>
            <Chart
              options={goptions.options}
              series={goptions.series}
              type='line'
              height='500'
              width='500'
            />
          </div>
          <div className='row'>
            <h3>
              Etat Operationnel Et Administratif des Ports P1 et P2 de l'ONT
            </h3>
          </div>
        </div>
        <div className='col-4'>
          <div className='row'>
            <Chart
              options={g2options.options}
              series={g2options.series}
              type='line'
              height='500'
              width='500'
            />
          </div>
          <div className='row'>
            <h3>
              Etat Operationnel Et Administratif des Ports P3 et P4 de l'ONT
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default OntEthPort
