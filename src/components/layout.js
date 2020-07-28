import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import Footer from './footer'
import Menu from './menu'
import Spinner from './spinner'
import './i18n'
import './layout.scss'

const Page = props => {
  const { children, className } = props
  return (
    <Suspense fallback={<Spinner />}>
      <Menu />
      <main className={className}>
        {children}
      </main>
      <Footer />
    </Suspense>
  )
}

Page.defaultProps = {
  className: 'page'
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Page
