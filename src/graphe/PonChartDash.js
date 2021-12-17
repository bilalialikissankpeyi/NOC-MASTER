import React from 'react'
import Chart from 'react-apexcharts'

import { useHistory } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import {
  getLastData,
  getDashBoardLastData,
} from '../dataService/getSearchInformations'

import Loading from './Loading'
const PonChartDash = (props) => {
  const history = useHistory()
  var [g2options, setg2options] = React.useState(null)
  var [g3options, setg3options] = React.useState(null)

  React.useEffect(() => {
    var firstsobject = {
      series: [
        { name: 'Etat du Service Up', data: [] },
        { name: 'Etat Administratif Up', data: [] },
        { name: 'Etat du Service Down', data: [] },
        { name: 'Etat Administratif Down', data: [] },
        { name: 'Capacite', data: [] },
      ],
      options: {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        title: {
          text: 'Pon',
        },
        xaxis: {
          type: 'datetime',
          categories: [],
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
      },
    }

    getDashBoardLastData({
      typeofSearch: 'getDashBoardLastData',
      collection: 'Pon',
      start: props.start,
      end: props.end,
    }).then((result) => {
      if (result.length != 0) {
        var AdmincounterUp = []
        var AdmincounterDown = []
        var OpercounterUp = []
        var OpercounterDown = []
        var categories = []
        result.map((element) => {
          if (element.data.length != 0) {
            element.data.map((subelement, index) => {
              if (OpercounterUp[index] == undefined) {
                OpercounterUp.push(0)
              }
              if (OpercounterDown[index] == undefined) {
                OpercounterDown.push(0)
                categories.push(new Date(subelement['timestamp']).getTime())
              }
              if (AdmincounterUp[index] == undefined) {
                AdmincounterUp.push(0)
              }
              if (AdmincounterDown[index] == undefined) {
                AdmincounterDown.push(0)
              }
              if (subelement['interface Administration Status'] == 'up') {
                AdmincounterUp[index] += 1
                //adminup++
              } else {
                AdmincounterDown[index] += 1
                //admindown++
              }

              if (subelement['interface Operation Status'] == 'up') {
                OpercounterUp[index] += 1
                //adminup++
              } else {
                OpercounterDown[index] += 1
                //admindown++
              }
            })
          }
        })

        console.log('categ', categories.length)
        firstsobject.series[0].data = OpercounterUp
        firstsobject.series[1].data = AdmincounterUp
        firstsobject.series[2].data = OpercounterDown
        firstsobject.series[3].data = AdmincounterDown
        firstsobject.options.xaxis.categories = categories
        setg2options(firstsobject)
        console.log('series', firstsobject.series)
      }
    })
  }, [])
  return (
    <>
      <div className='row'>
        <Card>
          <Card.Body>
            {g2options != null ? (
              <Chart
                options={g2options.options}
                series={g2options.series}
                type='bar'
                width='900'
                height='600'
              />
            ) : (
              <Loading />
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default PonChartDash
