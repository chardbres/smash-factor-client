import apiUrl from '../apiConfig'
import axios from 'axios'

// Indexes all shots
export const index = (user, club_id) => {
  return axios({
    url: `${apiUrl}/clubs/${club_id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
// --------------------
