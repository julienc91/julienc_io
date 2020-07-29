import React from 'react'
import { useTranslation } from 'react-i18next'
import { graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './article.scss'

const Article = ({ data }) => {
  const { t } = useTranslation()
  const article = data.markdownRemark
  const otherArticles = data.allMarkdownRemark.edges

  return (
    <Layout className='page article'>
      <SEO title={article.frontmatter.title} />
      <article>
        <h1 className='page-title'>{article.frontmatter.title}</h1>
        <ul className='metadata'>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {article.frontmatter.date}
            </li>
            <li>
              <FontAwesomeIcon icon={faTag} />
              {article.frontmatter.tags.join(', ')}
            </li>
          </ul>
        </ul>

        <div
          className='article-content'
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </article>
      <div className='article-others'>
        <h3>{t('Article.read_other')}</h3>
        <ul>
          {otherArticles.map(({ node }) => (
            <li key={node.fields.slug}>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Article

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
      }
    }
    allMarkdownRemark(
      filter: {
        fields: { slug: { ne: $slug } }
        frontmatter: { disabled: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
