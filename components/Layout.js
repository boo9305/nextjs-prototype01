import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

import SideMenu from '../components/SideMenu'
import { authCheck , authLogout} from '../stores/actions/auth'

function Layout(props) {
  const listObj = [
    { "board_name" : "홈" , "url" : "/"},
    { "board_name" : "자유 게시판" , "url" : "/board" , 'query' : { board_id : 1, page : 1} },
    { "board_name" : "공지사항" , "url" : "/board" , 'query' : { board_id : 2, page : 1 } },
  ]
  const sideWidth = "200px"

  useEffect(() => {
    console.log(props.token, props.id)
    props.authCheck();
  }, [props.isLogin])

  return (
    <div className="layout">
      <Head>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet"/>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      
        <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
      </Head>
      <SideMenu width={sideWidth} listObj={listObj}></SideMenu>
        {props.children}
      <style jsx global> {`
        .default-list {
          list-style : none;
          padding : 0;
          margin : 0;
        }

        `} </style>
      <style jsx>
        {`
          .layout {
            margin-left : ${sideWidth};
          }
          
          `}
      </style>
    </div>
  )
}

const mapReduxStateToReactProps = (state) => {
  return {
    token : state.auth.token ,
    id : state.auth.id,
    isLogin : state.auth.isLogin,
  }
}
const mapReduxDispatchToReactProps = (dispatch) => {
  return {
    authCheck : () => dispatch(authCheck()),
  }
}

export default connect(mapReduxStateToReactProps , mapReduxDispatchToReactProps)(Layout)
