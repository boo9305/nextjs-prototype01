import React, {useState, useRef, useEffect} from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

import axios from 'axios'

import Layout from '../components/Layout'

function boardCreate(props) {
  const router = useRouter()
  let title = null
  let sn = null

  const onHandleClick = () => {
    var content = $('#summernote').summernote('code')
    
    if (props.token != null) {
      axios.defaults.headers = {
        'Content-Type' : 'application/json',
        Authorization : `Token ${props.token}`
      }
      axios.post('http://3.34.100.138:8000/boards/post/', {
        title : title.value,
        content : content
      }).then((res) => {
        router.push('/board')
      }).catch((err) => {
        router.push({ pathname : '/error' , query : { err : "auth" } })   
      })
    }
  }

  useEffect(() =>{
    if (props.token == 'fail') {
        router.push({ pathname : '/error' , query : { err : "auth" } })   
    }
    $('#summernote').summernote({ height : 300, });
    $('.note-statusbar').hide()
  })

  //<SummerNote></SummerNote>
  return (
    <Layout>
      { props.token !== null && 
          <div className="board-create">
            <div className='title'>
              <input ref={ref => title = ref } type="text" placeholder="제목"></input>
            </div>

            <div ref={ref => sn = ref} id="summernote"></div>
            <button onClick={onHandleClick}>save</button>
          </div>
      }
      <style jsx>{`
        .board-create {
          margin : 50px;
        }
        .title {
          margin-top : 10px;
          padding: 10px 0 20px 0;
          border-top : 1px solid #dfdfdf
        }
        .title > input{
          width : 100%;;
          border : none;
        }

        .title > input:focus{
          outline : none;
        }
        `}</style>
    </Layout>
  )
}

const mapReduxStateToReactProps = state => {
  return {
    token : state.auth.token
  }
}

export default connect(mapReduxStateToReactProps, null)(boardCreate);
