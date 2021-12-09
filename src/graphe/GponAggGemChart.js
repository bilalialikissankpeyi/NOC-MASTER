import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'
import { Card } from 'react-bootstrap'

const GponAggGem = (props) => {
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  const currentont = useSelector((state) => state.currentONT)
  const filtered = useSelector((state) => state.ontFilter)

  var [goptions, setgoptions] = React.useState({
    series: [{}, {}],
    options: {
      colors: ['#6ab04c', '#2980b9'],
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
    },
    chart: {
      width: '100%',
    },
  })
  var [isgponAgg, setGponAgg] = React.useState(false)
  React.useEffect(() => {
    props.render.map((element) => {
      console.log('element', element)
      switch (element) {
        case 'ONT Aggregation Gem':
          setGponAgg(true)
          break
      }
    })
    var aggobject = {
      series: [
        { name: 'Up Fowarded Byte', data: [] },
        { name: 'Down Fowarded Byte', data: [] },
      ],
      options: {
        colors: ['#6ab04c', '#2980b9'],
        chart: {
          background: 'transparent',
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: 'datetime',
        },
      },
    }

    getTimeFrameData({
      collection: 'ONTAggGem',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: currentont.ObjectName.split(':')[0],
      ObjectName: currentont.ObjectName,
    }).then((result) => {
      if (result.length != 0) {
        console.log('sss', result)
        result[0].data.map((value) => {
          aggobject.series[0].data.push([
            value['timestamp'],
            parseInt(value['Recieve Blocks'] * 0.008),
          ])
          aggobject.series[1].data.push([
            value['timestamp'],
            parseInt(value['Transmit Blocks'] * 0.008),
          ])
        })
        setgoptions(aggobject)
      }
    })
  }, [])

  return (
    <>
      {!goptions && <Loading />}
      {isgponAgg == true ? (
        <Card>
          <Card.Body>
            {goptions.series === [{}, {}] ? (
              <Loading />
            ) : (
              <Chart
                options={goptions.options}
                series={goptions.series}
                height='500'
                width='600'
                type='line'
              />
            )}
            <h3>ONT Aggregation Gem </h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
    </>
  )
}

export default GponAggGem
