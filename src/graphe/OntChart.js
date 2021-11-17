import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'

import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'

const Ont = (props) => {
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  const currentont = useSelector((state) => state.currentONT)
  const filtered = useSelector((state) => state.ontFilter)

  var [goptions, setgoptions] = React.useState({
    series: [{}],
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
  React.useEffect(() => {
    var operobject = {
      series: [
        { name: 'interface Administration Status', data: [] },
        { name: 'interface Operation Status', data: [] },
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
          type: 'datetime',
        },
      },
    }

    var adminobject = {
      series: [{ name: 'interface Operation Status', data: [] }],
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
    console.log('avant', currentont.ObjectName, 'olt', currentolt.ObjectName)
    getTimeFrameData({
      collection: 'ISAM_ONT',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: currentont.ObjectName.split(':')[0],
      ObjectName: currentont.ObjectName,
    }).then((result) => {
      console.log({ ISAM_ONT: result })
      result[0].data.map((value) => {
        if (value['interface Operation Status'] === 'up') {
          operobject.series[0].data.push([
            new Date(value['timestamp']).getTime(),
            100,
          ])
        } else if (value['interface Operation Status'] === 'down') {
          operobject.series[0].data.push([
            new Date(value['timestamp']).getTime(),
            50,
          ])
        }
        if (value['interface Administration Status'] === 'up') {
          console.log(
            'timestamp',
            value['timestamp'],
            'date',
            new Date(value['timestamp'])
          )
          operobject.series[1].data.push([
            new Date(value['timestamp']).getTime(),
            200,
          ])
        } else if (value['interface Administration Status'] === 'down') {
          operobject.series[1].data.push([
            new Date(value['timestamp']).getTime(),
            150,
          ])
        }
      })
      setgoptions(operobject)
      //setg2options(adminobject)
    })
  }, [])

  return (
    <>
      {!goptions && !g2options && <Loading />}
      <div className='row'>
        <div className='col-4'>
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
            <h3>Etat Operationnel de l'ONT</h3>
          </div>
        </div>
        <div className='col-4'>
          <div className='row'>
            {/* <Chart
              options={g2options.options}
              series={g2options.series}
              type='line'
              height='500'
              width='600'
            />*/}
          </div>
          <div className='row'>
            <h3>Etat Administratif de l'ONT</h3>
          </div>
        </div>
      </div>
    </>
  )
}
export default Ont
