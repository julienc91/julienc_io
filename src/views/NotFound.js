import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div className='page'>
      <h1 className='page-title'>{t('NotFound.title')}</h1>

      <Link to='/'>{t('NotFound.go_back')}</Link>
    </div>
  )
}

export default NotFound
