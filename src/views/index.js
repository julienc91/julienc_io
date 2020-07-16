import About from './About'
import Article from './Article'
import Blog from './Blog'
import Contact from './Contact'
import Home from './Home'

const pagesMapping = [
  { Component: Home, url: '/' },
  { Component: About, url: '/about' },
  { Component: Blog, url: '/blog'},
  { Component: Article, url: '/blog/:slug/' },
  { Component: Contact, url: '/contact'}
]

export default pagesMapping
