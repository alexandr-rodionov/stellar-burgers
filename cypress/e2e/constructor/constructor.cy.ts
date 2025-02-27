const bun = 'Краторная булка N-200i';
const main = 'Биокотлета из марсианской Магнолии';
const sauce = 'Соус Spicy-X';

describe('Добавить ингредиенты из списка в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:8080');
  });

  it('Добавить булку', () => {
    cy.addBun(bun);
  });

  it('Добавить ингридиент', () => {
    cy.addIngredient('main', main);
    cy.addIngredient('sauce', sauce);
  });
});

describe('Модальное окно', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:8080');
  });

  it('Открыть модальное окно', () => {
    cy.openModal(bun);
  });

  it('Открыть и закрыть модальное окно по кнопке', () => {
    cy.openModal(bun);
    cy.closeModal();
  });

  it('Открыть и закрыть модальное окно по оверлею', () => {
    cy.openModal(bun);
    cy.closeModalOverlay();
  });
});

describe('Заказ', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    window.localStorage.setItem('refreshToken', JSON.stringify('test-RT'));
    cy.setCookie('accessToken', 'test-AT');
    cy.visit('http://localhost:8080');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Добавить ингридиенты и выполнить заказ', () => {
    cy.addBun(bun);
    cy.addIngredient('main', main);
    cy.addIngredient('sauce', sauce);
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=modal]').contains('123').should('exist');
    cy.closeModal();
    cy.get('[data-cy=bun-top]').contains(bun).should('not.exist');
    cy.get('[data-cy=mains]').contains(main).should('not.exist');
    cy.get('[data-cy=mains]').contains(sauce).should('not.exist');
    cy.get('[data-cy=bun-bottom]').contains(bun).should('not.exist');
  });
});