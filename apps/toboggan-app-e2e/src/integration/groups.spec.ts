import { findText } from '../support/app.po';

describe('Groups', () => {
  beforeEach(() => {
    cy.intercept({ method: 'GET', url: 'api/groups' }, { fixture: 'groups' }).as('getGroups');

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

  it('should sort descending the second column by double click in the table', () => {
    cy.get('@tableRows').get(':nth-child(1) > th:nth-child(2) button').dblclick({ force: true });

    cy.get('@tableRows').get(':nth-child(1) > td:nth-child(2)').contains('Lorem ipsum 9');

    cy.get('@tableRows').get('td:nth-child(2)').then(findText).should('deep.eq', [
        "Lorem ipsum 9",
        "Lorem ipsum 8",
        "Lorem ipsum 7",
        "Lorem ipsum 6",
        "Lorem ipsum 5",
        "Lorem ipsum 4",
        "Lorem ipsum 3",
        "Lorem ipsum 2",
        "Lorem ipsum 17",
        "Lorem ipsum 16"
      ]);
  });
})
