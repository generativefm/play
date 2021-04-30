describe('Search', () => {
  describe('on wide screens', () => {
    it('should return to the previous page when the history is popped', () => {
      cy.visit('/browse');
      cy.visit('/library');
      cy.get('[data-cy=open-search]').click();
      cy.go(-1);
      cy.location().should(({ pathname }) => expect(pathname).to.eq('/browse'));
    });
  });
  describe('on narrow screens', () => {
    beforeEach(() => {
      cy.viewport('iphone-8');
    });
    it('should just close when the history is popped', () => {
      cy.visit('/browse');
      cy.visit('/library');
      cy.get('[data-cy=open-search]').click();
      cy.go(-1);
      cy.location().should(({ pathname }) =>
        expect(pathname).to.eq('/library')
      );
      cy.get('[data-cy=search-input]').should('not.exist');
      cy.go(-1);
      cy.location().should(({ pathname }) => expect(pathname).to.eq('/browse'));
    });
    it('should restore the history stack when closed', () => {
      cy.visit('/browse');
      cy.visit('/library');
      cy.get('[data-cy=open-search]').click();
      cy.get('[data-cy=close-search]').click();
      cy.go(-1);
      cy.location().should(({ pathname }) => expect(pathname).to.eq('/browse'));
    });
    it('should replace the history entry when navigating to a search result', () => {
      cy.visit('/browse');
      cy.visit('/library');
      cy.get('[data-cy=open-search]').click();
      cy.get('[data-cy=search-input]').type('drones');
      cy.get('[data-cy=search-result--drones]').click();
      cy.go(-1);
      cy.location().should(({ pathname }) =>
        expect(pathname).to.eq('/library')
      );
      cy.get('[data-cy=search-input]').should('not.exist');
      cy.go(-1);
      cy.location().should(({ pathname }) => expect(pathname).to.eq('/browse'));
    });
    it('should stay open underneath the playback controls', () => {
      cy.visit('/browse');
      cy.visit('/generator/drones');
      cy.get('[data-cy=play-piece]').click();
      cy.get('[data-cy=open-search]').click();
      cy.get('[data-cy=control-bar]').click();
      cy.get('[data-cy=playback__open-queue]').click();
      cy.go(-2);
      cy.get('[data-cy=search-input]').should('exist');
      cy.go(-1);
      cy.get('[data-cy=search-input]').should('not.exist');
      cy.location().should(({ pathname }) =>
        expect(pathname).to.eq('/generator/drones')
      );
      cy.go(-1);
      cy.location().should(({ pathname }) => expect(pathname).to.eq('/browse'));
    });
  });
});
