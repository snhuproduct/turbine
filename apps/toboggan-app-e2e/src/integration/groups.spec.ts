import { findText } from '../support/app.po';

describe('Groups', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/groups', { fixture: 'groups' }).as('getGroups');
    cy.intercept('POST', '/api/groups').as('postGroup');
    cy.intercept('GET', '/api/users', { fixture: 'users' }).as('getUsers');

    cy.visit('/group');

    cy.wait('@getGroups');

    cy.get('table > tbody > tr').as('tableRows');
    cy.get('@tableRows').get('td:nth-child(1)').as('tableFirstColumn')
  });

  it('should have the table', () => {
    cy.get('table').should('exist');
  });

  it('should have no more than 10 rows per page in the table', () => {
    cy.get('@tableRows').should('not.have.lengthOf.greaterThan', 10);
  });

  it('should display "no users" message in table when groups are missing', () => {
    cy.intercept({ method: 'GET', url: 'api/groups' }, []).as('getGroups');

    cy.visit('/group');

    cy.wait('@getGroups');

    cy.get('.gp-table-x-noresultsheading').should('contain', 'No groups yet');
  });

  it('should have the table with ascending sorting in the first column', () => {
    cy.get('@tableFirstColumn').then(findText).should('deep.eq', [
      "Group name-0",
      "Group name-1",
      "Group name-10",
      "Group name-11",
      "Group name-12",
      "Group name-13",
      "Group name-14",
      "Group name-15",
      "Group name-16",
      "Group name-17"
    ]);
  });

  it('should activate the ascending sorting in the first column in the table', () => {
    cy.get('@tableRows').get(':nth-child(1) > th:nth-child(1) button').click({ force: true })

    cy.get('@tableFirstColumn').then(findText).should('deep.eq', [
      "Group name-0",
      "Group name-1",
      "Group name-10",
      "Group name-11",
      "Group name-12",
      "Group name-13",
      "Group name-14",
      "Group name-15",
      "Group name-16",
      "Group name-17"
    ]);
  });

  it('should sort descending the first column by double click in the table', () => {
    cy.get('@tableRows').get(':nth-child(1) > th:nth-child(1) button').dblclick({ force: true });

    cy.get('@tableRows').get(':nth-child(1) > td:nth-child(1)').contains('Group name-9');

    cy.get('@tableFirstColumn').then(findText).should('deep.eq', [
      "Group name-9",
      "Group name-8",
      "Group name-7",
      "Group name-6",
      "Group name-5",
      "Group name-4",
      "Group name-3",
      "Group name-2",
      "Group name-19",
      "Group name-18"
    ]);
  });

  describe('in "Create user group" modal', () => {
    beforeEach(() => {
      cy.contains('Create user group').click({ force: true });
    })

    it('should open the modal', () => {
      cy.get('.gp-modal-x-title').should('exist');
    });

    it('should validate the form on submission', () => {
      cy.get('.modal-footer > .gp-button-primary').click();
      cy.get('.gp-input-x-error > span').should('contain', 'This field can’t be empty');
      cy.get('.gp-textarea-x-error > span').should('contain', 'This field can’t be empty');
    });

    it('should not allow the special characters in the user group name field', () => {
      cy.get('input[placeholder="placeholder"]').type('Name!@#');
      cy.get('.gp-input-x-error > span').should('contain', 'Use only letters and numbers');
    });

    it('should approve validation of the user group name field in the form on submission', () => {
      cy.get('input[placeholder="placeholder"]').type('Name');
      cy.get('.modal-footer > .gp-button-primary').click();
      cy.get('.gp-input-x-error > span').should('not.exist');
      cy.get('.gp-textarea-x-error > span').should('contain', 'This field can’t be empty');
    });

    it('should approve validation of the user group description field in the form on submission', () => {
      cy.get('textarea[placeholder="You might explain what makes this group unique, or why you\'re creating it"]').type('Description')
      cy.get('.modal-footer > .gp-button-primary').click();
      cy.get('.gp-input-x-error > span').should('contain', 'This field can’t be empty');
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
});
