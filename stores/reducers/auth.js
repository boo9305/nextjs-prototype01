import { AUTH_INIT, AUTH_LOGIN, AUTH_LOGOUT, AUTH_SUCCESS, AUTH_FAIL } from '../actions/auth'

const initState = {
  token : null,
  id : null,
  loading : false,
  err : null,
  isLogin : null,
}

const authReducer = (state = initState , action ) => {
  switch (action.type) {
    case AUTH_INIT     :  return {...initState }
    case AUTH_LOGOUT   :  return {...initState }
    case AUTH_SUCCESS  :  return {...state, ...action}
    case AUTH_FAIL     :  return {...state, ...action}
    default :
      return state
  }
}

export default authReducer;
