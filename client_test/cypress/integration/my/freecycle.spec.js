describe('FreeCycle', () => {

	const is_a_number = value => {
		expect(Number.isNaN(+value), 'input should be a number').to.eq(false)
	}


	Cypress.Commands.add('navigate', (item) => {
		cy.get("#nav").contains(item).should('be.visible').click();
	})
	Cypress.Commands.add('signin', (user_id, password) => {
		user_id = user_id || `testname${Cypress._.random(0, 1e6)}`;
		cy.get("#user").contains("signin").click();
		cy.get('#main input[name="username"]').type(user_id);
		cy.get('#main input[name="password"]').type(password || 'password');
		cy.get('#main #action_signin').click();

		cy.get("#user").contains(user_id);
		cy.get("#user").contains('signout');

		//return user_id;
	})
	Cypress.Commands.add('signout', () => {
		cy.get("#user").contains("signout").should('be.visible').click();
		cy.get("#user").contains('signin').should('be.visible');
	})
	Cypress.Commands.add('create_item', (item) => {
		cy.navigate("MyItems");
		// TODO
	})


	beforeEach(() => {
		cy.visit('');  // Navigate to Env variable `CYPRESS_BASE_URL`
		// Local storage is reset per test, so the user should not be logged in
	});

	it('navigation contents', () => {
		cy.get('#nav h1').should('have.text', 'FreeCycle');
		cy.get('#nav a')
			.should('include.text', 'Items')
			.should('include.text', 'MyItems')
		;
		cy.get('#nav').contains('signin').should('be.visible');
	});

	it('logo navigates to welcome page', () => {
		cy.contains("Welcome").should('be.visible');
		cy.contains("signin").click();
		cy.contains("Welcome").should('not.be.visible');
		cy.contains("FreeCycle").click();
		cy.contains("Welcome").should('be.visible');
	});

	it('signin and out', () => {
		cy.signin();
		cy.signout();
	});

	it('MyItems redirects to signin if not signed-in', () => {
		cy.navigate("MyItems");
		cy.get("#action_signin").should('be.visible');
	});

	it('MyItems should show if signed in', () => {
		cy.signin();
		cy.navigate("MyItems");
		cy.get("#main").contains('My Page').should('be.visible');
	});

	it('MyItems postcode lookup', () => {
		cy.signin();
		cy.navigate("MyItems");

		cy.get('#main input[name="lat"]').should('not.have.value');
		cy.get('#main input[name="lon"]').should('not.have.value');

		cy.get('#main input[name="postcode"]').type("CT1 1QU");
		cy.get('#main [data-action="lookup_postcode"]').click();

		//cy.get('#main input[name="lat"]').should('not.be.empty');
		cy.get('#main input[name="lat"]').invoke("val").should(is_a_number)
		cy.get('#main input[name="lon"]').invoke("val").should(is_a_number)
	});

	it('Create Item', () => {
		cy.signin();
		cy.navigate("MyItems");

		cy.get('#main input[name="lat"]').should('not.have.value');
		cy.get('#main input[name="lon"]').should('not.have.value');

		cy.get('#main input[name="postcode"]').type("CT1 1QU");
		cy.get('#main [data-action="lookup_postcode"]').click();

		//cy.get('#main input[name="lat"]').should('not.be.empty');
		cy.get('#main input[name="lat"]').invoke("val").should(is_a_number)
		cy.get('#main input[name="lon"]').invoke("val").should(is_a_number)
	});
});