import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Footer from './footer'
import Menu from './menu'
import Spinner from './spinner'
import { setCallback } from './i18n'
import './layout.scss'

const Layout = props => {
  const { children, className } = props
  const [fakeSuspense, setFakeSuspense] = useState(true)

  if (fakeSuspense) {
    setCallback(() => setFakeSuspense(false))
    return <Spinner />
  }
  return (
    <>
      <Menu />
      <main className={className}>{children}</main>
      <Footer />
    </>
  )
}

Layout.defaultProps = {
  className: 'page'
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Layout
