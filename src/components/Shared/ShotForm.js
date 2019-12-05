import React from 'react'
import '../../index.scss'

const ClubForm = ({ shot, handleSubmit, handleChange }) => (
  <form className="shot-form" onSubmit={handleSubmit}>
    <div>
      <input
        type="number"
        placeholder="Distance"
        value={shot.distance}
        name="distance"
        onChange={handleChange}
      />
      <select onChange={handleChange} name="quality">
        <option>Select shot type</option>
        <option value="Straight">Straight</option>
        <option value="Hook">Hook</option>
        <option value="Draw">Draw</option>
        <option value="Fade">Fade</option>
        <option value="Slice">Slice</option>
        <option value="Chunk">Chunk</option>
        <option value="Seniors">Thin</option>
      </select>
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
)

export default ClubForm
