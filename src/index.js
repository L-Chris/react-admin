import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import { Provider } from 'mobx-react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import HomeLayout from './layouts/home'
import {
  AsyncUserView,
  AsyncMenuView,
  AsyncDishView,
  AsyncOrderView,
  AsyncLoginView
} from './views'
import stores from './stores'
import config from '@/config'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'

render(
  <Provider {...stores}>
    <LocaleProvider locale={zhCN}>
      <Router basepath={ config.routeBasePath } style={{ height: '100%' }}>
        <AsyncLoginView path="/login"/>
        <HomeLayout path="/">
          <AsyncUserView path="user"/>
          <AsyncMenuView path="menu"/>
          <AsyncDishView path="dish"/>
          <AsyncOrderView path="order" />
        </HomeLayout>
      </Router>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
