import React from 'react'
import Chart from 'react-apexcharts'
import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'

var OLTUserInformationChart = (props) => {
  const currentolt = useSelector((state) => state.currentOLT)
  const history = useHistory()
  var [g2options, setg2options] = React.useState({
    series: [{}],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
      },
    },
    title: {
      text: 'Pon',
    },
    xaxis: {
      type: 'datetime',
      categories: [],
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
  })

  React.useEffect(() => {
    var firstsobject = {
      series: [
        { name: 'Up Operation Status', data: [] },
        { name: 'Up Admin Status', data: [] },
        { name: 'Down Operation Status', data: [] },
        { name: 'Down Admin Status', data: [] },
        { name: 'Nombre de Client', data: [] },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
        },
      },
      title: {
        text: 'Pon',
      },
      xaxis: {
        type: 'datetime',
        categories: [],
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
    }
    getTimeFrameData({
      typeofSearch: 'getTimeFrameData',
      collection: 'ISAM_ONT',
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
        firstsobject.series[0].data.concat(OpercounterUp)
        firstsobject.series[1].data.concat(AdmincounterUp)
        firstsobject.series[2].data.concat(OpercounterDown)
        firstsobject.series[3].data.concat(AdmincounterDown)
        firstsobject.xaxis.categories.push(categories)
        setg2options(firstsobject)
      }
    })
  }, [])
  return (
    <>
      <Card>
        <Card.Body>
          <h3>Etat des Utilisateurs</h3>
          {!g2options && <Loading />}
          <Chart
            options={g2options.options}
            series={g2options.series}
            type='bar'
            width='380'
          />
        </Card.Body>
      </Card>
    </>
  )
}

export default OLTUserInformationChart
