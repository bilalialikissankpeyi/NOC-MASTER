import React from 'react'
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
} from '@progress/kendo-react-charts'

import { getY, getX } from '../dataService/processData'
import Loading from './Loading'

export default function PerformancePanel(props) {
  var [x, setX] = React.useState([])
  var [y, setY] = React.useState([])
  React.useEffect(() => {
    console.log('entre', props.data)
    getX(props.data, props.field).then((result) => {
      console.log('resultat', result)
      setX(result)
    })
    getY(props.data, props.field).then((result) => {
      setY(result)
    })
  }, [props.data, props.field])

  return (
    <>
      {!x && !y && <Loading />}
      {/* <h3>
        "this is x" {console.log("my", x)} , "this is y "{y}
      </h3>*/}
      <Chart style={{ opacity: !x && !y ? '0' : '1' }}>
        <ChartTitle text={props.field} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={x} />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem type='line' data={y} />
        </ChartSeries>
      </Chart>
    </>
  )
}
