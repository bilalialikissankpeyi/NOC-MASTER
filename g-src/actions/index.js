export const search = (dataloaded) => {
  return {
    type: 'SEARCH',
    payload: dataloaded,
  }
}
export const searchUserCollectionInTime = (dataloaded) => {
  return {
    type: 'SEARCHINTIME',
    payload: dataloaded,
  }
}

export const currentOLT = (current) => {
  return {
    type: 'CURRENTOLT',
    payload: current,
  }
}

export const currentONT = (current) => {
  return {
    type: 'CURRENTONT',
    payload: current,
  }
}

export const oltFilter = (filtred) => {
  return {
    type: 'OLTFILTER',
    payload: filtred,
  }
}
export const ontFilter = (filtred) => {
  return {
    type: 'ONTFILTER',
    payload: filtred,
  }
}
//
