import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import '../../index.scss'

const SingleClub = props => {
  const [clicked, setClicked] = useState(false)

  if (clicked) {
    return <Redirect to={
      { pathname: `/clubs/${props.id}` }
    } />
  }

  return (
    <div>
      <row className="club-row" key={props.id} onClick={() => setClicked(true)}>
        <div><h5>{props.style}</h5></div>
        <div><h5>{props.brand}</h5></div>
        <div><h5>{props.loft}&#xb0;</h5></div>
        <div><h5>{props.stiffness}</h5></div>
      </row>
    </div>
  )
}

export default SingleClub
