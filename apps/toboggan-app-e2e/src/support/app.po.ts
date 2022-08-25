export const getGreeting = () => cy.get('h1');

export const getUsers = () => cy.get('li.user');
export const getCreateUserButton = () => cy.get('button#create-user');

export const findText = ($items: JQuery) => $items.map((index: number, html: HTMLElement) => Cypress.$(html).text().trim()).get();
