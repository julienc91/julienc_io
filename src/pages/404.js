import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFound = () => {
  return (
    <Layout>
      <SEO title="404" />
      <h1 className="page-title">404</h1>
      <Link to="/">cd /</Link>
    </Layout>
  )
}

export default NotFound
