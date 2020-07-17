import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faCode, faExternalLinkAlt, faTag } from '@fortawesome/free-solid-svg-icons'
import data from '../data/about/data.json'
import './About.scss'

const About = () => {
  const { t } = useTranslation()
  return (
    <div className='page about'>
      <h1 className='page-title'>{t('About.title')}</h1>

      <section>
        <h2>{t('About.work.title')}</h2>

        {data.work.map(work => (
          <div key={work.id} className='item'>
            <h3>
              {t('About.work.item_title', { title: t(`About.work.${work.id}.title`), company: work.company })}
              {work.intern && ' ' + t('About.work.intern')}
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
                {work.skills.join(', ')}
              </li>
            </ul>
            <p>
              <Trans i18nKey={`About.work.${work.id}.description`} />
            </p>
          </div>
        ))}
      </section>

      <hr />

      <section>
        <h2>{t('About.projects.title')}</h2>

        {data.projects.map(project => (
          <div key={project.id} className='item'>
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
                {project.skills.join(', ')}
              </li>
            </ul>
            <p>
              <Trans i18nKey={`About.projects.${project.id}.description`} />
            </p>
          </div>
        ))}
      </section>

      <hr />

      <section>
        <h2>{t('About.education.title')}</h2>

        {data.education.map(education => (
          <div key={education.id} className='item'>
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
            <p>
              <Trans i18nKey={`About.education.${education.id}.description`} />
            </p>
          </div>
        ))}
      </section>

      <hr />

      <section>
        <h2>{t('About.legals.title')}</h2>

        <p>{t('About.legals.privacy')}</p>

        <p>
          <Trans i18nKey='About.legals.content'>
            <a href='https://creativecommons.org/licenses/by/4.0/'>-</a>
          </Trans>
          {' '}
          <Trans i18nKey='About.legals.source'>
            <a href='https://github.com/julienc91/julienc_iov2/blob/master/LICENSE'>-</a>
            <a href='https://github.com/julienc91/julienc_iov2'>-</a>
          </Trans>
        </p>
      </section>

    </div>
  )
}

export default About
