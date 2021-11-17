import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'

const VlanPort = (props) => {
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
        type: 'datetime',
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
        type: 'datetime',
      },
      grid: {
        show: true,
      },
    },
    chart: {
      width: '100%',
    },
  })
  var [g3options, setg3options] = React.useState({
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
        type: 'datetime',
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
    var v1000object = {
      series: [
        { name: 'Down Discard Byte', data: [] },
        { name: 'Up Discard Byte', data: [] },
        { name: 'Up Foward Byte', data: [] },
        { name: 'Down Foward Byte', data: [] },
      ],
      options: {
        color: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
        grid: {
          show: true,
        },
      },
      chart: {
        width: '100%',
      },
    }
    var v3000object = {
      series: [
        { name: 'Down Discard Byte', data: [] },
        { name: 'Up Discard Byte', data: [] },
        { name: 'Up Foward Byte', data: [] },
        { name: 'Down Foward Byte', data: [] },
      ],
      options: {
        color: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
        grid: {
          show: true,
        },
      },
      chart: {
        width: '100%',
      },
    }
    var v3001object = {
      series: [
        { name: 'Down Discard Byte', data: [] },
        { name: 'Up Discard Byte', data: [] },
        { name: 'Up Foward Byte', data: [] },
        { name: 'Down Foward Byte', data: [] },
      ],
      options: {
        color: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
        grid: {
          show: true,
        },
      },
      chart: {
        width: '100%',
      },
    }
    getTimeFrameData({
      collection: 'VlanPortAssociation',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: currentont.ObjectName.split(':')[0],
      ObjectName: currentont.ObjectName,
    }).then((result) => {
      console.log({ vlan: result })
      result[0].data.map((value) => {
        if (value.vlan === 'C1000') {
          v1000object.series[0].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Down Discard Byte'] * 0.001),
          ])
          v1000object.series[1].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Up Discard Byte'] * 0.001),
          ])
          v1000object.series[2].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Up Foward Byte'] * 0.001),
          ])
          v1000object.series[3].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Down Foward Byte'] * 0.001),
          ])
        } else if (value.vlan === 'C3000') {
          v3000object.series[0].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Down Discard Byte'] * 0.001),
          ])
          v3000object.series[1].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Up Discard Byte'] * 0.001),
          ])
          v3000object.series[2].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Up Foward Byte'] * 0.001),
          ])
          v3000object.series[3].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Down Foward Byte'] * 0.001),
          ])
        } else if (value.vlan === 'C3001') {
          v3001object.series[0].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Down Discard Byte'] * 0.001),
          ])
          v3001object.series[1].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Up Discard Byte'] * 0.001),
          ])
          v3001object.series[2].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Up Discard Byte'] * 0.001),
          ])
          v3001object.series[3].data.push([
            new Date(value['timestamp']).getTime(),
            parseInt(value['Down Discard Byte'] * 0.001),
          ])
        }
      })

      setgoptions(v1000object)
      setg2options(v3000object)
      setg3options(v3001object)
    })
  }, [])

  return (
    <>
      {!goptions && !g2options && !g3options && <Loading />}
      <div className='row'>
        <div className='col-12'>
          <div className='row'>
            <Chart
              options={goptions.options}
              series={goptions.series}
              type='line'
              height='500'
              width='600'
            />
          </div>
          <div className='row'>
            <h3>Association VLAN 3001/SERV1</h3>
          </div>
        </div>
        <div className='col-12'>
          <div className='row'>
            <Chart
              options={g2options.options}
              series={g2options.series}
              type='line'
              height='500'
              width='600'
            />
          </div>
          <div className='row'>
            <h3>Association VLAN 3000/C14 P1</h3>
          </div>
        </div>
        <div className='col-12'>
          <div className='row'>
            <Chart
              options={g3options.options}
              series={g3options.series}
              type='line'
              height='500'
              width='600'
            />
          </div>
          <div className='row'>
            <h3>Association VLAN 3000/C14 P1</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default VlanPort
