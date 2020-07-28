import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'
import './menu.scss'

const Menu = () => {
  const { t } = useTranslation()
  return (
    <nav className='menu'>
      <div className='left-menu'>
        <Link to='/'>{t('Menu.home')}</Link>
      </div>
      <div className='right-menu'>
        <Link to='/about'>{t('Menu.about')}</Link>
        <Link to='/blog'>{t('Menu.blog')}</Link>
        <Link to='/contact'>{t('Menu.contact')}</Link>
      </div>
    </nav>
  )
}

export default Menu
