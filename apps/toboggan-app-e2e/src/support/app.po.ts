export const findText = ($items: JQuery) => $items.map((index: number, html: HTMLElement) => Cypress.$(html).text().trim()).get();
