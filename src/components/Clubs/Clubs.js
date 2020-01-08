import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { createClub, index } from '../../api/clubs'
import BootstrapTable from 'react-bootstrap-table-next'

// Custom component imports
// import SingleClub from '../Shared/SingleClub.js'
import ClubForm from '../Shared/ClubForm.js'
import messages from '../AutoDismissAlert/messages'
import '../../index.scss'

const Clubs = props => {
  const [clubs, setClubs] = useState([])
  const [club, setClub] = useState({ style: '', brand: '', loft: '', flex: '' })

  useEffect(() => {
    index(props.user)
      .then(res => setClubs(res.data.clubs))
      .catch(console.error)
  }, [])

  const create = () => {
    const { alert } = props

    createClub(props.user, { club })
      .then(res => clubs.push(res.data.club))
      // Alerts user to successful creation of club
      .then(() => alert({
        heading: 'Club created successfully!',
        message: '',
        variant: 'success'
      }))
      // Re-runs the index to get the club list with the newly-created club for re-render
      .then(
        index(props.user)
          .then(res => setClubs(res.data.clubs))
      )
      .catch(error => {
        console.error(error)
        setClub({ style: '', brand: '', loft: '', flex: '' })
        alert({
          heading: 'Failed to create club!',
          message: messages.clubCreateFailure,
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
    create()
  }

  // Definitions for the react-bootstrap-table
  const columns = [
    {
      dataField: '_id',
      hidden: true
    },
    {
      dataField: 'style',
      text: 'Type',
      sort: true
    },
    {
      dataField: 'brand',
      text: 'Set',
      sort: true
    },
    {
      dataField: 'loft',
      text: 'Loft',
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cell, row) => { return <p>{cell}&#xb0;</p> }
    },
    {
      dataField: 'flex',
      text: 'Flex',
      sort: true
    }
  ]

  const rowEvents = {
    // eslint-disable-next-line react/display-name
    onClick: (e, row, rowIndex) => {
      location.href = `#/clubs/${row._id}`
    }
  }
  // --------------------

  return (
    <div className="clubs-canvas">
      <h3>Your Clubs</h3>
      <div className="form-header"><h6>Use the form to add a new club</h6></div>
      <ClubForm
        club={club}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <BootstrapTable
        keyField='_id'
        data={clubs}
        columns={columns}
        sort={ { dataField: 'style', order: 'asc' } }
        rowEvents={rowEvents}
        tdClassName="club-cell"
        striped
        hover
        condensed
      />
    </div>
  )
}

export default withRouter(Clubs)
