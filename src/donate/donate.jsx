import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import CryptoPicker from './crypto-picker';
import usePledgeSum from './use-pledge-sum';
import useActivePatrons from './use-active-patrons';
import Skeleton from '../loading/skeleton';
import styles from './donate.module.scss';

const CURRENT_OBJECTIVE = 2500;
const PATREON_URL = 'https://www.patreon.com/bePatron?u=2484731';
const BANDCAMP_URL = 'https://alexbainter.bandcamp.com';
const PAYPAL_URL = 'https://paypal.me/alexbainter';

const Donate = () => {
  const [shoutOutName, setShoutOutName] = useState();
  const [isShowingShoutOut, setIsShowingShoutOut] = useState(false);
  const pledgeSum = usePledgeSum();
  const activePatrons = useActivePatrons();

  useEffect(() => {
    if (!Array.isArray(activePatrons)) {
      setShoutOutName(null);
      setIsShowingShoutOut(false);
      return;
    }
    const shoutOutPatrons = activePatrons.filter(
      ({ creditScore }) => creditScore >= 30
    );
    if (shoutOutPatrons.length === 0) {
      setShoutOutName(null);
      setIsShowingShoutOut(true);
      return;
    }
    if (shoutOutPatrons.length === 1) {
      const [{ name }] = shoutOutPatrons;
      setShoutOutName(name);
      setIsShowingShoutOut(true);
      return;
    }
    const setNewPatronName = () => {
      setShoutOutName((previousName) => {
        const otherNames = shoutOutPatrons
          .map(({ name }) => name)
          .filter((otherName) => otherName !== previousName);
        return otherNames[Math.floor(Math.random() * otherNames.length)];
      });
    };
    setNewPatronName();
    setIsShowingShoutOut(true);
    const interval = setInterval(() => {
      setIsShowingShoutOut(false);
      setTimeout(() => {
        setNewPatronName();
        setIsShowingShoutOut(true);
      }, 500);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [activePatrons]);

  return (
    <div className={styles.donate}>
      <h1 className={styles['donate__title']}>Donate</h1>
      <h2 className={styles['donate__subtitle']}>
        Help establish full-time development of Generative.fm
      </h2>
      <div className={styles['donate__campaign']}>
        <div className={styles['donate__campaign__metric']}>
          <div className={styles['donate__campaign__metric__current']}>
            Current monthly support:
          </div>
          <div className={styles['donate__campaign__metric__objective']}>
            Full-time dedication at:
          </div>
        </div>
        <div className={styles['donate__campaign__metric']}>
          <div className={styles['donate__campaign__metric__current']}>
            <Skeleton isLoading={pledgeSum === null}>
              ${pledgeSum || 'XXX'}
            </Skeleton>
          </div>
          <div className={styles['donate__campaign__metric__objective']}>
            ${CURRENT_OBJECTIVE}
          </div>
        </div>
        <div className={styles['donate__campaign__meter']}>
          <div className={styles['donate__campaign__meter__track']} />
          <div
            className={styles['donate__campaign__meter__fill']}
            style={{
              width: `${Math.min(pledgeSum / CURRENT_OBJECTIVE, 1) * 100}%`,
            }}
          />
        </div>
      </div>
      <div className={styles['donate__shout-out']}>
        <CSSTransition
          timeout={200}
          classNames={{
            appear: styles['donate__shout-out__message--will-enter'],
            appearActive: styles['donate__shout-out__message--is-entering'],
            appearDone: styles['donate__shout-out__message--has-appeared'],
            enter: styles['donate__shout-out__message--will-enter'],
            enterActive: styles['donate__shout-out__message--is-entering'],
            enterDone: styles['donate__shout-out__message--has-entered'],
            exit: styles['donate__shout-out__message--will-exit'],
            exitActive: styles['donate__shout-out__message--is-exiting'],
          }}
          appear
          in={isShowingShoutOut}
        >
          <a
            href={PATREON_URL}
            target="_blank"
            rel="noreferrer noopener"
            className={styles['donate__shout-out__message']}
          >
            {shoutOutName ? (
              <span>
                Shout-out to{' '}
                <span className={styles['donate__shout-out__message__name']}>
                  {shoutOutName}
                </span>{' '}
                for their monthly support!
              </span>
            ) : (
              'Pledge $15 or more to get a shout-out right here'
            )}
          </a>
        </CSSTransition>
      </div>
      <h2 className={styles['donate__subtitle']}>
        Sponsoring Generative.fm Development
      </h2>
      <div className={styles['donate__text']}>
        Generative.fm is available completely free of charge and ad-free.
        However, maintaining the service and developing new features is not
        sustainable without financial support. Please consider making a payment
        comparable to what you pay for similar services, or what you might
        expect to pay for this one.
      </div>
      <h2 className={styles['donate__subtitle']}>How to pay</h2>
      <div className={styles['donate__methods']}>
        <div className={styles['donate__methods__column']}>
          <div className={styles['donate__methods__column__method']}>
            <a
              className={styles['donate__methods__column__method__title']}
              href={PATREON_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              Patreon
            </a>
            <div
              className={styles['donate__methods__column__method__description']}
            >
              Pledging a monthly amount on Patreon gets you special benefits
              like exclusive updates, influence over upcoming changes,
              recognition, and more.
            </div>
          </div>
          <div className={styles['donate__methods__column__method']}>
            <a
              className={styles['donate__methods__column__method__title']}
              href={PAYPAL_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              PayPal
            </a>
            <div
              className={styles['donate__methods__column__method__description']}
            >
              You can make a one-time payment with PayPal even if you don't have
              an account with them.
            </div>
          </div>
          <div className={styles['donate__methods__column__method']}>
            <a
              className={styles['donate__methods__column__method__title']}
              href={BANDCAMP_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              Bandcamp
            </a>
            <div
              className={styles['donate__methods__column__method__description']}
            >
              Official Generative.fm releases can be purchased on Bandcamp.
            </div>
          </div>
        </div>
        <div className={styles['donate__methods__column']}>
          <div className={styles['donate__methods__column__method']}>
            <div className={styles['donate__methods__column__method__title']}>
              Cryptocurrencies
            </div>
            <div
              className={styles['donate__methods__column__method__description']}
            >
              Select a cryptocurrency to see an address where you can send
              payments. If you'd like to use a cryptocurrency that isn't listed
              here,{' '}
              <a
                href="https://alexbainter.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                get in touch
              </a>
              .{' '}
            </div>
            <CryptoPicker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
