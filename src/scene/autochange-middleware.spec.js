import autochangeMiddleware from './autochange-middleware';
import userEnabledAutochange from './user-enabled-autochange';

describe('autochangeMiddleware', () => {
  before(() => {
    sinon.stub(window, 'setInterval');
    sinon.stub(window, 'clearInterval');
  });
  beforeEach(() => {
    window.setInterval.reset();
    window.clearInterval.reset();
  });
  after(() => {
    window.setInterval.restore();
    window.clearInterval.restore();
  });
  it('should schedule an interval when the user enables autochange', () => {});
});
