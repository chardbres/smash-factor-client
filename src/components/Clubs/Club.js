import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { deleteClub, getClub, updateClub } from '../../api/clubs'
import Button from 'react-bootstrap/Button'
import BootstrapTable from 'react-bootstrap-table-next'

import ClubForm from '../Shared/ClubForm'
import ShotForm from '../Shared/ShotForm'
import messages from '../AutoDismissAlert/messages'
import { index, createShot } from '../../api/shots'
import '../../index.scss'

const Club = props => {
  const [club, setClub] = useState({ style: '', brand: '', loft: '', flex: '' })
  const [shots, setShots] = useState([])
  const [shot, setShot] = useState({ distance: '', quality: '', club: props.match.params.id })
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    // API call for a single club
    getClub(props.match.params.id, props.user)
      .then(res => setClub(res.data.club))
      .catch(console.error)

    // API call for indexing all shots for a single club
    index(props.match.params.id, props.user)
      .then(res => setShots(res.data.shots))
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

  // Creates a new shot with the current club and updates the shot state
  const makeShot = () => {
    const { alert } = props

    console.log(shots)
    createShot(props.user, { shot })
      .then(() => alert({
        heading: 'Shot added successfully!',
        message: '',
        variant: 'success'
      }))
      .then(
        index(props.match.params.id, props.user)
          .then(console.log(shots))
          .then(res => setShots(res.data.shots))
      )
      .catch(error => {
        console.error(error)
        setShot({ distance: '', quality: '' })
        console.log(shot)
        alert({
          heading: 'Failed to add shot!',
          message: messages.clubUpdateFailure,
          variant: 'danger'
        })
      })
  }

  const handleClubChange = event => {
    event.persist()
    setClub(club => ({ ...club, [event.target.name]: event.target.value }))
  }

  const handleClubSubmit = event => {
    event.preventDefault()
    update()
  }

  const handleShotChange = event => {
    event.persist()
    setShot(shot => ({ ...shot, [event.target.name]: event.target.value }))
  }

  const handleShotSubmit = event => {
    event.preventDefault()
    makeShot()
  }

  // Definitions for the react-bootstrap-table
  const clubColumns = [
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

  const shotColumns = [
    {
      dataField: 'club',
      hidden: true
    },
    {
      dataField: 'distance',
      text: 'Distance'
    },
    {
      dataField: 'quality',
      text: 'Quality'
    }
  ]
  // --------------------

  return (
    <div className="clubs-canvas">
      <h3>Here is your club!</h3>
      <h6 className="form-header">Use the form to make changes to this club</h6>
      <ClubForm
        club={club}
        handleChange={handleClubChange}
        handleSubmit={handleClubSubmit}
      />
      <BootstrapTable
        keyField='_id'
        // Data must be array, so club object is re-cast
        data={[club]}
        columns={clubColumns}
        tdClassName="club-cell"
        striped
        hover
        condensed
      />
      <Button variant="danger" onClick={destroy}>Delete Club</Button>
      <ShotForm
        shot={shot}
        handleChange={handleShotChange}
        handleSubmit={handleShotSubmit}
      />
      <BootstrapTable
        keyField='club'
        // Data must be array, so shot object is re-cast
        data={shots}
        columns={shotColumns}
        tdClassName="shot-cell"
        hover
        condensed
      />
    </div>
  )
}

export default Club
