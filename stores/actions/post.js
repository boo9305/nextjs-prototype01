import axios from 'axios'

export const POST_START = "POST_START"
export const POST_SUCCESS = "POST_SUCCESS"
export const POST_FAIL = "POST_FAIL"

export const postSuccess = () => {
  return{
    type : POST_SUCCESS,
  }
}

export const postFail = (err) => {
  return {
    type : POST_FAIL,
    err : err
  }
}

export const postList = (id, pw) => {
  return dispatch => {
    dispatch(POST_SUCCESS)

    axios.post('http://3.34.100.138:8000/rest_post/login/', {
    }).then(res => {

    }).catch(err => {
    })
  }
}

export const postDetail = () => {
  return {
  }
}

