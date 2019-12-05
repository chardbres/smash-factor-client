import React, { useState, useEffect } from 'react'
import { index } from '../../api/shots'
import SingleShot from '../Shared/SingleShot'
// import ShotForm from '../Shared/ShotForm'
import '../../index.scss'

const Shots = props => {
  const [shots, setShots] = useState([])

  useEffect(() => {
    index(props.club, props.user)
      .then(res => setShots(res.data.shots))
      .catch(console.error)
  }, [])

  const shotsList = shots.map(shot => (
    <SingleShot key={shot._id}
      distance={shot.distance}
      quality={shot.quality}
    />
  ))

  return (
    <div className="shots-canvas">
      <h4>Shot Summary</h4>
      <div className="container">
        {shotsList}
      </div>
    </div>
  )
}

export default Shots
