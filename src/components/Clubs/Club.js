import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { deleteClub, getClub, updateClub } from '../../api/clubs'
import Button from 'react-bootstrap/Button'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'

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

  const destroy = () => {
    const { alert } = props

    deleteClub(club._id, props.user)
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

  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport()
    }

    return (
      <div>
        <Button variant="success" size="sm" onClick={ handleClick }>Export shots as CSV</Button>
      </div>
    )
  }
  // --------------------

  return (
    <div className="clubs-canvas">
      <h3>Here is your club!</h3>
      <h5 className="form-header">Use this form to make changes to this club, or delete it</h5>
      <div className="club-form">
        <ClubForm
          club={club}
          handleChange={handleClubChange}
          handleSubmit={handleClubSubmit}
        />
        <Button variant="danger" size="sm" onClick={destroy}>Delete Club</Button>
      </div>
      <BootstrapTable
        keyField='_id'
        data={[club]}
        columns={clubColumns}
        tdClassName="club-cell"
        striped
        hover
        condensed
      />
      <h5 className="form-header">Use this form to add shots made with this club</h5>
      <div className="shot-form">
        <ShotForm
          shot={shot}
          handleChange={handleShotChange}
          handleSubmit={handleShotSubmit}
        />
      </div>
      <ToolkitProvider
        keyField="id"
        data={ shots }
        columns={ shotColumns }
        exportCSV
      >
        {
          props => (
            <div>
              <MyExportCSV { ...props.csvProps } />
              <hr />
              <BootstrapTable { ...props.baseProps } />
            </div>
          )
        }
      </ToolkitProvider>
    </div>
  )
}

export default Club
