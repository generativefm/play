import { byId } from '@generative-music/pieces-alex-bainter';

const BROWSE_SORTINGS = ['atoz', 'ztoa', 'newest', 'playtime', 'trending'];

describe('Basic page loading tests', () => {
  ['/', '/browse', '/browse/all']
    .concat(BROWSE_SORTINGS.map((sorting) => `/browse/all?sort=${sorting}`))
    .concat([
      '/library',
      '/library/history',
      '/library/playtime',
      '/library/likes',
      '/donate',
      '/about',
      '/settings',
    ])
    .concat(Object.keys(byId).map((pieceId) => `/generator/${pieceId}`))
    .forEach((page) => {
      it(`should load ${page} without issues`, () => {
        cy.intercept('https://api.alexbainter.com/v1/active-patrons', {
          body: [{ name: 'Bob', creditScore: 10 }],
        });
        cy.intercept('GET', '*').as('getRequests');
        cy.visit(page);
        cy.contains('Generative.fm Play');
        cy.wait('@getRequests');
        cy.screenshot(page.substr(1).split('/').join('-') || 'root');
      });
    });
});
