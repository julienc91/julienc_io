import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <SEO title={t('NotFound.title')} />
      <h1 className='page-title'>{t('NotFound.title')}</h1>
      <Link to='/'>{t('NotFound.go_back')}</Link>
    </Layout>
  )
}

export default NotFound
