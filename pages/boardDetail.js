import React, {useState, useEffect} from 'react'
import { withRouter , useRouter} from 'next/router'
import { connect } from 'react-redux'
import { default_url } from '../stores/url'

import axios from 'axios'
import Layout from '../components/Layout'
import BoardDetail from '../components/BoardDetail'


function boardDetail(props) {
  const router = useRouter();
  const [post, setPost] = useState(null)
  const [comments , setComments] = useState([])
  const [likes_count , setLikesCount] = useState(0)
  const [is_liked , setIsLiked] = useState(false)

  const fetchPost = () => {
    axios.defaults.headers = {
      'Content-Type' : 'application/json',
      Authorization : `Token ${props.token}`
    }
    axios.get(default_url + `/boards/post/${props.router.query.pk}/`, 
    ).then((res) => {
      console.log("boards/post : ", res.data)
      setPost(res.data)
      setComments(res.data.comment)
      setLikesCount(res.data.likes_count)
      setIsLiked(res.data.is_liked)
    }).catch((err) => {
      props.router.push({ pathname : '/error' , query : { err : "auth" } })   
    })

  }

  useEffect(() => {
    console.log(props.token, props.router.query.pk, process.browser)
    if (props.router.query.pk === undefined) {
      return;
    }

    if (props.isLogin === true) {
      fetchPost();
    } else {
        props.router.push({ pathname : '/error' , query : { err : "auth" } })   
    } 

  }, [props.isLogin, props.router])

  const onCommentClick = (content) => {
    if (props.token === null || props.token === 'fail') {
        return;
    }
    axios.defaults.headers = {
      'Content-Type' : 'application/json',
      Authorization : `Token ${props.token}`
    }
    axios.post(default_url + `/boards/comment/`, {
      content : content,
      post : `${props.router.query.pk}`
    }).then((res) => {
      //setComments(res.data)
      fetchPost()
    }).catch((err) => {
      props.router.push({ pathname : '/error' , query : { err : "auth" } })   
    })
  }

  const onLikeClick = () => {
    if (props.token === null || props.token === 'fail') {
        return;
    }

    axios.defaults.headers = {
      'Content-Type' : 'application/json',
      Authorization : `Token ${props.token}`
    }
    axios.get(default_url + `/boards/like/`, {
      params : {
        post : `${props.router.query.pk}`
      }
    }).then((res) => {
      setLikesCount(res.data.likes_count)
      setIsLiked(res.data.is_liked)
    }).catch((err) => {
    })
  }
  return (
    <Layout>
      <div className="board-detail">
        {
          post !== null &&
            <BoardDetail 
              post={post} 
              is_liked={is_liked} 
              likes_count={likes_count} 
              comments={comments} 
              onCommentClick={onCommentClick} 
              onLikeClick={onLikeClick}>
            </BoardDetail>
        }
      </div>
      <style jsx>{`
        .board-detail {
          margin : 50px;
        }

        `}</style>
    </Layout>
  )
}
const mapReduxStateToReactState = state => {
  return {
    token : state.auth.token,
    isLogin : state.auth.isLogin,
  }
}
export default withRouter(connect(mapReduxStateToReactState,null)(boardDetail));
