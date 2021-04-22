import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import pieces, { byId } from '@generative-music/pieces-alex-bainter';
import Dialog from '../dialog/dialog';
import Radio from './radio';
import Checkbox from './checkbox';
import { HELP_URL } from '../user/user-context-menu';
import useShowSnackbar from '../snackbar/use-show-snackbar';
import PieceSelector from './piece-selector';
import styles from './feedback-dialog.module.scss';

const FEEDBACK_URL = 'https://api.alexbainter.com/v1/contact';

const GENERATOR_CHECKBOXES = [
  {
    id: 'neverPlays',
    label: 'It never plays',
  },
  {
    id: 'stops',
    label: 'It stops playing on its own',
  },
  {
    id: 'distorted',
    label: 'It sounds gritty, distorted, or makes crackling/popping noises',
  },
  {
    id: 'inconsistentVolume',
    label: 'The volume changes too much to listen comfortably',
  },
  {
    id: 'tooLoud',
    label: "It's louder than other generators",
  },
  {
    id: 'tooQuiet',
    label: "It's quieter than other generators",
  },
];

const FeedbackDialog = ({
  defaultFeedbackType = 'generator',
  defaultPieceId = pieces.sort((a, b) => a.title.localeCompare(b.title))[0].id,
  onDismiss,
}) => {
  const [feedbackType, setFeedbackType] = useState(defaultFeedbackType);
  const [generatorCheckboxStates, setGeneratorCheckboxStates] = useState(
    GENERATOR_CHECKBOXES.reduce((o, { id }) => {
      o[id] = false;
      return o;
    }, {})
  );
  const [text, setText] = useState('');
  const { isAuthenticated, user } = useAuth0();
  const [email, setEmail] = useState(isAuthenticated ? user.email : '');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const showSnackbar = useShowSnackbar();
  const [selectedPieceId, setSelectedPieceId] = useState(defaultPieceId);

  useEffect(() => {
    if (email || isEmailTouched || isAuthenticated || !user || !user.email) {
      return;
    }
    setEmail(user.email);
  }, [isAuthenticated, user, email, isEmailTouched]);

  const handleGeneratorTypeCheck = useCallback(() => {
    setFeedbackType('generator');
  }, []);

  const handleOtherTypeCheck = useCallback(() => {
    setFeedbackType('other');
  }, []);

  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const handleEmailChange = useCallback((event) => {
    setIsEmailTouched(true);
    setEmail(event.target.value);
  }, []);

  const handleSend = useCallback(() => {
    const timestamp = Date.now();
    const emailBodyParagraphs = [];
    if (feedbackType === 'generator' && byId[selectedPieceId]) {
      emailBodyParagraphs.push(`(Regarding "${byId[selectedPieceId].title}")`);
    }
    if (
      feedbackType === 'generator' &&
      Object.values(generatorCheckboxStates).some((isChecked) => isChecked)
    ) {
      emailBodyParagraphs.push(
        Object.values(generatorCheckboxStates)
          .reduce(
            (checkedArr, isChecked, i) =>
              isChecked
                ? checkedArr.concat([`${GENERATOR_CHECKBOXES[i].label}.`])
                : checkedArr,
            []
          )
          .join('\n')
      );
    }
    if (text) {
      emailBodyParagraphs.push(text);
    }
    emailBodyParagraphs.push(
      `(Generative.fm Play version ${process.env.APP_VERSION})`
    );
    emailBodyParagraphs.push(`(${window.navigator.userAgent})`);
    if (email) {
      emailBodyParagraphs.push(`Reply to ${email}`);
    }
    const postBody = {
      subject: `Generative.fm Play Feedback ${timestamp}`,
      body: emailBodyParagraphs.join('\n\n'),
    };
    if (email) {
      postBody.replyTo = email;
    }
    showSnackbar('Sending feedback...');
    fetch(FEEDBACK_URL, {
      method: 'POST',
      body: JSON.stringify(postBody),
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        showSnackbar('Feedback sent');
      })
      .catch((err) => {
        console.error(err);
      });
  }, [
    feedbackType,
    generatorCheckboxStates,
    text,
    email,
    showSnackbar,
    selectedPieceId,
  ]);

  const generatorCheckboxHandlers = useMemo(
    () =>
      GENERATOR_CHECKBOXES.reduce((o, { id }) => {
        o[id] = () =>
          setGeneratorCheckboxStates((prev) =>
            Object.assign({}, prev, { [id]: !prev[id] })
          );
        return o;
      }, {}),
    []
  );

  return (
    <Dialog
      title="Send Feedback"
      actions={[{ text: 'Cancel' }, { text: 'Send', onClick: handleSend }]}
      onDismiss={onDismiss}
    >
      <div className={styles['feedback-dialog-body']}>
        <p className={styles['feedback-dialog-body__help-prompt']}>
          Be sure to check{' '}
          <a href={HELP_URL} target="_blank" rel="noreferrer noopener">
            the Generative.fm help documentation.
          </a>
        </p>
        <p>Send feedback about...</p>
        <Radio
          label="A generator"
          isChecked={feedbackType === 'generator'}
          onCheck={handleGeneratorTypeCheck}
        />
        {feedbackType === 'generator' && (
          <PieceSelector
            selectedPieceId={selectedPieceId}
            onChange={setSelectedPieceId}
          />
        )}
        <Radio
          label="Something else"
          isChecked={feedbackType === 'other'}
          onCheck={handleOtherTypeCheck}
        />
        {feedbackType === 'generator' && (
          <>
            <p>Does it have any of these problems?</p>
            {GENERATOR_CHECKBOXES.map(({ id, label }) => (
              <Checkbox
                key={id}
                label={label}
                isChecked={generatorCheckboxStates[id]}
                onCheck={generatorCheckboxHandlers[id]}
              />
            ))}
          </>
        )}
        <p>{feedbackType === 'generator' ? 'Anything else?' : "What's up?"}</p>
        <textarea
          className={styles['feedback-dialog-body__text']}
          placeholder="Add your feedback here"
          rows="4"
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <p>
          Leave your email address below if you wouldn&apos;t mind getting a
          response.
        </p>
        <input
          className={styles['feedback-dialog-body__email']}
          placeholder="Your email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
    </Dialog>
  );
};

export default FeedbackDialog;
