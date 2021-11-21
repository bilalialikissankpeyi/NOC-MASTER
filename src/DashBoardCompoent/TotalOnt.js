import React from 'react'
import { getMultipleEntries } from '../dataService/getSearchInformations'
import StatusCard from '../components/status-card/StatusCard'
const TotalOnt = () => {
  var [nbre, setNbre] = React.useState()
  React.useEffect(() => {
    getMultipleEntries({
      dbname: 'mydb',
      collection: 'ISAM_ONT',
      query: '',
      typeofSearch: 'getLength',
    }).then((value) => {
      console.log('value', value)
      setNbre(value)
    })
  }, [])
  return (
    <>
      {!nbre}
      <StatusCard icon={'bx bx-receipt'} count={nbre} title={'TOTAL ONT'} />
    </>
  )
}
export default TotalOnt
