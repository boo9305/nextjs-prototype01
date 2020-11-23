import axios from 'axios'

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
    err : null
  }
}

export const authFail = (err) => {
  return {
    type : AUTH_FAIL,
    token : 'fail',
    id : null,
    err : err
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
    axios.post('http://3.34.100.138:8000/rest_auth/login/', {
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
    axios.post('http://3.34.100.138:8000/rest_auth/logout/').then(res => {
      dispatch(authInit())
    }).catch(err => {
      dispatch(authInit())
    })
  }
}

export const authCheck = () => {
  return dispatch => {
    let key = localStorage.getItem("token")
    let id = localStorage.getItem("id")

    if (key === null || id === null) {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      key = null
      id = null
    }

    if (key !== null) {
      dispatch(authSuccess(key, id))
    } else {
      dispatch(authFail('login fail'))
    }
  }
}
