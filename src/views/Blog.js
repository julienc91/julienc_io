import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import data from '../data/blog/data.json'
import './Blog.scss'

const Blog = () => {
  const { t } = useTranslation()
  return (
    <div className='page blog'>
      <h1 className='page-title'>{t('Blog.title')}</h1>

      {data.map((article, i) => (
        <div key={i} className='item'>
          <h3>
            <Link to={`/blog/${article.slug}`}>{article.title}</Link>
          </h3>
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
        </div>
      ))}
    </div>
  )
}

export default Blog
