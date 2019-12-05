import React from 'react'
import '../../index.scss'

const SingleShot = props => {
  return (
    <div>
      <row className="shot-row" key={props.id}>
        <div><h5>{props.distance}</h5></div>
        <div><h5>{props.quality}</h5></div>
      </row>
    </div>
  )
}

export default SingleShot
