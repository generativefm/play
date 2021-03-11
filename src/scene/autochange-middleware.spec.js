import autochangeMiddleware from './autochange-middleware';
import userEnabledAutochange from './user-enabled-autochange';
import userDisabledAutochange from './user-disabled-autochange';
import userPlayedPiece, {
  USER_PLAYED_PIECE,
} from '../playback/user-played-piece';

describe('autochangeMiddleware', () => {
  before(() => {
    sinon.stub(window, 'setInterval');
    sinon.stub(window, 'clearInterval');
  });
  beforeEach(() => {
    setInterval.reset();
    clearInterval.reset();
  });
  after(() => {
    setInterval.restore();
    clearInterval.restore();
  });
  it('should schedule an interval when the user enables autochange', () => {
    const mockInterval = 123;
    autochangeMiddleware(null)(() => {})(
      userEnabledAutochange({ interval: mockInterval })
    );
    expect(setInterval.calledOnce).to.be.true;
    expect(setInterval.firstCall.args[1]).to.equal(mockInterval);
  });
  it('should clear the interval when the user disables autochange', () => {
    const dispatch = autochangeMiddleware(null)(() => {});
    const mockIntervalId = Symbol();
    setInterval.returns(mockIntervalId);
    dispatch(userEnabledAutochange({ interval: 5 }));
    dispatch(userDisabledAutochange());
    expect(clearInterval.called).to.be.true;
    expect(clearInterval.calledWith(mockIntervalId)).to.be.true;
  });
  it('should clear the interval when playback stops', () => {
    const firstState = {
      playback: {
        status: 'playing',
      },
    };
    const secondState = {
      playback: {
        status: 'stopped',
      },
    };
    let getStateCalled = false;
    const getState = () => {
      if (!getStateCalled) {
        getStateCalled = true;
        return firstState;
      }
      return secondState;
    };
    const dispatch = autochangeMiddleware({ getState })(() => {});
    const mockIntervalId = Symbol();
    setInterval.returns(mockIntervalId);
    dispatch(userEnabledAutochange({ interval: 5 }));
    dispatch({});
    expect(clearInterval.called).to.be.true;
    expect(clearInterval.calledWith(mockIntervalId)).to.be.true;
  });
  it('should schedule the interval when playback begins', () => {
    const mockInterval = 123;
    const firstState = {
      playback: {
        status: 'stopped',
      },
    };
    const secondState = {
      playback: {
        status: 'loading',
      },
      autochange: {
        interval: mockInterval,
        isEnabled: true,
      },
    };
    let getStateCalled = false;
    const getState = () => {
      if (!getStateCalled) {
        getStateCalled = true;
        return firstState;
      }
      return secondState;
    };
    const dispatch = autochangeMiddleware({ getState })(() => {});
    dispatch({});
    expect(setInterval.calledOnce).to.be.true;
    expect(setInterval.firstCall.args[1]).to.equal(mockInterval);
  });
  it('should play the next generator when the time elapses', () => {
    const mockNextPieceId = 'NEXT_PIECE_ID';
    const mockQueue = {
      pieceIds: ['ignored', 'ignored', mockNextPieceId, 'ignored'],
      index: 1,
    };
    const getState = () => ({
      queue: mockQueue,
    });
    const dispatch = sinon.fake();
    autochangeMiddleware({ getState, dispatch })(() => {})(
      userEnabledAutochange({ interval: 5 })
    );
    setInterval.firstCall.firstArg();
    expect(dispatch.called).to.be.true;
    expect(dispatch.firstCall.firstArg).to.have.property(
      'type',
      USER_PLAYED_PIECE
    );
    expect(dispatch.firstCall.firstArg.payload).to.eql({
      selectionPieceIds: mockQueue.pieceIds,
      index: mockQueue.index + 1,
    });
  });
});
