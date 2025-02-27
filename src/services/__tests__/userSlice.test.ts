import { authCheck, getUserThunk, loginUserThunk, logoutUserThunk, registerUserThunk, updateUserThunk, userReducer } from "@slices";
import { initialState } from "./rootReducer.test";

describe('Тест состояния userSlice', () => {
  const initState = initialState.user;
  const mockUser = {
    user: {
      email: "test@test.ru",
      name: "test"
    }
  };

  it('Исходное состояние', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initState);
  });

  it('Тест редьюсера authCheck', () => {
    const action = authCheck()
    const nextState = userReducer(initState, action);

    expect(nextState.isAuthChecked).toBe(true);
  });

 describe('Тест регистрации пользователя', () => {
  it('Ожидание ответа на запроса', () => {
      const action = { type: registerUserThunk.pending.type };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });
    it('Запрос отклонен', () => {
      const action = {
        type: registerUserThunk.rejected.type,
        error: { message: 'Error message' }
      };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(action.error.message);
    });
    it('Запрос выполнен', () => {
      const action = { type: registerUserThunk.fulfilled.type };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(false);
    });
  });

  describe('Тест авторизации пользователя', () => {
    it('Ожидание ответа на запроса', () => {
      const action = { type: loginUserThunk.pending.type };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });
    it('Запрос отклонен', () => {
      const action = {
        type: loginUserThunk.rejected.type,
        error: { message: 'Error message' }
      };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(action.error.message);
    });
    it('Запрос выполнен', () => {
      const action = { type: loginUserThunk.fulfilled.type };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(false);
    });
  });

  describe('Тест запроса информации о пользователи', ()=>{
    it('Ожидание ответа на запроса', () => {
      const action = { type: getUserThunk.pending.type };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(true);
    });
    it('Запрос отклонен', () => {
      const action = { type: getUserThunk.rejected.type };
      const nextState = userReducer(initState, action);

      expect(nextState.isAuthChecked).toBe(true);
      expect(nextState.isLoading).toBe(false);
    });
    it('Запрос выполнен', () => {
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: mockUser
      };
      const nextState = userReducer(initState, action);

      expect(nextState.user).toBe(mockUser.user);
      expect(nextState.isAuthChecked).toBe(true);
      expect(nextState.isLoading).toBe(false);
    });
  });

  describe('Тест изменения информации пользователя', () => {
    it('Ожидание ответа на запроса', () => {
      const action = { type: updateUserThunk.pending.type };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });
    it('Запрос отклонен', () => {
      const action = {
        type: updateUserThunk.rejected.type,
        error: { message: 'Error message' }
      };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(action.error.message);
    });
    it('Запрос выполнен', () => {
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: mockUser
      };
      const nextState = userReducer(initState, action);

      expect(nextState.user).toBe(mockUser.user);
      expect(nextState.isLoading).toBe(false);
    });
  });

  describe('Тест выхода пользователя', () => {
    it('Ожидание ответа на запроса', () => {
      const action = { type: logoutUserThunk.pending.type };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });
    it('Запрос отклонен', () => {
      const action = {
        type: logoutUserThunk.rejected.type,
        error: { message: 'Error message' }
      };
      const nextState = userReducer(initState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(action.error.message);
    });
    it('Запрос выполнен', () => {
      const action = { type: logoutUserThunk.fulfilled.type };
      const modified = {...initState, user: mockUser.user};
      const nextState = userReducer(modified, action);

      expect(nextState.user).toBeNull;
      expect(nextState.isLoading).toBe(false);
    });
  });
});