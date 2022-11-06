import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons"
import {
  faCode,
  faExternalLinkAlt,
  faTag,
} from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"
import data from "../../content/about/index.json"
import "./about.scss"

const About = () => {
  return (
    <Layout className="page about">
      <h1 className="page-title">À propos</h1>

      <section>
        <h2>Travail</h2>

        {data.work.map(work => (
          <div key={work.id} className="item">
            <h3>
              {work.title} - {work.company}
              {work.intern && " (stage)"}
            </h3>
            <ul>
              <li>
                <FontAwesomeIcon icon={faCalendarAlt} />
                {work.start_date} - {work.end_date}
              </li>
              <li>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                <a href={work.url}>{work.url}</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faTag} />
                {work.skills.join(", ")}
              </li>
            </ul>
            <p>{work.description}</p>
          </div>
        ))}
      </section>

      <hr />

      <section>
        <h2>Réalisations</h2>

        {data.projects.map(project => (
          <div key={project.id} className="item">
            <h3>{project.name}</h3>
            <ul>
              {project.url && (
                <li>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  <a href={project.url}>{project.url}</a>
                </li>
              )}
              <li>
                <FontAwesomeIcon icon={faCode} />
                <a href={project.repository}>{project.repository}</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faTag} />
                {project.skills.join(", ")}
              </li>
            </ul>
            <p>{project.description}</p>
          </div>
        ))}
      </section>

      <hr />

      <section>
        <h2>Formation</h2>

        {data.education.map(education => (
          <div key={education.id} className="item">
            <h3>{education.name}</h3>
            <ul>
              <li>
                <FontAwesomeIcon icon={faCalendarAlt} />
                {education.date}
              </li>
              <li>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                <a href={education.url}>{education.url}</a>
              </li>
            </ul>
            <p>{education.description}</p>
          </div>
        ))}
      </section>

      <hr />

      <section>
        <h2>Mentions légales</h2>

        <p>Ce site est garanti sans cookie ni tracker.</p>

        <p>
          Le contenu est publié sous{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">
            licence CC BY 4.0
          </a>
          . Le code source est publié sous{" "}
          <a href="https://github.com/julienc91/julienc_iov2/blob/master/LICENSE">
            licence MIT
          </a>{" "}
          et disponible{" "}
          <a href="https://github.com/julienc91/julienc_iov2">sur GitHub</a>.
        </p>
      </section>
    </Layout>
  )
}

export default About

export { Head } from "../components/head"
