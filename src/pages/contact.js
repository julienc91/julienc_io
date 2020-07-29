import React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faStackOverflow
} from '@fortawesome/free-brands-svg-icons'
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './contact.scss'

const Contact = () => {
  const { t } = useTranslation()
  return (
    <Layout className='page contact'>
      <SEO title={t('Contact.title')} />
      <h1 className='page-title'>{t('Contact.title')}</h1>
      <ul>
        <li>
          <FontAwesomeIcon icon={faAt} />
          <span className='email'>@</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faGithub} />
          <a href='https://github.com/julienc91/'>julienc91</a>
        </li>
        <li>
          <FontAwesomeIcon icon={faStackOverflow} />
          <a href='https://stackoverflow.com/users/2679935/julienc'>julienc</a>
        </li>
        <li>
          <FontAwesomeIcon icon={faLinkedin} />
          <a href='https://www.linkedin.com/in/julien-chaumont/'>
            julien-chaumont
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faKey} />
          <a href='/julienc.asc'>EF4D 99AD B2A1 823C</a>
        </li>
      </ul>
    </Layout>
  )
}

export default Contact
