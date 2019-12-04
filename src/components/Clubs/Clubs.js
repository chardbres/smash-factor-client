import React, { useState, useEffect } from 'react'
import { index } from '../../api/clubs'
import '../../index.scss'

const Clubs = props => {
  const [clubs, setClubs] = useState([])

  useEffect(() => {
    index(props.user)
      .then(res => setClubs(res.data.clubs))
      .catch(console.error)
  }, [])

  // Maps each club in the data response to a list item for display
  const clubsList = clubs.map(club => (
    <row className="club-row" key={club.id}>
      <div><h4>{club.style}</h4></div>
      <div><h4>{club.brand}</h4></div>
      <div><h4>{club.loft}</h4></div>
      <div><h4>{club.stiffness}</h4></div>
    </row>
  ))

  return (
    <div className="clubs-canvas">
      <h4>Clubs!</h4>
      <div className="container">
        {clubsList}
      </div>
    </div>
  )
}

export default Clubs
