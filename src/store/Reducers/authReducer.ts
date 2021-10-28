export interface AuthState {
  token: string,
  error?: string,
}

const initialState: AuthState = {
  token: '',
  error: '',
};

const authReducer = (state = initialState, action: any) => {
  const { token, error } = action.payload || {};

  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        token,
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        token,
      }
    default:
      return state;
  };
}

export default authReducer;