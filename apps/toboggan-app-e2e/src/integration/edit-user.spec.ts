describe('EditUser', () => {
  beforeEach(() => {
    cy.visit('/user');
  });

  it('should open the modal', () => {
    cy.get('button').contains('Edit user (demo)').click({ force: true });
    cy.get('.gp-modal-x-title').should('exist');
  });

  it('should show errors when clear inputs', () => {
    cy.get('button').contains('Edit user (demo)').click({ force: true });
    cy.get('input[ng-reflect-name="firstName"]').clear();
    cy.get('[label="First Name"] .gp-input-x-error > span').should('contain', 'First Name is required');
    cy.get('input[ng-reflect-name="lastName"]').clear();
    cy.get('[label="Last Name"] .gp-input-x-error > span').should('contain', 'Last Name is required');
    cy.get('input[ng-reflect-name="email"]').clear();
    cy.get('[label="Email Address"] .gp-input-x-error > span').should('contain', 'Email is required');
  });

  it('should show an error when the email has inappropriate format', () => {
    cy.get('button').contains('Edit user (demo)').click({ force: true });
    cy.get('input[ng-reflect-name="email"]').clear().type('testemail.com');
    cy.get('[label="Email Address"] .gp-input-x-error > span').should('contain', 'Email format is invalid');
  });

  it('should show the difference table on submission', () => {
    cy.get('button').contains('Edit user (demo)').click({ force: true });
    cy.get('input[ng-reflect-name="firstName"]').clear().type('Name');
    cy.get('input[ng-reflect-name="lastName"]').clear().type('Surname');
    cy.get('input[ng-reflect-name="email"]').clear().type('new@email.com');
    cy.get('button').contains('Review Changes').click();
    cy.get('table').should('contain', 'Name');
    cy.get('table').should('contain', 'Surname');
    cy.get('table').should('contain', 'new@email.com');
  });
});
