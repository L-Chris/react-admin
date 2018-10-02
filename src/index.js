import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import HomeLayout from './layouts/home'
import {
  AsyncUserView,
  AsyncMenuView,
  AsyncOrderView,
  AsyncLoginView
} from './views'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'

render(
  <Router style={{ height: '100%' }}>
    <AsyncLoginView path="/login"/>
    <HomeLayout path="/">
      <AsyncUserView path="user"/>
      <AsyncMenuView path="menu"/>
      <AsyncOrderView path="order"/>
    </HomeLayout>
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
