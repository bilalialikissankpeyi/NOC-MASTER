import React from 'react'
import Chart from 'react-apexcharts'

import { useHistory } from 'react-router-dom'

import { getLastData } from '../dataService/getSearchInformations'

import Loading from './Loading'
const CpuChart = (props) => {
  const history = useHistory()
  var [g2options, setg2options] = React.useState({
    options: {
      colors: ['#808080', '#0080ff'],
      labels: ['Down', 'Up'],
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(config.w.config.labels[config.dataPointIndex])
          },
        },
      },
    },
    series: [7, 10],
  })

  var [goptions, setgoptions] = React.useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: ['LT5', 'LT4', 'LT3', 'LT2', 'LT1'],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [1145, 1133, 2000, 1010, 2310],
      },
    ],
  })

  var upOperArray = []
  var downOperArray = []
  React.useEffect(() => {
    var memorieUsageobject = {
      series: [{ name: 'memAbsoluteUsage', data: [] }],
      options: {
        color: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
          categories: [],
        },
        grid: {
          show: true,
        },
      },
      chart: {
        width: '100%',
      },
    }
    getLastData({
      typeofSearch: 'getLastData',
      collection: 'CpuUsage',
      ObjectName: props.ObjectName,
      last: props.last,
      olt: props.olt,
    }).then((result) => {
      if (result.length != 0) {
        console.log('meme', result[0])
        result.map((element) => {
          console.log({ longuer: element.data.length })
          if (element.data.length != 0) {
            memorieUsageobject.series[0].data.push(
              element.data[0]['memory Absolute Usage']
            )
            memorieUsageobject.options.xaxis.categories.push(
              element.ObjectID.split(':')[1].split('.')[2]
            )
            if (element.data[0]['interface Operation Status'] === null) {
              console.log('resl', result)
              upOperArray.push({
                ...element.data[0],
                ObjectID: element.ObjectID,
              })
            } else if (
              element.data[0]['interface Operation Status'] === 'down'
            ) {
              downOperArray.push({
                ...element.data[0],
                ObjectID: element.ObjectID,
              })
            }
          }
        })

        if (upOperArray.length != 0 || downOperArray.length != 0) {
          console.log({ lonng: upOperArray.length })
          setg2options({
            options: {
              color: ['#6ab04c', '#2980c9'],
              labels: ['Up', 'Down'],
              chart: {
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    if (
                      config.w.config.labels[config.dataPointIndex] === 'null'
                    ) {
                      history.push({
                        pathname: `/Details`,
                        state: upOperArray,
                      })
                    } else if (
                      config.w.config.labels[config.dataPointIndex] === 'Down'
                    ) {
                      history.push({
                        pathname: `/Details`,
                        state: downOperArray,
                      })
                    }
                  },
                },
              },
            },
            series: [upOperArray.length, downOperArray.length],
          })
        }
        setgoptions(memorieUsageobject)
      } else {
      }
    })
  }, [])

  return (
    <>
      {!goptions && !g2options && <Loading />}
      <div className='col-6'>
        <h3>Utilisateur Actif sur l'ensemble des Cartes</h3>
        {g2options.series === [7, 10] ? (
          <Loading />
        ) : (
          <Chart
            options={g2options.options}
            series={g2options.series}
            type='pie'
            width='380'
          />
        )}
      </div>
      <div className='col-6'>
        <h3>Utilisation de la Memoire</h3>
        {goptions.series[0].data === [1145, 1133, 2000, 1010, 2310] ? (
          <Loading />
        ) : (
          <Chart
            options={goptions.options}
            series={goptions.series}
            type='bar'
            width='500'
          />
        )}
      </div>
    </>
  )
}

export default CpuChart
