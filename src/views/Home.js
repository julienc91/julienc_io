import React from 'react'
import { useTranslation } from 'react-i18next'
import './Home.scss'

const Home = () => {
  const { t } = useTranslation()
  return (
    <div className='home'>
      <header>
        <div>
          <h1>Julien Chaumont</h1>
          <h2>{t('Home.subtitle')}</h2>
        </div>
        <div className='red-text'>&#47;&#47;</div>
      </header>

      <div className='spacer' />

    </div>
  )
}

export default Home
