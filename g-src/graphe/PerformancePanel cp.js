import React from 'react'
import Chart from 'react-apexcharts'
import { getY, getX } from '../dataService/processData'
import Loading from './Loading'

import * as v1 from 'vega-lite-api'
import * as vega from 'vega'
import * as vegaLite from 'vega-lite'
import { Handler } from 'vega-tooltip'

//ALCLB2F6B123

export default function PerformancePanel(props) {
  var chartRef = React.useRef(null)
  var [prev, setPrevious] = React.useState(null)
  //const [ChartCom, setChartCom] = React.useState()

  React.useEffect(() => {
    const viz = v1
      .markLine({ size: 5, opacity: 0.5 })
      .encode(
        v1.x().fieldN('timestamp'),
        v1.y().fieldQ(props.field).scale({ zero: false })
      )

    v1.register(vega, vegaLite, {
      view: { renderer: 'svg' },
      init: (view) => {
        view.tooltip(new Handler().call())
      },
    })
    viz
      .data(props.data)
      .width(window.innerWidth)
      .height(window.innerHeight)
      .autosize({ type: 'fit', contains: 'padding' })
      .render()
      .then((chart) => {
        if (prev === null) {
          chartRef.current.appendChild(chart)
        } else {
          chartRef.current.replaceChild(chart, prev)
        }
        setPrevious(chart)
      })
  }, [props.data, props.field])

  return <div ref={chartRef}></div>
}
