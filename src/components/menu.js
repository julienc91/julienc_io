import React from "react"
import { Link } from "gatsby"
import "./menu.scss"

const Menu = () => {
  return (
    <nav className="menu">
      <div className="left-menu">
        <Link to="/">julienc.io</Link>
      </div>
      <div className="right-menu">
        <Link to="/about">about</Link>
        <Link to="/blog">blog</Link>
        <Link to="/contact">contact</Link>
      </div>
    </nav>
  )
}

export default Menu
