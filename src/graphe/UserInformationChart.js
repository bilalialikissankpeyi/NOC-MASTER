import React from 'react'
import Chart from 'react-apexcharts'

import { useHistory } from 'react-router-dom'

import { getLastData } from '../dataService/getSearchInformations'

import Loading from '../graphe/Loading'

var UserInformation = (props) => {
  const history = useHistory()
  var [goptions, setgoptions] = React.useState({
    options: {
      labels: ['Down', 'Up'],
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(config.w.config.labels[config.dataPointIndex])
          },
        },
      },
    },
    series: [5, 10],
  })

  var [g2options, setg2options] = React.useState({
    options: {
      labels: ['Down', 'Up'],
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(config.w.config.labels[config.dataPointIndex])
          },
        },
      },
    },
    series: [5, 10],
  })
  var upAdminArray = []
  var downAdminArray = []
  var upOperArray = []
  var downOperArray = []
  React.useEffect(() => {
    getLastData({
      typeofSearch: 'getLastData',
      collection: 'ISAM_ONT',
      ObjectName: props.ObjectName,
      last: props.last,
      olt: props.olt,
    }).then((result) => {
      console.log({
        virm: result[0].data[0]['interface Administration Status'],
      })
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
            upOperArray.push({ ...element.data[0], ObjectID: element.ObjectID })
          } else if (element.data[0]['interface Operation Status'] === 'down') {
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
            labels: ['Up', 'Down'],
            chart: {
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  if (config.w.config.labels[config.dataPointIndex] === 'Up') {
                    history.push({ pathname: `/Details`, state: upOperArray })
                  } else if (
                    config.w.config.labels[config.dataPointIndex] === 'Down'
                  ) {
                    history.push({ pathname: `/Details`, state: downOperArray })
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
        setgoptions({
          options: {
            labels: ['Up', 'Down'],
            chart: {
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  if (config.w.config.labels[config.dataPointIndex] === 'Up') {
                    history.push({ pathname: `/Details`, state: upAdminArray })
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
    })
  }, [])
  return (
    <>
      <div className='col-6'>
        <h3>Statut Administratif des Utilisateurs</h3>
        {!goptions && <Loading />}
        <Chart
          options={goptions.options}
          series={goptions.series}
          type='pie'
          width='380'
        />
      </div>
      <div className='col-6'>
        <h3>Statut Operationnel des Utilisateurs</h3>
        {!g2options && <Loading />}
        <Chart
          options={g2options.options}
          series={g2options.series}
          type='pie'
          width='380'
        />
      </div>
    </>
  )
}

export default UserInformation
