import React, {useState} from 'react'
import { connect } from 'react-redux'
import { postList } from '../stores/actions/post'

import axios from 'axios'

import Layout from '../components/Layout'
import Board from '../components/Board'

function board(props) {
  return (
    <Layout>
      <div className="board">
        {
          props.posts !== undefined ?
            <Board 
              posts={props.posts} 
              board_name={props.board_name}
              board_id={props.board_id}
              count={props.count} 
              page={props.page} 
              total_page={props.total_page}
              max_page={5}>
            </Board>
            :
            null
        }
      </div>
      <style jsx>{`
        
        `}</style>
    </Layout>
  )
}

export async function getServerSideProps (ctx) {
  let page = 1
  let board_id = ctx.query.board_id
  let board_name = ctx.query.board_name

  if (ctx.query.page !== undefined && ctx.query.page !== "") {
    page = ctx.query.page 
  }

  let resp = await  axios.get('http://3.34.100.138:8000/boards/post/', { params : {page : page , board : board_id }})

  return { props : {
    'posts' : resp.data.posts , 
    'count' : resp.data.count, 
    'total_page' : resp.data.total_page ,
    'page' : page,
    'board_name' : board_name,
    'board_id' : board_id,
  } }
}

const mapReduxStateToReactState = state => {
  return {
    token : state.auth.token
  }
}

export default connect(mapReduxStateToReactState, null)(board);
