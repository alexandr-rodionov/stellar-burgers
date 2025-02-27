import { getOrderHistoryThunk, orderHistoryReducer } from "@slices";
import { initialState } from "./rootReducer.test";

describe('Тест состояния orderHistorySlice', () => {
  const initState = initialState.orderHistory;

  it('Исходное состояние', () => {
    expect(orderHistoryReducer(undefined, { type: '' })).toEqual(initState);
  });

  describe('Тест запроса истории заказов', () => {
    it('Ожидание ответа на запроса', () => {
      const action = { type: getOrderHistoryThunk.pending.type };
      const nextState = orderHistoryReducer(initState, action);

      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });
    it('Запрос отклонен', () => {
      const action = {
        type: getOrderHistoryThunk.rejected.type,
        error: { message: 'Error message' }
      }
      const nextState = orderHistoryReducer(initState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(action.error.message);
    });
    it('Запрос выполнен', () => {
      const mockOrders = [
        {
          _id: '123',
          ingredients: [],
          status: 'done',
          name: 'Заказ',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
          number: 123
        },
      ];
      const action = {
        type: getOrderHistoryThunk.fulfilled.type,
        payload: mockOrders
      };
      const nextState = orderHistoryReducer(initState, action);

      expect(nextState.orderHistory).toBe(mockOrders);
      expect(nextState.loading).toBe(false);
    });
  });
});