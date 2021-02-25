describe('My First Test', () => {
  it('Loads the app', () => {
    cy.visit('/');
    cy.contains('Generative.fm Play');
  });
});
