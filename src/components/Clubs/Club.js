import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { deleteClub, getClub, updateClub } from '../../api/clubs'
import SingleClub from '../Shared/SingleClub'
// import Shots from '../Shots/Shots'
import ClubForm from '../Shared/ClubForm'
import '../../index.scss'

const Club = props => {
  const [club, setClub] = useState({ style: '', brand: '', loft: '', flex: '' })
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    getClub(props.match.params.id, props.user)
      .then(res => setClub(res.data.club))
      .catch(console.error)
  }, [])

  // Removes a single resource via the axios call in api/clubs.js
  const destroy = () => {
    deleteClub(club._id, props.user)
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  // Redirects the user to the main clubs page upon club deletion
  if (deleted) {
    return <Redirect to={
      { pathname: '/clubs' }
    } />
  }

  const update = () => {
    updateClub(club._id, props.user, { club })
      .then()
      .catch(console.error)
  }

  const handleChange = event => {
    event.persist()
    setClub(club => ({ ...club, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    update()
  }

  return (
    <div className="clubs-canvas">
      <h3>Here is your club!</h3>
      <div className="container">
        <row className="title-row">
          <div><h5>Type</h5></div>
          <div><h5>Set</h5></div>
          <div><h5>Loft</h5></div>
          <div><h5>Flex</h5></div>
        </row>
        <SingleClub key={club._id}
          id={club._id}
          style={club.style}
          brand={club.brand}
          loft={club.loft}
          flex={club.flex}
          user={props.user}
        />
        <button onClick={destroy}>Delete Club</button>
        <div className="form-header"><h6>Use the form to make changes to this club</h6></div>
        <ClubForm
          club={club}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
    // <Shots
    //   club={props.match.params.id}
    //   user={props.user}
    // />
  )
}

export default Club
