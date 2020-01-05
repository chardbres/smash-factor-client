import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { createClub, index } from '../../api/clubs'
import SingleClub from '../Shared/SingleClub.js'
import ClubForm from '../Shared/ClubForm.js'
import messages from '../AutoDismissAlert/messages'
import '../../index.scss'

const Clubs = props => {
  const [cshots, setShots] = useState([])

  useEffect(() => {
    index(props.user)
      .then(res => setClubs(res.data.clubs))
      // Attempt at function to sort clubs alphabetically by style upon indexing
      .then(clubs.sort(function (a, b) {
        if (a.clubs.style < b.clubs.club.style) {
          return -1
        }
        if (a.clubs.style > b.clubs.club.style) {
          return 1
        }
      }))
      .catch(console.error)
  }, [])

  const create = () => {
    const { alert } = props

    createClub(props.user, { club })
      .then(res => clubs.push(res.data.club))
      // Alerts user to successful creation of club
      .then(() => alert({
        heading: 'Club stored successfully!',
        message: '',
        variant: 'success'
      }))
      // Re-runs the index to get the club list with the newly-created club for re-render
      .then(
        index(props.user)
          .then(res => setClubs(res.data.clubs))
      )
      .catch(error => {
        console.error(error)
        setClub({ style: '', brand: '', loft: '', flex: '' })
        alert({
          heading: 'Failed to create club!',
          message: messages.clubCreateFailure,
          variant: 'danger'
        })
      })
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

export default withRouter(Clubs)