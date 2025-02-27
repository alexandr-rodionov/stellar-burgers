import { getIngredientsThunk, ingredientsReducer } from "@slices";
import { initialState } from "./rootReducer.test";

describe('Тест состояния ingredientsSlice', () => {
  const initState = initialState.ingredients;

  it('Исходное состояние', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initState);
  });

  describe('Тест запроса ингридиентов', () => {
    it('Ожидание ответа на запроса', () => {
      const action = { type: getIngredientsThunk.pending.type };
      const nextState = ingredientsReducer(initState, action);

      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });
    it('Запрос отклонен', () => {
      const action = {
        type: getIngredientsThunk.rejected.type,
        error: {message: 'Error message'}
      }
      const nextState = ingredientsReducer(initState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(action.error.message);
    });
    it('Запрос выполнен', () => {
      const mockIngredients = [
        {
          "_id": "123",
          "name": "Имя",
          "type": "Тип",
          "proteins": 10,
          "fat": 10,
          "carbohydrates": 10,
          "calories": 30,
          "price": 50,
          "image": "Картинка",
          "image_mobile": "Картика",
          "image_large": "Картинка",
          "__v": 0

        },
      ];
      const action = {
        type: getIngredientsThunk.fulfilled.type,
        payload: mockIngredients
      };
      const nextState = ingredientsReducer(initState, action);

      expect(nextState.ingredients).toBe(mockIngredients);
      expect(nextState.loading).toBe(false);
    });
  });
});