import { findText } from '../support/app.po';

describe('Users', () => {
  it('should display "no users" message in table when users are missing', () => {
    cy.intercept({ method: 'GET', url: 'api/users' }, []).as('getUsers');

    cy.visit('/user');

    cy.wait('@getUsers');

    cy.get('.gp-table-x-noresultsheading').should('contain', 'No Results Found');
  });

  describe('with users data', () => {
    beforeEach(() => {
      cy.intercept({ method: 'GET', url: 'api/users' }, { fixture: 'users' }).as('getUsers');

      cy.visit('/user');

      cy.wait('@getUsers');

      cy.get('table > tbody > tr').as('tableRows');
      cy.get('@tableRows').get('td:nth-child(1)').as('tableFirstColumn');
      cy.get('@tableRows').get('td:nth-child(4)').as('tableForthColumn');
      cy.get('@tableRows').get('td:nth-child(5)').as('tableFifthColumn');
    });

    it('should have the table', () => {
      cy.get('table').should('exist');
    });

    it('should have no more than 10 rows per page in the table', () => {
      cy.get('@tableRows').should('not.have.lengthOf.greaterThan', 10);
    });

    it('should have the table with ascending sorting in the first column', () => {
      cy.get('@tableFirstColumn').then(findText).should('deep.eq', [
        "name0",
        "name1",
        "name10",
        "name11",
        "name12",
        "name13",
        "name14",
        "name15",
        "name16",
        "name17"
      ]);
    });

    it('should sort descending the first column by double click in the table', () => {
      cy.get('@tableRows').get(':nth-child(1) > th:nth-child(1) button').click({ force: true });

      cy.get('@tableRows').get(':nth-child(1) > td:nth-child(1)').contains('name9');

      cy.get('@tableFirstColumn').then(findText).should('deep.eq', [
        "name9",
        "name8",
        "name7",
        "name6",
        "name5",
        "name4",
        "name3",
        "name2",
        "name17",
        "name16"
      ]);
    });

    it('should sort descending the second column by double click in the table', () => {
      cy.get('@tableRows').get(':nth-child(1) > th:nth-child(2) button').dblclick({ force: true });

      cy.get('@tableRows').get(':nth-child(1) > td:nth-child(2)').contains('last9');

      cy.get('@tableRows').get('td:nth-child(2)').then(findText).should('deep.eq', [
        "last9",
        "last8",
        "last7",
        "last6",
        "last5",
        "last4",
        "last3",
        "last2",
        "last17",
        "last16"
      ]);
    });

    it('should occur automatically after three characters are entered', () => {
      cy.get('input[placeholder="Search"]').type('e10', { force: true });

      cy.get('.gp-table-x-bodyrow').contains('name10').should('exist');
    });

    it('should occur after hitting “enter”', () => {
      cy.get('input[placeholder="Search"]').type('10{enter}', { force: true });

      cy.get('.gp-table-x-bodyrow').contains('name10').should('exist');
    });

    it('should search by no records criteria', function () {
      cy.get('input[placeholder="Search"]').type('no exist', { force: true });

      cy.get('.gp-table-x-noresults').should('exist');
    });

    it('should combine searching and filtering together', function () {
      cy.get('input[placeholder="Search"]').type('name18', { force: true });

      cy.get('#Status-filter-button').click({force: true});
      cy.get('#Status-filter-menu').contains('Inactive').click({force: true});
      cy.get('#Status-filter-menu').contains('OK').click({force: true});

      cy.get('.gp-table-x-bodyrow').contains('name18').should('exist');
    });

    it('should deactivate the active user', () => {
      cy.get('@tableForthColumn')
        .contains('Active')
        .first()
        .parents('tr')
        .as('tableFirstRow')

      cy.get('@tableFirstRow').find('td:nth-child(5) button').click({ force: true })

      cy.get('.gp-table-x-dropdownmenubutton').contains('Deactivate').click();

      cy.fixture('users').then(users => {
        users[0].enabled = false;

        cy.intercept('GET', 'api/users', users);
      });

      cy.get('.modal-content button').contains('Yes, deactivate').click();

      cy.get('.modal-content').should('not.exist');
      cy.get('.gp-banneralert').contains('\'s account has been deactivated.').should('exist');
      cy.get('@tableFirstRow').contains('name0').should('not.exist');
    });

    it('should leave the user active', () => {
      cy.get('@tableForthColumn')
        .contains('Active')
        .parent()
        .get('td:nth-child(5) button')
        .first()
        .click({ force: true });

      cy.get('.gp-table-x-dropdownmenubutton').contains('Deactivate').click();

      cy.get('.modal-content button').contains('No, keep active').click();

      cy.get('.modal-content').should('not.exist');
    });

    it('should show errors when clear inputs when edit user', function () {
      cy.get('@tableFifthColumn').find('button').first().click({ force: true });
      cy.get('.gp-table-x-dropdownmenubutton').contains('Edit').click();

      cy.get('input[ng-reflect-name="firstName"]').clear();

      cy.get('[label="First Name"] .gp-input-x-error').should('contain', 'First Name is required');

      cy.get('input[ng-reflect-name="lastName"]').clear();

      cy.get('[label="Last Name"] .gp-input-x-error').should('contain', 'Last Name is required');

      cy.get('input[ng-reflect-name="email"]').clear();

      cy.get('[label="Email Address"] .gp-input-x-error').should('contain', 'Email is required');
    });

    it('should show an error when the email has inappropriate format when edit user', function () {
      cy.get('@tableFifthColumn').find('button').first().click({ force: true });
      cy.get('.gp-table-x-dropdownmenubutton').contains('Edit').click();
      cy.get('input[ng-reflect-name="email"]').clear().type('testemail.com');

      cy.get('[label="Email Address"] .gp-input-x-error > span').should('contain', 'Email format is invalid');
    });

    it('should show the difference table on submission when edit user', function () {
      cy.get('@tableFifthColumn').find('button').first().click({ force: true });
      cy.get('.gp-table-x-dropdownmenubutton').contains('Edit').click();
      cy.get('input[ng-reflect-name="firstName"]').clear().type('Name');
      cy.get('input[ng-reflect-name="lastName"]').clear().type('Surname');
      cy.get('input[ng-reflect-name="email"]').clear().type('new@email.com');
      cy.get('button').contains('Review Changes').click();

      cy.get('table').should('contain', 'Name');
      cy.get('table').should('contain', 'Surname');
      cy.get('table').should('contain', 'new@email.com');
    });

    it('should navigate back to the Manage Users table when the administrator cancels the password reset', () => {
      cy.get('@tableFifthColumn').find('button').first().click({ force: true });

      cy.get('.gp-table-x-dropdownmenubutton').contains('Reset password').click();

      cy.get('.modal-content').contains('No, Cancel').click();

      cy.get('.modal-content').should('not.exist');
    });

    it('should contain first equal header titles', () => {
      cy.get('.gp-table-x-headingwrapper').then(findText).should('deep.eq', [
        "First name",
        "Last name",
        "E-mail address",
        "Status",
        "Actions"
      ]);
    });

    it('should contain the word "Search"', () => {
      cy.get('input[aria-label="Search"]').should('exist');
    });

    it('should not display sort button', () => {
      cy.get('button')
        .contains('Status')
        .get('.gp-table-column-sort-disabled')
        .should('exist');
    });

    it('should display unsuccess banner', () => {
      cy.intercept('POST', 'api/users', {
        statusCode: 500,
        body: {
          error: 'Internal Server Error',
        },
      });

      cy.get('.gp-button-x-label').contains('Add New User').click({ force: true });

      cy.get('input[formcontrolname="firstName"]').type('abc', { force: true });
      cy.get('input[formcontrolname="lastName"]').type('abc', { force: true });
      cy.get('input[formcontrolname="email"]').type('abc@abc', { force: true });
      cy.get('.modal-content button').contains('Add New User').click({ force: true });

      cy.get('.gp-banneralert-x-message').contains('Couldn\'t be completed').should('exist');
    });

    it('should display success banner', () => {
      cy.intercept('POST', 'api/users', {
        statusCode: 201,
      });

      cy.get('.gp-button-x-label').contains('Add New User').click({ force: true });

      cy.get('input[formcontrolname="firstName"]').type('abc', { force: true });
      cy.get('input[formcontrolname="lastName"]').type('abc', { force: true });
      cy.get('input[formcontrolname="email"]').type('abc@abc', { force: true });
      cy.get('.modal-content button').contains('Add New User').click({ force: true });

      cy.get('.gp-banneralert-x-message').contains('has been added as user').should('exist');
    });

    it('should successfully reset password', () => {
      cy.intercept('PUT', 'api/users/155e8f7c-a591-4a5a-9a13-fbe8bdcd3cac/password', { statusCode: 200 });

      cy.get('@tableFifthColumn').find('button').first().click({ force: true });
      cy.get('.gp-table-x-dropdownmenubutton').contains('Reset password').click();
      cy.get('.modal-content').contains('Yes, reset password').click();

      cy.get('.gp-banneralert-x-content').contains('Reset password email has been sent to [name0 last0]').should('exist');
    });

    it('should unsuccessfully reset password', () => {
      cy.intercept('PUT', 'api/users/155e8f7c-a591-4a5a-9a13-fbe8bdcd3cac/password', {
        statusCode: 500,
        body: {
          error: 'Internal Server Error',
        },
      });

      cy.get('@tableFifthColumn').find('button').first().click({ force: true });
      cy.get('.gp-table-x-dropdownmenubutton').contains('Reset password').click();
      cy.get('.modal-content').contains('Yes, reset password').click();

      cy.get('.gp-banneralert-x-content').contains('Reset password couldn\'t be completed').should('exist');
    });
  });
})
