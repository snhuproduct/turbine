import { getCreateUserButton, getUsers } from '../support/app.po';

describe('TobogganApp', () => {
  beforeEach(() => cy.visit('/'));

  it('should display users', () => {
    getUsers().should((t) => expect(t.length).equal(2));
    getCreateUserButton().click();
    getUsers().should((t) => expect(t.length).equal(3));
  });
});