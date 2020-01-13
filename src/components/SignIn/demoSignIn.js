import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { signIn } from '../../api/auth'

export const DemoSignIn = props => {
  const [user, setUser] = useState({ email: 'demo@demo.com', password: 'demo' })

  useEffect(() => {
    signIn(user)
      .then(res => setUser(res.data.user))
      .then(() => history.push('/clubs'))
  }, [])
}
