import React, {useState, useEffect} from 'react'
import Link from 'next/link'

export default function BoardDetail(props) {
  const [comment, setComment] = useState("")

  useEffect(() => {
    $('#summernote').summernote('code', props.post['content']);
    $('#summernote').summernote('destroy');
  }, [props.comments])

  return (
    <div className="board-detail">
      <div className="post-header">
        <h1> {props.post['title']} </h1>
        <p> 작성자 : { props.post['author'] }</p>
        <p> 날짜 : { props.post['create_at']} </p>
        <p> 조회 : {props.post['views']} </p>
      </div>


      <div className="post-main">
        <div id="summernote">Hello Summernote</div>
      </div>

      <div className="post-like" onClick={() => {props.onLikeClick()}}>
        {
          props.is_liked ? 
          <img src="/imgs/like-ture.png" alt=""></img>
          :
          <img src="/imgs/like.svg" alt=""></img>
        }
        <p>{props.likes_count}</p>
      </div>

      <div className="comment">
        <p>댓글</p>
        <textarea placeholder="댓글을 입력해주세요." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <div className="comment-btn" onClick={(e) => {
          props.onCommentClick(comment)
          setComment("")
        } } >등록</div>
      </div>
      
      <div>
        <ul className='comment-list'>
          {
            props.comments.map((item, index) => {
              return ( 
                <li key={index}>
                  <div className='comment-top'>
                    <h3>{item.author}</h3>
                    <p>{item.content}</p>
                  </div>
                  <div className='comment-bottom' >
                    <p>{item.create_at}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>

      <style jsx>{`
        ul, li {
          list-style : none;
          margin : 0;
          padding : 0;
        }
        .board-detail {
          width : 1000px;
        }

        .post-header {
          padding : 10px 0 10px 0;
          border-bottom : 1px solid #dfdfdf;
        }

        .post-header > h1 {
          font-size : 18px;
          font-weight : 600;
          padding : 10px 0 10px 0;
        }
        
        .post-header > p {
          display : inline-block;
          padding-right : 20px;
          
          font-size : 15px;
          font-weight : 400;
          color : #666;
        }

        .post-main {
          padding : 30px 0 30px 0px;
          color : #333;
        }

        .post-like {
          text-align : center;
          margin : 0 auto;
          width : 100px;
          padding : 7px;
          border : 1px solid #aaa;;
          border-radius : 30px;
          cursor : pointer;
        }

        .post-like > img {
          display : inline-block;
          width : 25px;
          opacity : 0.4;
          margin-right : 10px;
        }
        
        .post-like > p {
          display : inline-block;
        }

        .comment > p {
          padding : 0 0 10px 0;
        }

        .comment > textarea {
          padding : 10px;
          width : 90%; 
          height : 90px;
          resize : none;
          border : 1px solid #999;
        }

        .comment-btn {
          float : right; 
          width : 10%;
          height : 90px;
          line-height : 85px;
          text-align : center;
          border : 1px solid #333;
          border-collapse : collapse;
          cursor : pointer;
        }

        textarea:focus {
          outline : none;
        }

        .comment-list {
          margin-top : 10px;
        }        
        
        .comment-list > li {
          padding : 15px 0 15px 0 ;
          border-bottom : 1px solid #dfdfdf;
        }
        
        .comment-top {
          
        }
        .comment-top > h3 {
          color : #999;
          font-size : 13px;
          margin : 5px 0 5px 0;
        }
        .comment-top > p {
          color : #333;
          font-size : 15px;
          min-height : 30px;
        }

        `}</style>
    </div>
  )
}
