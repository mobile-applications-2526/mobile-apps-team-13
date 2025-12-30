
describe('Home Screen', () => {
  it('should show welcome message', () => {
    cy.visit('http://localhost:8081'); 
    cy.contains('Welcome');
  });
});
