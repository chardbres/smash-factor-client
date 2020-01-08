import apiUrl from '../apiConfig'
import axios from 'axios'

// Indexes all shots
export const index = (clubId, user) => {
  return axios({
    url: `${apiUrl}/shots`,
    method: 'GET',
    headers: {
      id: `${clubId}`,
      Authorization: `Bearer ${user.token}`
    }
  })
}
// --------------------

// Creates a single shot
export const createShot = (user, data) => {
  return axios({
    url: `${apiUrl}/shots`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: data
  })
}
// --------------------

export default { index, createShot }
