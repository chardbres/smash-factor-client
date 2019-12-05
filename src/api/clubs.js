import apiUrl from '../apiConfig'
import axios from 'axios'

export const index = user => {
  return axios({
    url: `${apiUrl}/clubs`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const createClub = (data, user) => {
  return axios({
    url: `${apiUrl}/clubs`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: data
  })
}

export const deleteClub = (id, user) => {
  return axios({
    url: `${apiUrl}/clubs/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const getClub = (id, user) => {
  return axios({
    url: `${apiUrl}/clubs/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
