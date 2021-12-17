import React from 'react'
import Chart from 'react-apexcharts'
import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { getTimeFrameData } from '../dataService/getSearchInformations'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
const CpuChart = (props) => {
  const currentolt = useSelector((state) => state.currentOLT)

  const history = useHistory()

  var [goptions, setgoptions] = React.useState(null)

  React.useEffect(() => {
    var memorieUsageobject = {
      series: [],
      options: {
        color: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
        chart: {
          background: 'transparent',
        },
        title: {
          text: 'Utilisation de la memoire',
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
    }

    getTimeFrameData({
      typeOfSearch: 'getTimeFrameData',
      collection: 'CpuUsage',
      ObjectName: props.ObjectName,
      start: props.start,
      end: props.end,
      olt: currentolt.ObjectName,
      ObjectName: currentolt.ObjectName,
    }).then((result) => {
      if (result.length != 0) {
        console.log('meme', result[0])
        result.map((element) => {
          console.log({ longuer: element.data.length })
          memorieUsageobject.series.push({
            name: element.ObjectID.split(':')[1].split('.')[2],
            data: [],
          })
          if (element.data.length != 0) {
            element.data.map((subelement) => {
              memorieUsageobject.series[
                memorieUsageobject.series.length - 1
              ].data.push([
                new Date(subelement['timestamp']).getTime(),
                subelement['memory Absolute Usage'],
              ])
            })
          }
        })
        setgoptions(memorieUsageobject)
      } else {
      }
    })
  }, [])

  return (
    <>
      <div className='row'>
        <Card>
          <Card.Body>
            {goptions == null ? (
              <Loading />
            ) : (
              <Chart
                options={goptions.options}
                series={goptions.series}
                type='line'
                width='600'
                height='600'
              />
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default CpuChart
