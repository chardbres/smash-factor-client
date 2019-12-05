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
