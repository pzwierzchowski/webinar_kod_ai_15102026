describe('Logowanie w TAPSS Test Shop', () => {
  it('blokuje wysłanie formularza logowania bez wymaganych danych', () => {
    cy.visit('/moje-konto/');

    cy.get('form.woocommerce-form-login').should('be.visible').within(() => {
      cy.get('#username').should('have.attr', 'required');
      cy.get('#password').should('have.attr', 'required');
      cy.get('button[name="login"]').click();
    });

    cy.get('#username').should(($username) => {
      expect($username[0].validity.valueMissing).to.equal(true);
    });
    cy.location('pathname').should('eq', '/moje-konto/');
  });
});