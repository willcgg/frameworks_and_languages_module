describe('example to-do app', () => {

    beforeEach(() => {
      cy.visit('');
    });
  
    it('has correct title', () => {
        cy.get('h1').should('have.text', 'FreeCycle');
    });

});