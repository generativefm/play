import React from 'react';
import { useSelector } from 'react-redux';
import { QueueMusic } from '@material-ui/icons';
import selectQueuedPieceIds from '../queue/select-queued-piece-ids';
import List from '../piece/list';
import styles from './queue.module.scss';

const Queue = () => {
  const queuedPieceIds = useSelector(selectQueuedPieceIds);
  return (
    <div className={styles['queue']}>
      <div className={styles['queue__title']}>
        <QueueMusic /> Queue
      </div>
      <div className={styles['queue__list']}>
        <List pieceIds={queuedPieceIds} />
      </div>
    </div>
  );
};

export default Queue;
