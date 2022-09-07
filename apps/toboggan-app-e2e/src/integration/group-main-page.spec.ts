describe('GroupMainPage', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/groups').as('postGroup');
    cy.intercept('GET', '/api/users', { fixture: 'users' }).as('getUsers');

    cy.visit('/group');
    cy.contains('Create user group').click({ force: true });
  });

  it('should open the modal', () => {
    cy.get('.gp-modal-x-title').should('exist');
  });

  it('should validate the form on submission', () => {
    cy.get('.modal-footer > .gp-button-primary').click();
    cy.get('.gp-input-x-error > span').should('contain', 'User group name');
    cy.get('.gp-textarea-x-error > span').should('contain', 'User group description');
  });

  it('should not allow the special characters in the user group name field', () => {
    cy.get('input[placeholder="placeholder"]').type('Name!@#');
    cy.get('.gp-input-x-error > span').should('contain', 'Use only letters and numbers');
  });

  it('should approve validation of the user group name field in the form on submission', () => {
    cy.get('input[placeholder="placeholder"]').type('Name');
    cy.get('.modal-footer > .gp-button-primary').click();
    cy.get('.gp-input-x-error > span').should('not.exist');
    cy.get('.gp-textarea-x-error > span').should('contain', 'User group description');
  });

  it('should approve validation of the user group description field in the form on submission', () => {
    cy.get('textarea[placeholder="You might explain what makes this group unique, or why you\'re creating it"]').type('Description')
    cy.get('.modal-footer > .gp-button-primary').click();
    cy.get('.gp-input-x-error > span').should('contain', 'User group name');
    cy.get('.gp-textarea-x-error > span').should('not.exist');
  });

  it('should submit the form', () => {
    cy.get('input[placeholder="placeholder"]').type('Name');
    cy.get('textarea[placeholder="You might explain what makes this group unique, or why you\'re creating it"]').type('Description')
    cy.get('.modal-footer > .gp-button-primary').click();
    cy.get('.gp-input-x-error > span').should('not.exist');
    cy.get('.gp-textarea-x-error > span').should('not.exist');
  });

  describe('in "Add user to this group" modal', () => {
    beforeEach(() => {
      cy.get('input[placeholder="placeholder"]').type('Name');
      cy.get('textarea[placeholder="You might explain what makes this group unique, or why you\'re creating it"]').type('Description')
      cy.get('.gp-checkbox-x-input').check();
      cy.get('.modal-footer > .gp-button-primary').click();

      cy.get('@postGroup');
      cy.get('@getUsers');

      cy.get('input[placeholder="placeholder"]:visible').as('emailField');
    });

    it('should open the modal', () => {
      cy.get('.gp-modal-x-title').should('contain', 'Add user to this group');
    });

    it('should not submit empty', () => {
      cy.get('button').contains('Add user');

      cy.get('.gp-modal-x-title').should('contain', 'Add user to this group');
    });

    it('should be validated in email format', () => {
      cy.get('@emailField').type('email');

      cy.get('.gp-input-x-error > span').should('contain', 'Check email format');
    });

    it('should display the search dropdown menu after 3 characters', () => {
      cy.get('@emailField').type('us');

      cy.get('.dropdown-menu').should('not.exist');

      cy.get('@emailField').type('e');

      cy.get('.dropdown-menu').should('exist');

      cy.get('@emailField').type('r');

      cy.get('.dropdown-menu').should('exist');
    });

    it('should select an option from the search dropdown menu', () => {
      cy.get('@emailField').type('user');

      cy.get('.dropdown-menu').contains('user-0@sada.com').click();

      cy.get('@emailField').should('contain.value', 'user-0@sada.com');
    });
  });
});
