import apiUrl from '../apiConfig'
import axios from 'axios'

// Indexes all shots
export const index = (id, user) => {
  console.log('Logs!')
  console.log(id)
  console.log(user)
  return axios({
    url: `${apiUrl}/shots`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
// --------------------

// Creates a single shot
export const createShot = (id, user, data) => {
  return axios({
    url: `${apiUrl}/clubs/shots/${id}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: data
  })
}
// --------------------
