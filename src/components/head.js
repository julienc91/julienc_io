import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const pageTitles = {
  "/": "~",
  "/404": "404",
  "/404.html": "404",
  "/about": "À propos",
  "/contact": "Contact",
  "/blog": "Blog",
}

export const Head = ({ location, data, ...props }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const title =
    pageTitles[location.pathname] ?? data.markdownRemark.frontmatter.title

  const metaDescription = site.siteMetadata.description
  const fullTitle = `${title} | ${site.siteMetadata.title}`
  const imageUrl = "https://julienc.io/logo.png"
  const pageUrl = `https://julienc.io/${location.pathname}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="author" content="Julien Chaumont" />
      <meta name="description" content={metaDescription} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:site_name" content="julienc.io" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />

      <meta name="twitter:title" content={fullTitle} />
      <meta property="twitter:domain" content="julienc.io" />
      <meta name="twitter:creator" content="@julienc91" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:url" content={pageUrl} />
    </>
  )
}
