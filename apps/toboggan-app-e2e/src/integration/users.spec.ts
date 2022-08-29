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
  });
})
