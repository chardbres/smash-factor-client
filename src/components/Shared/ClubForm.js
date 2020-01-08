import React from 'react'
import '../../index.scss'

const ClubForm = ({ club, handleSubmit, handleChange }) => (
  <form className="club-form" onSubmit={handleSubmit}>
    <div>
      <input
        type="text"
        placeholder="Type"
        value={club.style}
        name="style"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Brand/Set"
        value={club.brand}
        name="brand"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Loft (in degrees)"
        value={club.loft}
        name="loft"
        onChange={handleChange}
      />
      <select onChange={handleChange} name="flex">
        <option>Select flex</option>
        <option value="Ladies">Ladies</option>
        <option value="Seniors">Seniors</option>
        <option value="Regular">Regular</option>
        <option value="Stiff">Stiff</option>
        <option value="X-Stiff">X-Stiff</option>
        <option value="Wedge Flex">Wedge Flex</option>
      </select>
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
)

export default ClubForm
