describe('Proces zakupowy Polo w TAPSS Test Shop', () => {
  const customer = {
    firstName: 'Ada',
    lastName: 'Testowa',
    street: 'Testowa 1',
    postcode: '00-001',
    city: 'Warszawa',
    phone: '000000000',
    email: `cypress-${Date.now()}@example.com`,
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/');
  });

  it('dodaje Polo do koszyka, wypełnia checkout i potwierdza złożenie zamówienia', () => {
    cy.get('a[href$="/produkt/polo/"]').first().click();
    
    cy.get('h1').should('contain.text', 'Polo');
    cy.get('.single_add_to_cart_button').click();
    cy.contains('.woocommerce-message', 'Polo').should('be.visible');

    cy.contains('.woocommerce-message a', 'Zobacz koszyk').click();
    cy.location('pathname').should('eq', '/koszyk/');
    cy.get('.cart_item').should('have.length', 1).and('contain.text', 'Polo');
    cy.get('.cart_item .quantity input').should('have.value', '1');
    cy.get('.cart-subtotal').should('contain.text', '€20,00');

    cy.contains('a.checkout-button', 'Przejdź do płatności').click();
    cy.location('pathname').should('eq', '/zamowienie/');
    cy.get('#order_review').should('contain.text', 'Polo');
    cy.get('#order_review').should('contain.text', '€30,75');

    cy.get('#billing_first_name').type(customer.firstName);
    cy.get('#billing_last_name').type(customer.lastName);
    cy.get('#billing_address_1').type(customer.street);
    cy.get('#billing_postcode').type(customer.postcode);
    cy.get('#billing_city').type(customer.city);
    cy.get('#billing_phone').type(customer.phone);
    cy.get('#billing_email').type(customer.email);
    cy.get('input[name="payment_method"][value="bacs"]').should('be.checked');

    cy.get('#place_order').click();

    cy.location('pathname', { timeout: 60000 }).should('match', /\/zamowienie\/order-received\/\d+\//);
    cy.get('.woocommerce-order-overview', { timeout: 30000 })
      .should('be.visible')
      .and('contain.text', '€30,75');
    cy.get('.woocommerce-order-details').should('contain.text', 'Polo');
    cy.get('body').should('contain.text', 'Dziękujemy');
  });

  it('pokazuje walidację dla pustych wymaganych danych rozliczeniowych', () => {
    cy.visit('/produkt/polo/');
    cy.get('.single_add_to_cart_button').click();
    cy.visit('/zamowienie/');
    cy.get('#place_order').click({ force: true });

    cy.get('.woocommerce-error').should('be.visible');
    cy.get('#billing_first_name').should('have.attr', 'aria-required', 'true');
    cy.location('pathname').should('eq', '/zamowienie/');
  });
});