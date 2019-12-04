import apiUrl from '../apiConfig'
import axios from 'axios'

export const index = user => {
  return axios({
    url: `${apiUrl}/clubs`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
