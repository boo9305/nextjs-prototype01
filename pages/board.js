import React, {useState, useEffect} from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { postList } from '../stores/actions/post'
import { default_url } from '../stores/url'

import axios from 'axios'

import Layout from '../components/Layout'
import Board from '../components/Board'

function board(props) {
  let max_page = 5;
  const [posts , setPosts] = useState([])
  const [count, setCount] = useState(0)
  const [totalPage , setTotalPage] = useState(0)
  const [pageArr, setPageArr]  = useState([]);
  
  const setPageArrFunc = (count) => {
    let total_page = Math.ceil(count / max_page);
   
    let _pageArr = []
    let page = props.router.query.page;

    let start_page = parseInt((page - 1) / (max_page)) * max_page + 1;
    let end_page = start_page + max_page - 1;
    for (let i = start_page; i <= end_page ; i++) {
      if (i > total_page) break;
      _pageArr.push(i)
    }
    setTotalPage(total_page)
    setPageArr(_pageArr)
  }

  const fetchPostList = () => {
    axios.get(default_url + `/boards/post/`, { params : {
      page : props.router.query.page , 
      page_size : max_page , 
      board : props.router.query.board_id }}
    ).then((res) =>{
      setCount(res.data.count)
      setPosts(res.data.results)
      setPageArrFunc(res.data.count)
    }).catch(() => {
    })
  }

  const fetchSearch = () => {
    axios.get(default_url + '/boards/search/', { params : {
      page : props.router.query.page , 
      board : props.router.query.board_id,
      search : props.router.query.search,
      type : 'title',
      page_size : max_page,
    }}
    ).then((res) =>{
      setCount(res.data.count)
      setPosts(res.data.results)
      setPageArrFunc(res.data.count)
    }).catch(() => {
    })
  }

  const onSearchSubmit = (e, searchText) => {
    e.preventDefault()
    props.router.push({
      pathname : props.router.pathname,
      query : {
        board_name : props.router.query.board_name,
        board_id : props.router.query.board_id,
        search : searchText,
      }
    })
    //fetchSearch()
  }

  useEffect(() => {
    if (Object.keys(props.router.query).length == 0) return;

    if (props.router.query.search) {
      fetchSearch();
    } else {
      fetchPostList()
    }
  }, [props.router])

  return (
    <Layout>
      <div className="board">
        {
          <Board 
            posts={posts} 
            board_name={props.router.query.board_name}
            board_id={props.router.query.board_id}
            page={props.router.query.page} 
            pageArr={pageArr}
            count={count} 
            total_page={totalPage}
            onSearchSubmit={onSearchSubmit}
            search={props.router.query.search}
          />
        }
      </div>
      <style jsx>{`
        
        `}</style>
    </Layout>
  )
}

const mapReduxStateToReactState = state => {
  return {
    token : state.auth.token
  }
}

export default withRouter(connect(mapReduxStateToReactState, null)(board));
