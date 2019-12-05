import React from 'react'
import '../../index.scss'

const ClubForm = ({ club, handleSubmit, handleChange }) => (
  <form className="club-form" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Style"
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
    <select>
      <option value={club.stiffness}>Ladies</option>
      <option value={club.stiffness}>Seniors</option>
      <option value={club.stiffness}>Regular</option>
      <option value={club.stiffness}>Stiff</option>
      <option value={club.stiffness}>X-Stiff</option>
    </select>

    <button type="submit">Submit</button>
  </form>
)

export default ClubForm
