import React, { useState, useEffect } from 'react'
import { createClub, index } from '../../api/clubs'
import SingleClub from '../Shared/SingleClub.js'
import ClubForm from '../Shared/ClubForm.js'
import '../../index.scss'

const Clubs = props => {
  const [clubs, setClubs] = useState([])
  const [club, setClub] = useState({ style: '', brand: '', loft: '', flex: '' })

  useEffect(() => {
    index(props.user)
      .then(res => setClubs(res.data.clubs))
      .catch(console.error)
  }, [])

  const create = () => {
    createClub(props.user, { club })
      .then(res => clubs.push(res.data.club))
      // Re-runs the index to get the club list with the newly-created club for re-render
      .then(
        index(props.user)
          .then(res => setClubs(res.data.clubs))
      )
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
      flex={club.flex}
      user={props.user}
    />
  ))

  return (
    <div className="clubs-canvas">
      <h3>Your Clubs</h3>
      <div className="container">
        <row className="title-row">
          <div><h5>Type</h5></div>
          <div><h5>Set</h5></div>
          <div><h5>Loft</h5></div>
          <div><h5>Flex</h5></div>
        </row>
        {clubsList}
        <div className="form-header"><h6>Use the form to add a new club</h6></div>
        <ClubForm
          club={club}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default Clubs
