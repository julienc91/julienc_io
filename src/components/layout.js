import React from "react"
import PropTypes from "prop-types"
import Footer from "./footer"
import Menu from "./menu"
import "./layout.scss"

const Layout = props => {
  const { children, className } = props
  return (
    <>
      <Menu />
      <main className={className}>{children}</main>
      <Footer />
    </>
  )
}

Layout.defaultProps = {
  className: "page",
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Layout
