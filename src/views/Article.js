import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown/with-html'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import NotFound from './NotFound'
import Spinner from '../components/Spinner'
import data from '../data/blog/data.json'
import './Article.scss'
import { shuffle } from '../utils'

const Article = () => {
  const { t } = useTranslation()
  const { slug } = useParams()
  const [content, setContent] = useState(null)

  const article = data.find(a => a.slug === slug)

  // fetch the related md file
  useEffect(() => {
    (async () => {
      if (!article) {
        return
      }
      const file = await import(`../data/blog/${article.slug}.md`)
      const response = await fetch(file.default)
      const text = await response.text()
      setContent(text)
    })()
  }, [article])

  if (!article) {
    return <NotFound />
  }

  const nbOtherArticles = 5
  const otherArticles = shuffle(data.filter(otherArticle => otherArticle.slug !== slug)).slice(0, nbOtherArticles)

  return (
    <div className='page article'>
      <article>
        <h1 className='page-title'>{article.title}</h1>
        <ul className='metadata'>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {article.date}
            </li>
            <li>
              <FontAwesomeIcon icon={faTag} />
              {article.tags.join(', ')}
            </li>
          </ul>
        </ul>

        <div className='article-content'>
          {content === null ? <Spinner /> : <ReactMarkdown source={content} escapeHtml={false} />}
        </div>
      </article>
      <div className='article-others'>
        <h3>{t('Article.read_other')}</h3>
        <ul>
          {otherArticles.map((otherArticle, i) => (
            <li key={i}>
              <Link to={`/blog/${otherArticle.slug}`}>{otherArticle.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Article
