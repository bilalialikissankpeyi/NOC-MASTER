import React from 'react'
import { getTimeFrameData } from '../dataService/getSearchInformations'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../graphe/Loading'
import Chart from 'react-apexcharts'
import { currentONT, ontFilter } from '../actions'
import { Card } from 'react-bootstrap'
import {
  ManagDebInOutobject,
  ManagVolInOutobject,
  ManagPerInOutobject,
  IntDebInOutobject,
  IntVolInOutobject,
  IntPerInOutobject,
  VoDebInOutobject,
  VoVolInOutobject,
  VoPerInOutobject,
} from './Options/vlanOpt'

const VlanPort = (props) => {
  const dispatch = useDispatch()
  const currentolt = useSelector((state) => state.currentOLT)
  const currentont = useSelector((state) => state.currentONT)
  const filtered = useSelector((state) => state.ontFilter)

  //Internet
  var [gIntDebInOutobject, setgIntDebInOutobject] = React.useState({
    series: [
      { name: 'Debit IN', data: [] },
      { name: 'Debit OUT', data: [] },
    ],
    options: {
      colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
  })
  var [gIntVolInOutobject, setgIntVolInOutobject] = React.useState({
    series: [
      { name: 'Volume IN', data: [] },
      { name: 'Volume OUT', data: [] },
    ],
    options: {
      colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
  })
  var [gIntPerInOutobject, setgIntPerInOutobject] = React.useState({
    series: [
      { name: 'Perte IN', data: [] },
      { name: 'Perte OUT', data: [] },
    ],
    options: {
      colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
  })
  //Management
  var [gManagDebInOutobject, setgManagDebInOutobject] = React.useState({
    series: [
      { name: 'Debit IN', data: [] },
      { name: 'Debit OUT', data: [] },
    ],
    options: {
      colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
  })
  var [gManagVolInOutobject, setgManagVolInOutobject] = React.useState({
    series: [
      { name: 'Volume IN', data: [] },
      { name: 'Volume OUT', data: [] },
    ],
    options: {
      colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
  })
  var [gManagPerInOutobject, setgManagPerInOutobject] = React.useState({
    series: [
      { name: 'Perte IN', data: [] },
      { name: 'Perte OUT', data: [] },
    ],
    options: {
      colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
  })
  //Voix
  var [gVoDebInOutobject, setgVoDebInOutobject] = React.useState({
    series: [
      { name: 'Debit IN', data: [] },
      { name: 'Debit OUT', data: [] },
    ],
    options: {
      colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
  })
  var [gVoVolInOutobject, setgVoVolInOutobject] = React.useState({
    series: [
      { name: 'Volume IN', data: [] },
      { name: 'Volume OUT', data: [] },
    ],
    options: {
      colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
  })
  var [gVoPerInOutobject, setgVoPerInOutobject] = React.useState({
    series: [
      { name: 'Perte IN', data: [] },
      { name: 'Perte OUT', data: [] },
    ],
    options: {
      colors: ['#6ab04c', '#2980b9', '#2980b6', '#2980c9'],
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
  })
  //Bool d'affichage
  var [debInOutManag, setDebInOutManag] = React.useState(false)
  var [debInOutInt, setDebInOutInt] = React.useState(false)
  var [debInOutVo, setDebInOutVo] = React.useState(false)
  var [volInOutManag, setVolInOutManag] = React.useState(false)
  var [volInOutInt, setVolInOutInt] = React.useState(false)
  var [volInOutVo, setVolInOutVo] = React.useState(false)
  var [perInOutManag, setPerInOutManag] = React.useState(false)
  var [perInOutInt, setPerInOutInt] = React.useState(false)
  var [perInOutVo, setPerInOutVo] = React.useState(false)

  React.useEffect(() => {
    props.render.map((element) => {
      switch (element) {
        case 'Debit IN/OUT Trafic Management':
          setDebInOutManag(true)
          break
        case 'Debit IN/OUT Trafic Voix':
          setDebInOutVo(true)
          break
        case 'Debit IN/OUT Trafic Internet':
          setDebInOutInt(true)
          break
        case 'Volume IN/OUT Trafic Management':
          setVolInOutManag(true)
          break
        case 'Volume IN/OUT Trafic Voix':
          setVolInOutVo(true)
          break
        case 'Volume IN/OUT Trafic Internet':
          setVolInOutInt(true)
          break
        case 'Perte IN/OUT Trafic Management':
          setPerInOutManag(true)
          break
        case 'Perte IN/OUT Trafic Voix':
          setPerInOutVo(true)
          break
        case 'Perte IN/OUT Trafic Internet':
          setPerInOutInt(true)
          break
      }
    })

    getTimeFrameData({
      collection: 'VlanPortAssociation',
      typeOfSearch: 'getTimeFrameData',
      start: props.start,
      end: props.end,
      olt: currentont.ObjectName.split(':')[0],
      ObjectName: currentont.ObjectName,
    }).then((result) => {
      if (result.length != 0) {
        console.log({ vlan: result })
        result[0].data.map((value) => {
          if (value.vlan === 'C1000') {
            //Up values
            IntDebInOutobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Foward Byte'] * 8) / (900 * 1024 * 1024)),
            ])
            IntVolInOutobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Foward Byte'] * 8) / (1024 * 1024)),
            ])
            IntPerInOutobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Discard Byte'] * 8) / (1024 * 1024)),
            ])
            //Down values
            IntDebInOutobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Foward Byte'] * 8) / (900 * 1024 * 1024)),
            ])
            IntVolInOutobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Foward Byte'] * 8) / (1024 * 1024)),
            ])
            IntPerInOutobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Discard Byte'] * 8) / (1024 * 1024)),
            ])
          } else if (value.vlan === 'C3000') {
            //Up values
            VoDebInOutobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Foward Byte'] * 8) / (900 * 1024 * 1024)),
            ])
            VoVolInOutobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Foward Byte'] * 8) / (1024 * 1024)),
            ])
            VoPerInOutobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Discard Byte'] * 8) / (1024 * 1024)),
            ])
            //Down values
            VoDebInOutobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Foward Byte'] * 8) / (900 * 1024 * 1024)),
            ])
            VoVolInOutobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Foward Byte'] * 8) / (1024 * 1024)),
            ])
            VoPerInOutobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Discard Byte'] * 8) / (1024 * 1024)),
            ])
          } else if (value.vlan === 'C3001') {
            //Up values
            ManagDebInOutobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Foward Byte'] * 8) / (900 * 1024 * 1024)),
            ])
            ManagVolInOutobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Foward Byte'] * 8) / (1024 * 1024)),
            ])
            ManagPerInOutobject.series[0].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Up Discard Byte'] * 8) / (1024 * 1024)),
            ])
            //Down values
            ManagDebInOutobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Foward Byte'] * 8) / (900 * 1024 * 1024)),
            ])
            ManagVolInOutobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Foward Byte'] * 8) / (1024 * 1024)),
            ])
            ManagPerInOutobject.series[1].data.push([
              new Date(value['timestamp']).getTime(),
              parseInt((value['Down Discard Byte'] * 8) / (1024 * 1024)),
            ])
          } else {
            alert('Information Non Traite')
          }
        })
        //Setting in Internet
        setgIntDebInOutobject(IntDebInOutobject)
        setgIntVolInOutobject(IntVolInOutobject)
        setgIntPerInOutobject(IntPerInOutobject)
        //Setting in Voix
        setgVoDebInOutobject(VoDebInOutobject)
        setgVoVolInOutobject(VoVolInOutobject)
        setgVoPerInOutobject(VoPerInOutobject)
        //Setting in Management
        setgManagDebInOutobject(ManagDebInOutobject)
        setgManagVolInOutobject(ManagVolInOutobject)
        setgManagPerInOutobject(ManagPerInOutobject)
      } else {
        alert('')
      }
    })
  }, [])

  return (
    <>
      {!gManagPerInOutobject &&
        !gIntPerInOutobject &&
        !gVoPerInOutobject &&
        !gManagDebInOutobject &&
        !gIntDebInOutobject &&
        !gVoDebInOutobject &&
        !gManagVolInOutobject &&
        !gIntVolInOutobject &&
        !gVoVolInOutobject && <Loading />}

      {/*graphe Perte*/}
      {perInOutManag == true ? (
        <Card>
          <Card.Body>
            {' '}
            {gManagPerInOutobject.series === [] ? (
              <Loading />
            ) : (
              <Chart
                options={gManagPerInOutobject.options}
                series={gManagPerInOutobject.series}
                height='500'
                width='600'
                type='line'
              />
            )}
            <h3>Perte de Paquet VLAN Management</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {perInOutVo == true ? (
        <Card>
          <Card.Body>
            {' '}
            {gVoPerInOutobject.series === [] ? (
              <Loading />
            ) : (
              <Chart
                options={gVoPerInOutobject.options}
                series={gVoPerInOutobject.series}
                height='500'
                width='600'
                type='line'
              />
            )}
            <h3>Perte de Paquet VLAN Voix</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {perInOutInt == true ? (
        <Card>
          <Card.Body>
            {' '}
            {gIntPerInOutobject.series === [] ? (
              <Loading />
            ) : (
              <Chart
                options={gIntPerInOutobject.options}
                series={gIntPerInOutobject.series}
                height='500'
                width='600'
                type='line'
              />
            )}
            <h3>Perte de Paquet VLAN Internet</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {/**Graphe Debit */}
      {debInOutManag == true ? (
        <Card>
          <Card.Body>
            {' '}
            {gManagDebInOutobject.series === [] ? (
              <Loading />
            ) : (
              <Chart
                options={gManagDebInOutobject.options}
                series={gManagDebInOutobject.series}
                height='500'
                width='600'
                type='line'
              />
            )}
            <h3>Debit du Trafic sur VLAN de Management</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {debInOutVo == true ? (
        <Card>
          <Card.Body>
            {' '}
            {gVoDebInOutobject.series === [] ? (
              <Loading />
            ) : (
              <Chart
                options={gVoDebInOutobject.options}
                series={gVoDebInOutobject.series}
                height='500'
                width='600'
                type='line'
              />
            )}
            <h3>Debit du Trafic sur le VLAN Voix</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {debInOutInt == true ? (
        <Card>
          <Card.Body>
            {' '}
            {gIntDebInOutobject.series === [] ? (
              <Loading />
            ) : (
              <Chart
                options={gIntDebInOutobject.options}
                series={gIntDebInOutobject.series}
                height='500'
                width='600'
                type='line'
              />
            )}
            <h3>Debit du Trafic VLAN Internet</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {/*Graphe Volume */}
      {volInOutManag == true ? (
        <Card>
          <Card.Body>
            {' '}
            {gManagVolInOutobject.series === [] ? (
              <Loading />
            ) : (
              <Chart
                options={gManagVolInOutobject.options}
                series={gManagVolInOutobject.series}
                height='500'
                width='600'
                type='line'
              />
            )}
            <h3>Volume du Trafic sur VLAN de Management</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {volInOutVo == true ? (
        <Card>
          <Card.Body>
            {' '}
            {gVoVolInOutobject.series === [] ? (
              <Loading />
            ) : (
              <Chart
                options={gVoVolInOutobject.options}
                series={gVoVolInOutobject.series}
                height='500'
                width='600'
                type='line'
              />
            )}
            <h3>Volume du Trafic sur le VLAN Voix</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
      {volInOutInt == true ? (
        <Card>
          <Card.Body>
            {' '}
            {gIntVolInOutobject.series === [] ? (
              <Loading />
            ) : (
              <Chart
                options={gIntVolInOutobject.options}
                series={gIntVolInOutobject.series}
                height='500'
                width='600'
                type='line'
              />
            )}
            <h3>Volume du Trafic sur le VLAN Internet</h3>
          </Card.Body>
        </Card>
      ) : (
        ''
      )}
    </>
  )
}

export default VlanPort
