import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'

const GponAggGem = (props) => {
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  const currentont = useSelector((state) => state.currentONT)
  const filtered = useSelector((state) => state.ontFilter)

  var [goptions, setgoptions] = React.useState({
    series: [{}, {}],
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
    },
    chart: {
      width: '100%',
    },
  })
  React.useEffect(() => {
    var aggobject = {
      series: [
        { name: 'Up Fowarded Byte', data: [] },
        { name: 'Down Fowarded Byte', data: [] },
      ],
      options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
          background: 'transparent',
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
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
          aggobject.series[0].data.push(
            parseInt(value['Recieve Blocks'] * 0.001)
          )
          aggobject.series[1].data.push(
            parseInt(value['Transmit Blocks'] * 0.001)
          )

          aggobject.options.xaxis.categories.push(value['timestamp'])
        })
        setgoptions(aggobject)
      }
    })
  }, [])

  return (
    <>
      {!goptions && <Loading />}
      <div className='col-6'>
        <div className='row'>
          <Chart
            options={goptions.options}
            series={goptions.series}
            type='line'
            height='100%'
          />
        </div>
        <div className='row'>
          <h3>ONT AggGem </h3>
        </div>
      </div>
    </>
  )
}

export default GponAggGem
