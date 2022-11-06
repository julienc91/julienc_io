import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faLinkedin,
  faMastodon,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons"
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"
import "./contact.scss"

const Contact = () => {
  return (
    <Layout className="page contact">
      <h1 className="page-title">Contact</h1>
      <ul>
        <li>
          <FontAwesomeIcon icon={faAt} />
          <span className="email">@</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faGithub} />
          <a rel="me" href="https://github.com/julienc91/">
            julienc91
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faStackOverflow} />
          <a rel="me" href="https://stackoverflow.com/users/2679935/julienc">
            julienc
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faLinkedin} />
          <a rel="me" href="https://www.linkedin.com/in/julien-chaumont/">
            julien-chaumont
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faMastodon} />
          <a rel="me" href="https://piaille.fr/@julien">
            @julien@piaille.fr
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faKey} />
          <a href="/julienc.asc">EF4D 99AD B2A1 823C</a>
        </li>
      </ul>
    </Layout>
  )
}

export default Contact

export { Head } from "../components/head"
