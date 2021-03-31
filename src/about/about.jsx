import React, { useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import useActivePatrons from '../donate/use-active-patrons';
import { version } from '../../package.json';
import logo from '../logo.png';
import styles from './about.module.scss';

const ALEX_BAINTER_URL = 'https://alexbainter.com';
const SOURCE_CODE_URL = 'https://github.com/generative-fm/play';
const DISCORD_INVITE_URL = 'https://discord.gg/3KPnkv2UbP';

const formatPatronList = (patronNames) =>
  patronNames.map((name, i) => {
    if (i === 0) {
      return name;
    }
    if (i === patronNames.length - 1) {
      return ` and ${name}.`;
    }
    return `, ${name}`;
  });

const About = () => {
  const activePatrons = useActivePatrons({ isGreedy: true });

  const patronGroups = useMemo(() => {
    const groups = new Map([
      [30, []],
      [20, []],
      [10, []],
    ]);
    if (!Array.isArray(activePatrons)) {
      return groups;
    }
    return activePatrons
      .sort((a, b) => b.creditScore - a.creditScore)
      .reduce((map, { name, creditScore }) => {
        if (creditScore >= 30) {
          map.get(30).push(name);
        } else if (creditScore >= 20) {
          map.get(20).push(name);
        } else if (creditScore >= 10) {
          map.get(10).push(name);
        }
        return map;
      }, groups);
  }, [activePatrons]);

  const seeders = patronGroups.get(30);
  const fans = patronGroups.get(20);
  const benefactors = patronGroups.get(10);

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
          <img src={logo} className={styles['about__body__logo']} />
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
            <p>version {version}</p>
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
      <div className={styles['about__text']}>
        <h2 className={styles['about__text__subtitle']}>Contact</h2>
        <div>
          <a href={ALEX_BAINTER_URL} target="_blank" rel="noreferrer noopener">
            Message me
          </a>{' '}
          or join the{' '}
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            Generative.fm Discord server
          </a>
          .
        </div>
        <h2 className={styles['about__text__subtitle']}>
          Generative.fm Sponsors
        </h2>
        <div>
          Generative.fm is a pay-what-you-want service made possible with
          funding from the following:
        </div>
        <div
          className={classnames(
            styles['about__text__sponsors'],
            styles['about__text__sponsors--seeders']
          )}
        >
          {formatPatronList(seeders)}
        </div>
        {seeders.length > 0 && (
          <div className={styles['about__text__sponsor-message']}>
            The name{seeders.length > 1 ? 's' : ''} above{' '}
            {seeders.length > 1 ? 'are' : 'is'} used to seed the random number
            generator.
          </div>
        )}
        <div
          className={classnames(
            styles['about__text__sponsors'],
            styles['about__text__sponsors--fans']
          )}
        >
          {formatPatronList(fans)}
        </div>
        <div
          className={classnames(
            styles['about__text__sponsors'],
            styles['about__text__sponsors--benefactors']
          )}
        >
          {formatPatronList(benefactors)}
        </div>
        <div>
          Please consider <Link to="/donate">sponsoring</Link> the development
          of Generative.fm.
        </div>
      </div>
    </div>
  );
};

export default About;
