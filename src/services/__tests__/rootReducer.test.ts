import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from '../slices/burger-constructor/burger-constructor-slice';
import { ingredientsReducer } from '../slices/ingredients/ingredients-slice';
import { orderReducer } from '../slices/order/order-slice';
import { orderFeedReducer } from '../slices/order-feed/order-feed-slice';
import { orderHistoryReducer } from '../slices/order-history/order-history-slice';
import { userReducer } from '../slices/user/user-slice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  orderFeed: orderFeedReducer,
  orderHistory: orderHistoryReducer,
  user: userReducer
});

export const initialState = rootReducer(undefined, { type: '@@redux/INIT' })

describe('Инициализация rootReducer', () => {
  const expectedState = {
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    ingredients: {
      ingredients: [],
      loading: false,
      error: null
    },
    order: {
      order: null,
      request: false,
      error: null
    },
    orderFeed: {
      orderFeed: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    },
    orderHistory: {
      orderHistory: [],
      loading: false,
      error: null
    },
    user: {
      user: null,
      isLoading: false,
      isAuthChecked: false,
      error: null
    }
  };

  it('Тест rootReducer', () => {
    expect(initialState).toEqual(expectedState);
  });
});