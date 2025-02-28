import { addIngredient, burgerConstructorReducer, clearIngredients, moveDownIngredient, moveUpIngredient, removeIngredient } from "@slices";
import { initialState } from './rootReducer.test';
import { nanoid } from 'nanoid';

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockReturnValue('id0')
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Тест состояния burgerConstructorSlice', () => {
  const initState = initialState.burgerConstructor;
  const mockBun = {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  };
  const mockMain = {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
  };
  const mockSauce = {
    "_id": "643d69a5c3f7b9001cfa0942",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v": 0
  };

  it('Исходное состояние', () => {
    expect(burgerConstructorReducer(undefined, { type: '' })).toEqual(initState);
  });

  it('Тест редьюсера addIngredient', () => {
    const expectedState = {
      ...initState,
      bun: {...mockBun, id: 'id0'}
    };
    const action = addIngredient({ ...mockBun, id: 'id0' });
    const nextState = burgerConstructorReducer(initState, action);

    expect(nextState).toEqual(expectedState);
  });

  it('Тест редьюсера removeIngredient', () => {
    const modified = {
      ...initState,
      ingredients: [
        { ...mockMain, id: 'id1' }
      ]
    };
    const action = removeIngredient({ ...mockMain, id: 'id1'});
    const nextState = burgerConstructorReducer(modified, action);

    expect(nextState).toEqual(initState);
  });

  it('Тест редьюсера moveUpIngredient', () => {
    const modified = {
      ...initState,
      ingredients: [
        { ...mockMain, id: 'id1' },
        { ...mockSauce, id: 'id2' }
      ]
    };
    const action = moveUpIngredient(1);
    const nextState = burgerConstructorReducer(modified, action);

    expect(nextState.ingredients[0].id).toBe('id2');
    expect(nextState.ingredients[1].id).toBe('id1');
  });

  it('Тест редьюсера moveDownIngredient', () => {
    const modified = {
      ...initState,
      ingredients: [
        { ...mockMain, id: 'id1' },
        { ...mockSauce, id: 'id2' }
      ]
    };
    const action = moveDownIngredient(0);
    const nextState = burgerConstructorReducer(modified, action);

    expect(nextState.ingredients[0].id).toBe('id2');
    expect(nextState.ingredients[1].id).toBe('id1');
  });

  it('Тест редьюсера clearIngredients', () => {
    const modified = {
      bun: { ...mockBun, id: 'id0' },
      ingredients: [
        { ...mockMain, id: 'id1' },
        { ...mockSauce, id: 'id2' }
      ]
    };
    const action = clearIngredients();
    const nextState = burgerConstructorReducer(modified, action);

    expect(nextState).toEqual(initState);
  });
});