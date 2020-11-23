import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router' 
import { connect } from 'react-redux'
import axios from 'axios'

import TextField from '@material-ui/core/TextField'
import Layout from '../components/Layout'
import { authLogin } from '../stores/actions/auth'

function login(props) {
  const route = useRouter()
  const [id, setID] = useState("")
  const [pw, setPW] = useState("")
  const [token, setToken] = useState(null)
  
  useEffect(() => {
    if (props.token !== 'fail') {
      route.push("/")
    }
  })
  const onSubmit = (e) => {
    e.preventDefault()
    props.login(id, pw)  
  }

  return (
    <Layout>
      <div className="login">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="input">
            <TextField label="ID" variant="outlined" fullWidth={true}
              onChange={e => setID(e.target.value) } ></TextField>
          </div>
          <div className="input">
            <TextField label="PASSWORD" type="password" variant="outlined" fullWidth={true}
              onChange={e => setPW(e.target.value) } ></TextField>
          </div>

          <input type='submit' className="login-btn" value='LOGIN'/>
        
        </form>

        <div className="login-other">
          <div className="password-change"><a>비밀번호 재설정</a></div>
          <div className="signup"><a>회원가입</a></div>
        </div>
        
        <div className="social-login">
          <h2>SNS계정으로 간편 로그인/회원가입</h2>
          <img src="/imgs/google.svg" alt=""></img>
          <img src="/imgs/kakao.svg" alt=""></img>
        </div>

      </div>
      <style jsx>{`
        .login {
          margin : 0 auto;
          width : 300px;
          margin-top : 250px;
        }

        .input {
          padding-top : 7px;
          width : 100%;
        }

        .login-btn {
          margin-top : 10px;
          background-color : #3b5998;
          width : 100%;
          height : 50px;
          color : #fff;
          border : none;
        }

        .login-other {
          margin-top : 30px;
          text-align : center;
        }
        
        .login-other > div{
          display : inline-block;
          margin-right : 20px;
          font-size : 15px;
          color : #999;
          cursor : pointer;
        }
        .login-other > div::hover {
          color : #3b5998;
        }

        .social-login {
          margin-top : 20px;
          text-align : center;
        }
        .social-login > h2{
          margin-bottom : 20px;
          font-size : 14px;
          font-weight : 400;
          color : #999;
        }
        .social-login > img {
          margin-right : 20px;
          width : 52px;
          cursor : pointer;
        }
        .social-login > img:hover {
          opacity : 0.8;
        }

        `}</style>
        
    </Layout>
  )
}

const mapReduxDispatchToReactProps = dispatch => {
  return {
    login : (id, pw) => dispatch(authLogin(id, pw))
  }
}

const mapReduxStateToReactProps = state => {
  return {
    token : state.auth.token,
    id : state.auth.id
  }
}

export async function getServerSideProps (ctx) {
  return {
    props : {
    }
  }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(login);
