import selectDislikes from '../user/select-dislikes';
import assimilateDislikes from '../user/assimilate-dislikes';
import selectHistory from '../user/select-history';
import assimilateHistory from '../user/assimilate-history';
import selectLikes from '../user/select-likes';
import assimilateLikes from '../user/assimilate-likes';
import selectPlayTime from '../user/select-play-time';
import assimilatePlayTime from '../user/assimilate-play-time';
import selectMasterGain from '../volume/select-master-gain';
import assimilateMasterGain from '../volume/assimilate-master-gain';

const configs = [
  {
    key: 'dislikes',
    selector: selectDislikes,
    assimilator: assimilateDislikes,
  },
  {
    key: 'history',
    selector: selectHistory,
    assimilator: assimilateHistory,
  },
  {
    key: 'likes',
    selector: selectLikes,
    assimilator: assimilateLikes,
  },
  {
    key: 'userPlayTime',
    selector: selectPlayTime,
    assimilator: assimilatePlayTime,
  },
  {
    key: 'masterGain',
    selector: selectMasterGain,
    assimilator: assimilateMasterGain,
  },
];

export default configs;
