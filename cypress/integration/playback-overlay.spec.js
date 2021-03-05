describe('playback overlay', () => {
  describe('on wide screens', () => {
    it('should close when the user presses the back button', () => {
      cy.visit('/generator/drones');
      cy.get('[data-cy=play-piece]').click();
      cy.get('[data-cy=toggle-playback]').click();
      cy.get('[data-cy=playback-overlay]').should('exist');
      cy.go(-1);
      cy.get('[data-cy=playback-overlay]').should('not.exist');
    });

    it('should restore the history stack when the user closes it', () => {
      cy.visit('/browse');
      cy.visit('/generator/drones');
      cy.get('[data-cy=play-piece]').click();
      cy.get('[data-cy=toggle-playback]').click();
      cy.get('[data-cy=playback-overlay]').should('exist');
      cy.get('[data-cy=toggle-playback]').click();
      cy.get('[data-cy=playback-overlay]').should('not.exist');
      cy.go(-1);
      cy.location().should(({ pathname }) => expect(pathname).to.eq('/browse'));
    });
  });

  describe('on narrow screens', () => {
    beforeEach(() => {
      cy.viewport('iphone-8');
    });
    it('should close when the user presses the back button', () => {
      cy.visit('/generator/drones');
      cy.get('[data-cy=play-piece]').click();
      cy.get('[data-cy=control-bar]').click();
      cy.get('[data-cy=playback-overlay]').should('exist');
      cy.go(-1);
      cy.get('[data-cy=playback-overlay]').should('not.exist');
    });
    it('should close the queue when the user presses the back button', () => {
      cy.visit('/generator/drones');
      cy.get('[data-cy=play-piece]').click();
      cy.get('[data-cy=control-bar]').click();
      cy.get('[data-cy=playback-overlay]').should('exist');
      cy.get('[data-cy=playback__open-queue]').click();
      cy.get('[data-cy=playback__queue]').should('exist');
      cy.go(-1);
      cy.get('[data-cy=playback__queue]').should('not.exist');
      cy.get('[data-cy=playback-overlay]').should('exist');
      cy.go(-1);
      cy.get('[data-cy=playback-overlay]').should('not.exist');
    });
    it('should restore the history stack when the user closes it', () => {
      cy.visit('/generator/browse');
      cy.visit('/generator/drones');
      cy.get('[data-cy=play-piece]').click();
      cy.get('[data-cy=control-bar]').click();
      cy.get('[data-cy=playback-overlay]').should('exist');
      cy.get('[data-cy=playback-overlay__close]').click();
      cy.go(-1);
      cy.location().should(({ pathname }) => expect(pathname).to.eq('/browse'));

      cy.visit('/generator/drones');
      cy.get('[data-cy=play-piece]').click();
      cy.get('[data-cy=control-bar]').click();
      cy.get('[data-cy=playback-overlay]').should('exist');
      cy.get('[data-cy=playback__open-queue]').click();
      cy.get('[data-cy=playback__queue]').should('exist');
      cy.get('[data-cy=control-bar]').then((controlBars) =>
        controlBars[1].click()
      );
      cy.get('[data-cy=playback__queue]').should('not.exist');
      cy.get('[data-cy=playback-overlay__close]').click();
      cy.go(-1);
      cy.location().should(({ pathname }) => expect(pathname).to.eq('/browse'));
    });
  });
});
