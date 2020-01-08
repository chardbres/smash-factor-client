import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

import App from './components/App/App'
import { HashRouter } from 'react-router-dom'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
