import { POST_START, POST_SUCCESS, POST_FAIL } from '../actions/post'

const initState = {
  loading : false,
  err : "",
}

const postReducer = (state = initState , action ) => {
  switch (action.type) {
    case POST_FAIL  :  return {...initState, err : action.err }
    case POST_SUCCESS  :  return {...initState, loading : false }
    case POST_START     :  return {...initState, loading : true }
    default :
      return state
  }
}

export default postReducer;
