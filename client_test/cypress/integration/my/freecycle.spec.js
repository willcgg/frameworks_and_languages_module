describe('FreeCycle', () => {

	beforeEach(() => {
		cy.visit('');  // Navigate to Env variable `CYPRESS_BASE_URL`
	});

	it('navigation contents', () => {
		cy.get('#nav h1').should('have.text', 'FreeCycle');
		cy.get('#nav a')
			.should('include.text', 'Items')
			.should('include.text', 'MyItems')
		;
		cy.contains('#nav', 'signin').should('be.visible');
	});

	it('logo navigates to welcome page', () => {
		cy.contains("Welcome").should('be.visible');
		cy.contains("signin").click();
		cy.contains("Welcome").should('not.be.visible');
		cy.contains("FreeCycle").click();
		cy.contains("Welcome").should('be.visible');
	});

});