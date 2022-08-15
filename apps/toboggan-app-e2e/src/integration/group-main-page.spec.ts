describe('GroupMainPage', () => {
  beforeEach(() => {
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
    cy.get('.gp-input-x-error > span').should('contain', 'Don’t use these characters:  ! @ # $');
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

  it('should open add user modal after checkbox is checked', () => {
    cy.get('input[placeholder="placeholder"]').type('Name');
    cy.get('textarea[placeholder="You might explain what makes this group unique, or why you\'re creating it"]').type('Description')
    cy.get('.gp-checkbox-x-input').check();
    cy.get('.modal-footer > .gp-button-primary').click();
    cy.get('.gp-modal-x-title').should('contain', 'Add user to this group');
  });
});
