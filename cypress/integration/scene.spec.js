describe('Scene dialog', () => {
  describe('timer', () => {
    it('should stop the playback after the specified duration', () => {
      const duration = 50;
      cy.clock(null, ['setInterval', 'clearInterval']);
      cy.visit('/generator/drones');
      cy.get('[data-cy=play-piece]').click();
      cy.get('[data-cy=open-scene-dialog]').click();
      cy.get('[data-cy=timer-duration-input]').type(duration, { force: true });
      cy.get('[data-cy=start-timer]').click();
      cy.get('[data-cy=start-timer]').contains('Stop');
      cy.tick(duration * 60 * 1000);
      cy.get('[data-cy=start-timer]').contains('Start');
    });
  });
  describe('autochange', () => {
    it('should switch to the next generator after the specified duration', () => {
      cy.clock(null, ['setInterval', 'clearInterval']);
      const interval = 30;
      cy.visit('/browse/all');
      cy.get('[data-cy=preview]').first().trigger('touchstart').click();
      cy.get('[data-cy=open-scene-dialog]').click();
      cy.get('[data-cy=autochange-interval-input]').type(interval, {
        force: true,
      });
      cy.get('[data-cy=autochange-switch]').click();
      cy.get('[data-cy*=preview--is-current]').as('firstPiece');
      cy.tick(interval * 60 * 1000);
      cy.get('[data-cy*=preview--is-current]').then((newPiece) => {
        cy.get('@firstPiece').then((firstPiece) => {
          expect(newPiece[0]).to.not.eql(firstPiece[0]);
        });
      });
    });
  });
});
