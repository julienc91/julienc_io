import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Page from './components/Page'
import pagesMapping from './views'
import NotFound from './views/NotFound'
import './i18n'
import './App.scss'

const App = () => (
  <Router>
    <Switch>
      <Redirect
        from='/:id(\d+)/:slug'
        to='/blog/:slug'
        state={{ status: 301 }}
      />
      {pagesMapping.map(({ Component, url }) => (
        <Route key={url} path={url} exact>
          <Page>
            <Component />
          </Page>
        </Route>
      ))}
      <Route>
        <Page><NotFound /></Page>
      </Route>
    </Switch>
  </Router>
)

export default App
