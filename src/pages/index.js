import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.scss"

const Index = () => {
  return (
    <Layout className="home">
      <SEO title="~" />
      <header>
        <div>
          <h1>Julien Chaumont</h1>
          <h2>Software Engineer</h2>
        </div>
        <div className="red-text">&#47;&#47;</div>
      </header>

      <div className="spacer" />
    </Layout>
  )
}

export default Index
