import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'

const BridgePort = (props) => {
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
      grid: {
        show: true,
      },
    },
    chart: {
      width: '100%',
    },
  })
  var [g2options, setg2options] = React.useState({
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
      grid: {
        show: true,
      },
    },
    chart: {
      width: '100%',
    },
  })

  React.useEffect(() => {
    var serv1object = {
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
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          categories: [],
        },
        grid: {
          show: true,
        },
      },
      chart: {
        width: '100%',
      },
    }
    var c14P1object = {
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
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          categories: [],
        },
        grid: {
          show: true,
        },
      },
      chart: {
        width: '100%',
      },
    }

    getTimeFrameData({
      collection: 'BridgePort',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: currentolt.ObjectName,
      ObjectName: currentont.ObjectName,
    }).then((result) => {
      result[0].data.map((value) => {
        if (value.type === 'SERV1') {
          serv1object.series[0].data.push(
            parseInt(value['Up Foward Byte'] * 0.001)
          )
          serv1object.series[1].data.push(
            parseInt(value['Down Foward Byte'] * 0.001)
          )
          console.log('timestamp', value['timestamp'])
          serv1object.options.xaxis.categories.push(value['timestamp'])
          console.log('timestamp', serv1object.options.xaxis.categories[0])
        } else if (value.type === 'C14.P1') {
          c14P1object.series[0].data.push(
            parseInt(value['Up Foward Byte'] * 0.001)
          )
          c14P1object.series[1].data.push(
            parseInt(value['Down Foward Byte'] * 0.001)
          )
          c14P1object.options.xaxis.categories.push(value['timestamp'])
        }
      })
      console.log({ resultat: serv1object.options.xaxis.categories })
      setgoptions(serv1object)
      setg2options(c14P1object)
    })
  }, [])

  return (
    <>
      {!goptions && !g2options && <Loading />}
      <div className='row'>
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
            <h3>BridgePort Port SERV1</h3>
          </div>
        </div>
        <div className='col-6'>
          <div className='row'>
            <Chart
              options={g2options.options}
              series={g2options.series}
              type='line'
              height='100%'
            />
          </div>
          <div className='row'>
            <h3>BridgePort Port C14 P1 </h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default BridgePort
