import React from 'react'
import Chart from 'react-apexcharts'

import { useHistory } from 'react-router-dom'

import {
  getLastData,
  getDashBoardLastData,
} from '../dataService/getSearchInformations'
import { Card } from 'react-bootstrap'
import Loading from './Loading'
import { useSelector, useDispatch } from 'react-redux'
const PonChart = (props) => {
  const currentolt = useSelector((state) => state.currentOLT)

  const history = useHistory()
  var [g2options, setg2options] = React.useState({
    options: {
      colors: ['#ff8000', '#40ff00'],
      labels: ['Down', 'Up'],
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(config.w.config.labels[config.dataPointIndex])
          },
        },
      },
    },
    series: [5, 12],
  })
  var [g3options, setg3options] = React.useState({
    options: {
      colors: ['#ff8000', '#40ff00'],
      labels: ['Down', 'Up'],
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(config.w.config.labels[config.dataPointIndex])
          },
        },
      },
    },
    series: [8, 10],
  })

  var upAdminArray = []
  var downAdminArray = []
  var upOperArray = []
  var downOperArray = []

  React.useEffect(() => {
    if (props.ObjectName == undefined && props.olt == undefined) {
      console.log('cc')
      getTimeFrameData({
        collection: 'Pon',
        typeOfSearch: 'getTimeFrameData',
        start: props.start,
        end: props.end,
        olt: currentolt.ObjectName,
        ObjectName: currentolt.ObjectName,
      }).then((result) => {
        console.log('oui oui', result)
        if (result.length != 0) {
          console.log('oui oui', result.length)
          var AdmincounterUp = []
          var AdmincounterDown = []
          var OpercounterUp = []
          var OpercounterDown = []
          result.map((element) => {
            if (element.data.length != 0) {
              element.data.map((subelement, index) => {
                if (subelement['interface Administration Status'] == 'up') {
                  if (AdmincounterUp[index] == undefined) {
                    AdmincounterUp.push(1)
                  } else {
                    AdmincounterUp[index] += 1
                  }
                  //adminup++
                } else {
                  if (AdmincounterDown[index] == undefined) {
                    AdmincounterDown.push(1)
                  } else {
                    AdmincounterDown[index] += 1
                  }
                  //admindown++
                }
                if (subelement['interface Operation Status'] == 'up') {
                  if (OpercounterUp[index] == undefined) {
                    OpercounterUp.push(1)
                  } else {
                    OpercounterUp[index] += 1
                  }
                  //adminup++
                } else {
                  if (OpercounterDown[index] == undefined) {
                    OpercounterDown.push(1)
                  } else {
                    OpercounterDown[index] += 1
                  }
                  //admindown++
                }
              })
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
                        config.w.config.labels[config.dataPointIndex] === 'Up'
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

          if (upAdminArray.length != 0 || downAdminArray.length != 0) {
            console.log({ lonng: upOperArray.length })
            setg3options({
              options: {
                color: ['#2980b9', '#2980b6'],
                labels: ['Up', 'Down'],
                chart: {
                  events: {
                    dataPointSelection: (event, chartContext, config) => {
                      if (
                        config.w.config.labels[config.dataPointIndex] === 'Up'
                      ) {
                        history.push({
                          pathname: `/Details`,
                          state: upAdminArray,
                        })
                      } else if (
                        config.w.config.labels[config.dataPointIndex] === 'Down'
                      ) {
                        history.push({
                          pathname: `/Details`,
                          state: downAdminArray,
                        })
                      }
                    },
                  },
                },
              },
              series: [upAdminArray.length, downAdminArray.length],
            })
          }
        } else {
        }
      })
    } else {
      getLastData({
        typeofSearch: 'getLastData',
        collection: 'Pon',
        ObjectName: props.ObjectName,
        last: props.last,
        olt: props.olt,
      }).then((result) => {
        if (result.length != 0) {
          result.map((element) => {
            if (element.data.length != 0) {
              if (element.data[0]['interface Administration Status'] === 'up') {
                upAdminArray.push({
                  ...element.data[0],
                  ObjectID: element.ObjectID,
                })
              } else if (
                element.data[0]['interface Administration Status'] === 'down'
              ) {
                downAdminArray.push({
                  ...element.data[0],
                  ObjectID: element.ObjectID,
                })
              }

              if (element.data[0]['interface Operation Status'] === 'up') {
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
                        config.w.config.labels[config.dataPointIndex] === 'Up'
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

          if (upAdminArray.length != 0 || downAdminArray.length != 0) {
            console.log({ lonng: upOperArray.length })
            setg3options({
              options: {
                color: ['#2980b9', '#2980b6'],
                labels: ['Up', 'Down'],
                chart: {
                  events: {
                    dataPointSelection: (event, chartContext, config) => {
                      if (
                        config.w.config.labels[config.dataPointIndex] === 'Up'
                      ) {
                        history.push({
                          pathname: `/Details`,
                          state: upAdminArray,
                        })
                      } else if (
                        config.w.config.labels[config.dataPointIndex] === 'Down'
                      ) {
                        history.push({
                          pathname: `/Details`,
                          state: downAdminArray,
                        })
                      }
                    },
                  },
                },
              },
              series: [upAdminArray.length, downAdminArray.length],
            })
          }
        } else {
        }
      })
    }
  }, [])
  return (
    <>
      <div className='row'>
        <Card className='col-5' style={{ marginRight: '30px' }}>
          <Card.Body>
            <h3>Statut des Pon Administrativement</h3>
            {!g2options && <Loading />}
            <Chart
              options={g2options.options}
              series={g2options.series}
              type='pie'
              width='380'
            />
          </Card.Body>
        </Card>

        <Card className='col-5' style={{ marginLeft: '60px' }}>
          <Card.Body>
            <h3>Statut des Pon Operationnels</h3>
            {!g3options && <Loading />}
            <Chart
              options={g3options.options}
              series={g3options.series}
              type='pie'
              width='380'
            />
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default PonChart
