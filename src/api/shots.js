import apiUrl from '../apiConfig'
import axios from 'axios'

// Indexes all shots
export const index = (id, user) => {
  return axios({
    url: `${apiUrl}/clubs/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
// --------------------

// Creates a single club
export const createShot = (id, user, data) => {
  return axios({
    url: `${apiUrl}/clubs/${id}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: data
  })
}
// --------------------
