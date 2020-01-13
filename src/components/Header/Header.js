import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import '../../index.scss'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#clubs">Clubs List</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)
// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#clubs">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand className="header">
      <span className="title">Smash Factor!</span><span className="tagline">The ultimate golf club performance tracker</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
