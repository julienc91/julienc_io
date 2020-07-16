import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import Footer from './Footer'
import Menu from './Menu'
import Spinner from './Spinner'
import './Page.scss'

const Page = props => {
  const { children } = props
  return (
    <Suspense fallback={<Spinner />}>
      <Menu />
      {children}
      <Footer />
    </Suspense>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default Page
