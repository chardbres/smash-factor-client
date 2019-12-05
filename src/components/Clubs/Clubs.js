import React, { useState, useEffect } from 'react'
import { createClub, index } from '../../api/clubs'
import SingleClub from './SingleClub.js'
import ClubForm from '../shared/ClubForm.js'
// import apiUrl from '../../apiConfig.js'
// import axios from 'axios'
import '../../index.scss'

const Clubs = props => {
  const [clubs, setClubs] = useState([])
  const [club, setClub] = useState({ style: '', brand: '', loft: '', stiffness: '' })

  useEffect(() => {
    index(props.user)
      .then(res => setClubs(res.data.clubs))
      .catch(console.error)
  }, [])

  const create = () => {
    createClub({ club }, props.user)
      .then(res => clubs.push(res.data.club))
      .then(console.log(clubs))
      .catch(console.error)
  }

  const handleChange = event => {
    event.persist()
    setClub(club => ({ ...club, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    create()
  }

  const clubsList = clubs.map(club => (
    <SingleClub key={club._id}
      id={club._id}
      style={club.style}
      brand={club.brand}
      loft={club.loft}
      stiffness={club.stiffness}
      user={props.user}
    />
  ))

  return (
    <div className="clubs-canvas">
      <h3>Your Clubs</h3>
      <div className="container">
        <row className="title-row">
          <div><h4>Type</h4></div>
          <div><h4>Set</h4></div>
          <div><h4>Loft</h4></div>
          <div><h4>Stiffness</h4></div>
        </row>
        {clubsList}
      </div>
      <ClubForm
        club={club}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Clubs
