import React from 'react'
import { useTranslation } from 'react-i18next'
import { graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './blog.scss'

const BlogIndex = ({ data }) => {
  const articles = data.allMarkdownRemark.edges

  const { t } = useTranslation()
  return (
    <Layout className='page blog'>
      <SEO title={t('Blog.title')} />
      <h1 className='page-title'>{t('Blog.title')}</h1>

      {articles.filter(article => !article.node.frontmatter.disabled).map(({ node }) => (
        <div key={node.fields.slug} className='item'>
          <h3>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {node.frontmatter.date}
            </li>
            <li>
              <FontAwesomeIcon icon={faTag} />
              {node.frontmatter.tags.join(', ')}
            </li>
          </ul>
        </div>
      ))}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { disabled: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            disabled
            tags
          }
        }
      }
    }
  }
`
