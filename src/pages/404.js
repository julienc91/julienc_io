import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const NotFound = () => {
  return (
    <Layout>
      <h1 className="page-title">404</h1>
      <Link to="/">cd /</Link>
    </Layout>
  )
}

export default NotFound

export { Head } from "../components/head"
