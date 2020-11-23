import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import axios from 'axios'

import Layout from '../components/Layout'
import BoardDetail from '../components/BoardDetail'


function boardDetail(props) {
  const router = useRouter()

  const [post, setPost] = useState(null)
  const [comments , setComments] = useState([])
  const [likes_count , setLikesCount] = useState(0)
  const [is_liked , setIsLiked] = useState(false)

  useEffect(() => {
    console.log(props.token, props.pk, process.browser)
    if (props.token !== null) {
      axios.defaults.headers = {
        'Content-Type' : 'application/json',
        Authorization : `Token ${props.token}`
      }
      axios.get(`http://3.34.100.138:8000/boards/post/${props.pk}/`, 
      ).then((res) => {
        console.log("boards/post : ", res.data)
        setPost(res.data.post)
        setComments(res.data.comments)
        setLikesCount(res.data.post.likes_count)
        setIsLiked(res.data.is_liked)
      }).catch((err) => {
        router.push({ pathname : '/error' , query : { err : "auth" } })   
      })
    } 

  }, [props.token])

  const onCommentClick = (content) => {
    if (props.token === null || props.token === 'fail') {
        return;
    }
    axios.defaults.headers = {
      'Content-Type' : 'application/json',
      Authorization : `Token ${props.token}`
    }
    axios.post(`http://3.34.100.138:8000/boards/comment/`, {
      content : content,
      post : `${props.pk}`
    }).then((res) => {
      setComments(res.data)
    }).catch((err) => {
      router.push({ pathname : '/error' , query : { err : "auth" } })   
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
    axios.get(`http://3.34.100.138:8000/boards/like/`, {
      params : {
        post : `${props.pk}`
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
  }
}

export async function getServerSideProps (ctx) {
  let pk = 1;
  if (ctx.query.pk !== undefined || ctx.query.pk !== "") pk = ctx.query.pk
  return {props : {'pk' : pk }}
}
export default connect(mapReduxStateToReactState,null)(boardDetail);
