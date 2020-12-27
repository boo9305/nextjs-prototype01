import axios from 'axios'
import { default_url } from '../url'
export const AUTH_INIT = "AUTH_INIT"
export const AUTH_LOGIN = "AUTH_LOGIN"
export const AUTH_LOGOUT = "AUTH_LOGOUT"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAIL = "AUTH_FAIL"

export const authSuccess = (token, id) => {
  return{
    type : AUTH_SUCCESS,
    token : token,
    id : id,
    err : null,
    isLogin : true,
  }
}

export const authFail = (err) => {
  return {
    type : AUTH_FAIL,
    token : null,
    id : null,
    err : err,
    isLogin : false,
  }
}

export const authInit = () => {
  return {
    type : AUTH_INIT
  }
}



export const authLogin = (id, pw) => {
  return dispatch => {
    console.log("login : ",id,pw)
    axios.defaults.headers = {
    }
    axios.post(default_url + '/rest_auth/login/', {
      username : id,
      password : pw,
    }).then(res => {
      //axios.get(`/api/preview?token=${res.data.key}`);
      localStorage.setItem("token", res.data.key)
      localStorage.setItem("id", id)
      dispatch(authSuccess(res.data.key, id))
    }).catch(err => {
      dispatch(authFail(err.message))
    })
  }
}

export const authLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  
  return dispatch => {
    axios.post(default_url + '/rest_auth/logout/').then(res => {
      dispatch(authFail())
    }).catch(err => {
      dispatch(authFail())
    })
  }
}

export const authCheck = () => {
  return dispatch => {
    let token = localStorage.getItem("token")
    let id = localStorage.getItem("id")

    if (token !== null && id !== null) {
      dispatch(authSuccess(token, id))
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      dispatch(authFail('login fail'))
    }
  }
}
