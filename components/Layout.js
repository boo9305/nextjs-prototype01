import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

import SideMenu from '../components/SideMenu'
import { authCheck , authLogout} from '../stores/actions/auth'

function Layout(props) {
  const listObj = [
    { "name" : "홈" , "url" : "/"},
    { "name" : "자유 게시판" , "url" : "/board" , 'query' : { board : 1 } },
    { "name" : "공지사항" , "url" : "/board" , 'query' : { board : 2 } },
    { "name" : "글쓰기" , "url" : "/boardCreate"},
  ]
  const sideWidth = "200px"

  useEffect(() => {
    console.log(props.token, props.id)
    props.authCheck();
  }, [])

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
    id : state.auth.id
  }
}
const mapReduxDispatchToReactProps = (dispatch) => {
  return {
    authCheck : () => dispatch(authCheck()),
  }
}

export default connect(mapReduxStateToReactProps , mapReduxDispatchToReactProps)(Layout)
