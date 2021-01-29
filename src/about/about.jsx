import React from 'react';
import { byId } from '@generative-music/pieces-alex-bainter';
import { CSSTransition } from 'react-transition-group';
import { version } from '../../package.json';
import styles from './about.module.scss';

const ALEX_BAINTER_URL = 'https://alexbainter.com';
const SOURCE_CODE_URL = 'https://github.com/generative-fm/play';

const About = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles['about__header']}>About</h1>
      <div className={styles['about__body']}>
        <CSSTransition
          timeout={500}
          appear
          in
          classNames={{
            appear: styles['about__body__logo--will-appear'],
            appearActive: styles['about__body__logo--is-appearing'],
          }}
        >
          <img
            src={byId['day-dream'].imageSrc}
            className={styles['about__body__logo']}
          />
        </CSSTransition>
        <CSSTransition
          timeout={1000}
          appear
          in
          classNames={{
            appear: styles['about__body__text--will-appear'],
            appearActive: styles['about__body__text--is-appearing'],
            appearDone: styles['about__body__text--has-appeared'],
          }}
        >
          <div className={styles['about__body__text']}>
            <h2 className={styles['about__body__text__title']}>
              Generative.fm Play
            </h2>
            <p>verison {version}</p>
            <p>
              made by{' '}
              <a
                href={ALEX_BAINTER_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                Alex Bainter
              </a>
            </p>
            <p>
              <a
                href={SOURCE_CODE_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                view source code
              </a>
            </p>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default About;
