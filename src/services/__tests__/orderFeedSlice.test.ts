import { getOrderFeedThunk, orderFeedReducer } from "@slices";
import { initialState } from "./rootReducer.test";

describe('Тест состояния orderFeedSlice', () => {
  const initState = initialState.orderFeed;

  it('Исходное состояние', () => {
    expect(orderFeedReducer(undefined, { type: '' })).toEqual(initState);
  });

  describe('Тест запроса ленты заказов', () => {
    it('Ожидание ответа на запроса', () => {
      const action = { type: getOrderFeedThunk.pending.type };
      const nextState = orderFeedReducer(initState, action);

      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });
    it('Запрос отклонен', () => {
      const action = {
        type: getOrderFeedThunk.rejected.type,
        error: {message: 'Error message'}
      }
      const nextState = orderFeedReducer(initState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(action.error.message);
    });
    it('Запрос выполнен', () => {
      const mockFeeds = {
        success: true,
        orders: [
          {
            _id: '123',
            ingredients: [],
            status: 'done',
            name: 'Заказ',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z',
            number: 123
          },
        ],
        total: 10,
        totalToday: 5
      };
      const action = {
        type: getOrderFeedThunk.fulfilled.type,
        payload: mockFeeds
      };
      const nextState = orderFeedReducer(initState, action);

      expect(nextState.orderFeed).toBe(mockFeeds.orders);
      expect(nextState.total).toBe(mockFeeds.total);
      expect(nextState.totalToday).toBe(mockFeeds.totalToday);
      expect(nextState.loading).toBe(false);
    });
  });
});