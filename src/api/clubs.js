import apiUrl from '../apiConfig'
import axios from 'axios'

// Indexes all clubs
export const index = user => {
  return axios({
    url: `${apiUrl}/clubs`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
// --------------------

// Creates a single club
export const createClub = (user, data) => {
  return axios({
    url: `${apiUrl}/clubs`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: data
  })
}
// --------------------

// Deletes a single club
export const deleteClub = (id, user) => {
  return axios({
    url: `${apiUrl}/clubs/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
// --------------------

// Reads a single club
export const getClub = (id, user) => {
  return axios({
    url: `${apiUrl}/clubs/${id}`,
    method: 'GET',
    headers: {
      id: `${user._id}`,
      Authorization: `Bearer ${user.token}`
    }
  })
}
// --------------------

// Updates a single club
export const updateClub = (id, user, data) => {
  return axios({
    url: `${apiUrl}/clubs/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: data
  })
}
// --------------------
