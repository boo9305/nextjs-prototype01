import React, {useState} from 'react'
import { connect } from 'react-redux'
import { postList } from '../stores/actions/post'

import axios from 'axios'

import Layout from '../components/Layout'
import Board from '../components/Board'

function board({posts, count, page, total_page}) {
  return (
    <Layout>
      <div className="board">
        {
          posts !== undefined ?
            <Board 
              posts={posts} 
              count={count} 
              page={page} 
              total_page={total_page}
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

  if (ctx.query.page !== undefined && ctx.query.page !== "") {
    page = ctx.query.page 
  }

  let resp = await  axios.get('http://3.34.100.138:8000/boards/post/', { params : {page : page , board : ctx.query.board }})

  return { props : {
    'posts' : resp.data.posts , 
    'count' : resp.data.count, 
    'page' : page,
    'total_page' : resp.data.total_page }}
}

const mapReduxStateToReactState = state => {
  return {
    token : state.auth.token
  }
}

export default connect(mapReduxStateToReactState, null)(board);
