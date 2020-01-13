import React from 'react'
import '../../index.scss'

import Button from 'react-bootstrap/Button'

const ShotForm = ({ shot, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <input
        type="number"
        placeholder="Distance"
        value={shot.distance}
        name="distance"
        onChange={handleChange}
      />
      <select onChange={handleChange} name="quality">
        <option>Select shot quality</option>
        <option value="Pure">Pure!</option>
        <option value="Average">Average</option>
        <option value="Straight">Straight</option>
        <option value="Draw">Draw</option>
        <option value="Fade">Fade</option>
        <option value="Hook">Hook</option>
        <option value="Slice">Slice</option>
        <option value="Fat">Fat</option>
        <option value="Thin">Thin</option>
        <option value="Duff">Duff</option>
      </select>
      <Button variant="primary" size="sm" type="submit">Submit</Button>
    </div>
  </form>
)

export default ShotForm
