import React from 'react'
/*
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
} from '@progress/kendo-react-charts'*/

import Chart from 'react-apexcharts'
import { getY, getX } from '../dataService/processData'
import Loading from './Loading'

//ALCLB2F6B123
const chartoptions = {
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
      categories: [],
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: false,
    },
  },
}

export default function PerformancePanel(props) {
  var [x, setX] = React.useState([])
  var [y, setY] = React.useState([])
  var [goptions, setgoptions] = React.useState({
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
        categories: [],
      },
      legend: {
        position: 'top',
      },
      grid: {
        show: false,
      },
    },
  })
  React.useEffect(() => {
    const chartOptions = {
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
          categories: [],
        },
        legend: {
          position: 'top',
        },
        grid: {
          show: false,
        },
      },
    }
    console.log('entre', props.data)
    getX(props.data, props.field).then((result) => {
      //console.log('resultat', result)
      chartOptions.options.xaxis.categories = []
      result.map((e) => {
        console.log('this is eeee', `${e}`)
        chartOptions.options.xaxis.categories.push(`${e}`)
      })
      console.log('categories', chartOptions.options.xaxis.categories)
      setX(result)
    })
    getY(props.data, props.field).then((result) => {
      chartOptions.series.push({ name: '', data: [] })
      result.map((e) => {
        var nbre
        switch (e) {
          case 'down':
            nbre = 0
            break
          case 'up':
            nbre = 1
            break
          default:
            nbre = e
        }
        chartOptions.series[0].data.push(Number(nbre))
      })
      //chartOptions.series[0].data.push(result)
      chartOptions.series[0].name = props.field
      console.log('series', chartOptions.series[0].data)
      setY(result)
      setgoptions(chartOptions)
    })
  }, [props.data, props.field])

  return (
    <>
      {!x && !y && <Loading />}
      {/* <h3>
        "this is x" {console.log("my", x)} , "this is y "{y}
      </h3>*/}
      <Chart
        options={goptions.options}
        series={goptions.series}
        type='line'
        height='100%'
      />
      {/* <Chart style={{ opacity: !x && !y ? 1 : 0 }}>
        <ChartTitle text={props.field} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={x} />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem type='line' data={y} />
        </ChartSeries>
      </Chart>*/}
    </>
  )
}
/*<Chart
                  options={chartoptions.options}
                  series={chartoptions.series}
                  type='line'
                  height='100%'
                />*/
