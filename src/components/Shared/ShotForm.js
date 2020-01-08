import React from 'react'
import '../../index.scss'

const ShotForm = ({ shot, handleSubmit, handleChange }) => (
  <form className="club-form" onSubmit={handleSubmit}>
    <div>
      <input
        type="number"
        placeholder="Distance"
        value={shot.distance}
        name="distance"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Quality"
        value={shot.quality}
        name="quality"
        onChange={handleChange}
      />

    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
)

export default ShotForm
