import React, { useState, useCallback, useMemo } from 'react';
import Dialog from '../dialog/dialog';
import Radio from './radio';
import Checkbox from './checkbox';
import { HELP_URL } from '../user/user-context-menu';
import styles from './feedback-dialog.module.scss';

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

const FeedbackDialog = () => {
  const [feedbackType, setFeedbackType] = useState('generator');
  const [generatorCheckboxStates, setGeneratorCheckboxStates] = useState(
    GENERATOR_CHECKBOXES.reduce((o, { id }) => {
      o[id] = false;
      return o;
    }, {})
  );
  const [text, setText] = useState('');

  const handleGeneratorTypeCheck = useCallback(() => {
    setFeedbackType('generator');
  }, []);

  const handleOtherTypeCheck = useCallback(() => {
    setFeedbackType('other');
  }, []);

  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

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
      actions={[{ text: 'Cancel' }, { text: 'Send' }]}
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
      </div>
    </Dialog>
  );
};

export default FeedbackDialog;
