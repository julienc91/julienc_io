import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Menu.scss'

const Menu = () => {
  const { t } = useTranslation()
  return (
    <nav className='menu'>
      <div className='left-menu'>
        <NavLink to='/'>{t('Menu.home')}</NavLink>
      </div>
      <div className='right-menu'>
        <NavLink to='/about'>{t('Menu.about')}</NavLink>
        <NavLink to='/blog'>{t('Menu.blog')}</NavLink>
        <NavLink to='/contact'>{t('Menu.contact')}</NavLink>
      </div>
    </nav>
  )
}

export default Menu
