import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { deleteClub, getClub } from '../../api/clubs'
import SingleClub from './SingleClub.js'
import '../../index.scss'

const Club = props => {
  const [club, setClub] = useState([])
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    getClub(props.match.params.id, props.user)
      .then(res => setClub(res.data.club))
      .then(console.log(club))
      .catch(console.error)
  }, [])

  const destroy = () => {
    deleteClub(club._id, props.user)
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/clubs' }
    } />
  }

  return (
    <div className="clubs-canvas">
      <h3>Here is your club!</h3>
      <div className="container">
        <row className="title-row">
          <div><h4>Type</h4></div>
          <div><h4>Set</h4></div>
          <div><h4>Loft</h4></div>
          <div><h4>Stiffness</h4></div>
        </row>
        <SingleClub key={club._id}
          id={club._id}
          style={club.style}
          brand={club.brand}
          loft={club.loft}
          stiffness={club.stiffness}
          user={props.user}
        />
      </div>
      <button onClick={destroy}>Delete Club</button>
    </div>
  )
}

export default Club
