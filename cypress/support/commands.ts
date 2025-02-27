/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('addBun', (bun) => {
  cy.get('[data-cy=bun]').contains('Добавить').click();
  cy.get('[data-cy=bun-top]').contains(bun).should('exist');
  cy.get('[data-cy=bun-bottom]').contains(bun).should('exist');
});
Cypress.Commands.add('addIngredient', (type, ingredient) => {
  cy.get(`[data-cy=${type}]`).contains('Добавить').click();
  cy.get('[data-cy=mains]').contains(ingredient).should('exist');
});

Cypress.Commands.add('openModal', (ingredient) => {
  cy.contains(ingredient).click();
  cy.get('[data-cy=modal]').contains(ingredient).should('exist');
});
Cypress.Commands.add('closeModal', () => {
  cy.get('[data-cy=modal-close-button]').click();
  cy.get('[data-cy=modal]').should('not.exist');
});
Cypress.Commands.add('closeModalOverlay', () => {
  cy.get('[data-cy=modal-overlay]').click('left', { force: true });
  cy.get('[data-cy=modal]').should('not.exist');
});
