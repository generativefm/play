import userOpenedPlayback, {
  USER_OPENED_PLAYBACK,
} from './user-opened-playback';
import userClosedPlayback, {
  USER_CLOSED_PLAYBACK,
} from './user-closed-playback';
import isOpenReducer from './is-open-reducer';

describe('isOpenReducer', () => {
  it(`should return true for ${USER_OPENED_PLAYBACK} actions`, () => {
    expect(isOpenReducer(false, userOpenedPlayback())).to.be.true;
  });
  it(`should return false for ${USER_CLOSED_PLAYBACK} actions`, () => {
    expect(isOpenReducer(true, userClosedPlayback())).to.be.false;
  });
  it('should return the current state for other actions', () => {
    expect(isOpenReducer(true, { type: null })).to.be.true;
    expect(isOpenReducer(false, { type: null })).to.be.false;
  });
});
