import React from 'react'
import { getMultipleEntries } from '../dataService/getSearchInformations'
import StatusCard from '../components/status-card/StatusCard'
const TotalOlt = () => {
  var [nbre, setNbre] = React.useState()
  React.useEffect(() => {
    getMultipleEntries({
      dbname: 'mydb',
      collection: 'OLT_INFO',
      query: '',
      typeofSearch: 'getLength',
    }).then((value) => {
      setNbre(value)
    })
  }, [])
  return (
    <>
      {!nbre}
      <StatusCard icon={'bx bx-receipt'} count={nbre} title={'TOTAL OLT'} />
    </>
  )
}
export default TotalOlt
