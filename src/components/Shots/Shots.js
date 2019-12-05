import React, { useState, useEffect } from 'react'
import { index, createShot } from '../../api/shots'
import SingleShot from '../Shared/SingleShot'
import ShotForm from '../Shared/ShotForm'
import '../../index.scss'

const Shots = props => {
  const [shots, setShots] = useState([])
  const [shot, setShot] = useState({ distance: '', quality: '' })

  useEffect(() => {
    index(props.club, props.user)
      .then(res => setShots(res.data.shots))
      .catch(console.error)
  }, [])

  const create = () => {
    createShot(props.club, props.user, { shot })
      .then(res => shots.push(res.data.shot))
      .catch(console.error)
  }

  const handleChange = event => {
    event.persist()
    setShot(shot => ({ ...shot, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    create()
  }

  const shotsList = shots.map(shot => (
    <SingleShot key={shot._id}
      distance={shot.distance}
      quality={shot.quality}
    />
  ))

  return (
    <div className="shots-canvas">
      <h4>Shot Summary</h4>
      <ShotForm
        shot={shot}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="container">
        {shotsList}
      </div>
    </div>
  )
}

export default Shots
