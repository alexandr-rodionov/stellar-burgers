import { postOrder, orderReducer, clearOrder } from "@slices";
import { initialState } from "./rootReducer.test";

describe('Тест состояния orderSlice', () => {
  const initState = initialState.order;
  const mockOrder = {
    _id: '123',
    number: 123,
    status: 'done',
    name: 'Заказ',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    ingredients: []
  };

  it('Исходное состояние', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initState);
  });

  it('Тест редьюсера сlearOrder', () => {
    const modified = {...initState, order: mockOrder};
    const action = clearOrder();
    const nextState = orderReducer(modified, action);

    expect(nextState).toEqual(initState);
  });

  describe('Тест выполнения заказа', () => {
    it('Ожидание ответа на запроса', () => {
      const action = { type: postOrder.pending.type };
      const nextState = orderReducer(initState, action);

      expect(nextState.request).toBe(true);
      expect(nextState.error).toBeNull();
    });
    it('Запрос отклонен', () => {
      const action = {
        type: postOrder.rejected.type,
        error: {message: 'Error message'}
      }
      const nextState = orderReducer(initState, action);

      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(action.error.message);
    });
    it('Запрос выполнен', () => {
      const action = {
        type: postOrder.fulfilled.type,
        payload: mockOrder
      }
      const nextState = orderReducer(initState, action);

      expect(nextState.order).toBe(mockOrder);
      expect(nextState.request).toBe(false);
    });
  });
});