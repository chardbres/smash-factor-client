import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { deleteClub, getClub, updateClub } from '../../api/clubs'
import BootstrapTable from 'react-bootstrap-table-next'

import ClubForm from '../Shared/ClubForm'
import messages from '../AutoDismissAlert/messages'
import '../../index.scss'
// This is a test

const Club = props => {
  const [club, setClub] = useState({ style: '', brand: '', loft: '', flex: '' })
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    getClub(props.match.params.id, props.user)
      .then(res => setClub(res.data.club))
      .catch(console.error)
  }, [])

  // Removes a single resource via the axios call in api/clubs.js
  const destroy = () => {
    const { alert } = props

    deleteClub(club._id, props.user)
      // Alerts user to successful club deletion
      .then(() => alert({
        heading: 'Club deleted successfully!',
        message: '',
        variant: 'success'
      }))
      .then(() => setDeleted(true))
      .catch(error => {
        console.error(error)
        setClub({ style: '', brand: '', loft: '', flex: '' })
        alert({
          heading: 'Failed to delete club!',
          message: messages.clubDeleteFailure,
          variant: 'danger'
        })
      })
  }

  // Redirects the user to the main clubs page upon club deletion
  if (deleted) {
    return <Redirect to={
      { pathname: '/clubs' }
    } />
  }

  const update = () => {
    const { alert } = props

    updateClub(club._id, props.user, { club })
      .then(() => alert({
        heading: 'Club updated successfully!',
        message: '',
        variant: 'success'
      }))
      .catch(error => {
        console.error(error)
        setClub({ style: '', brand: '', loft: '', flex: '' })
        alert({
          heading: 'Failed to update club!',
          message: messages.clubUpdateFailure,
          variant: 'danger'
        })
      })
  }

  const handleChange = event => {
    event.persist()
    setClub(club => ({ ...club, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    update()
  }

  // Definitions for the react-bootstrap-table
  const columns = [
    {
      dataField: '_id',
      hidden: true
    },
    {
      dataField: 'style',
      text: 'Type'
    },
    {
      dataField: 'brand',
      text: 'Set'
    },
    {
      dataField: 'loft',
      text: 'Loft',
      // eslint-disable-next-line react/display-name
      formatter: (cell, row) => { return <p>{cell}&#xb0;</p> }
    },
    {
      dataField: 'flex',
      text: 'Flex'
    }
  ]
  // --------------------

  return (
    <div className="clubs-canvas">
      <h3>Here is your club!</h3>
      <BootstrapTable
        keyField='_id'
        // Data must be array, so club object is re-cast
        data={[club]}
        columns={columns}
        tdClassName="club-cell"
        striped
        hover
        condensed
      />
      <button onClick={destroy}>Delete Club</button>
      <div className="form-header"><h6>Use the form to make changes to this club</h6></div>
      <ClubForm
        club={club}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Club
