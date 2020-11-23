import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

import Link from 'next/link'
import Button from '@material-ui/core/Button';
import { authLogout } from '../stores/actions/auth'

function SideMenu(props) {
  const router = useRouter()

  const onLogoutClick = () => {
    props.authLogout()
    router.push("/")
  }

  return (
    <div className="side-menu">
      <ul>
        { props.id !== null ? 
            <li>{props.id}님 반갑습니다</li>
            :
            <li><Link href="/login"><a>로그인해주세요.</a></Link></li>
        }
        { 
          props.id !== null && <li><a onClick={() => onLogoutClick()}>로그아웃</a></li>
        }

        {
          props.listObj.map((item, index) => 
            <li key={index}>
              <Link href={{ 
                pathname : item['url'],
                query : item['query']
              } }><a>{item['name']}</a></Link>
            </li>
          )
        }
      </ul>
      
      <style jsx>{`
        ul, li {
          list-style : none;
          padding : 0;
          margin : 0;
        }
        .side-menu {
          overflow : scroll-y;
          position : fixed;
          top : 0px;
          left: 0px;
          width : ${props.width};
          height : 100vh;
          border-right : 1px solid #dfdfdf;
          background-color : #333;
        }

        .side-menu > ul  {
          margin-top : 30px;
        }
        
        .side-menu > ul > li {
          padding : 10px 0 10px 10px;
          color : #aaa;
        }
        
        .side-menu > ul > li > a {
          font-size : 15px;
          font-weight : 400;
          color : #999;
        }
        `}</style>
    </div>
  )
}

const mapReduxStateToReactProps = (state) => {
  return {
    token : state.auth.token ,
    id : state.auth.id
  }
}

const mapReduxDispatchToReactProps = (dispatch) => {
  return {
    authLogout : () => dispatch(authLogout())
  }
}

export default connect(mapReduxStateToReactProps , mapReduxDispatchToReactProps)(SideMenu);
