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
      cy.get('@tableRows').get('td:nth-child(1)').as('tableFirstColumn')
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
        "name19",
        "name18"
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
        "last19",
        "last18"
      ]);
    });
  });
})
