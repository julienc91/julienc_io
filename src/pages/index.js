import React from 'react'
import { useTranslation } from 'react-i18next'
import Layout from '../components/layout'
import SEO from '../components/seo'
import './index.scss'

const Index = () => {
  const { t } = useTranslation()
  return (
    <Layout className='home'>
      <SEO title={t('Home.title')} />
      <header>
        <div>
          <h1>Julien Chaumont</h1>
          <h2>{t('Home.subtitle')}</h2>
        </div>
        <div className='red-text'>&#47;&#47;</div>
      </header>

      <div className='spacer' />
    </Layout>
  )
}

export default Index
