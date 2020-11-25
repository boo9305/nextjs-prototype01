import React, {useState, useEffect} from 'react'
import Link from 'next/link'

export default function Board(props) {
  const [ pageArr, setPageArr]  = useState([]);
  let max_page = props.max_page;

  useEffect(() => {
    console.log("board", props)
    let _pageArr = []
    let start_page = parseInt((props.page - 1) / (max_page)) * max_page + 1;
    let end_page = start_page + max_page - 1;

    console.log(start_page, end_page)
    for (let i = start_page; i <= end_page ; i++) {
      if (i > props.total_page) break;
      _pageArr.push(i)
    }
    setPageArr(_pageArr)

  }, [props.page])

  return (
    <div className="board">
      <div className="board-top">
        <h1>{props.board_name}</h1>
        <div className="board-create-btn">
          <Link href={{ pathname : '/boardCreate', query : { board_name : props.board_name, board_id : props.board_id} } }><a>글쓰기</a></Link>
        </div> 
      </div>
      <ul>
        {
          props.posts.map((item, index) => 
            <li key={index}>
              <div className="comment">
                <img src="/comment.svg" alt=""></img>
                <p>{ item['comments_count'] }</p>
              </div>
              <Link href={{
                pathname : "/boardDetail/",
                query : { pk : item['id'] }
              }}>
                <a draggable='false'>
                  <p>{ item['title'] }</p> 
                </a>
              </Link>

              <div className='post-bottom'>
                <p className='author'> 작성자 : { item['author'] }</p>
                <p className='date'> 날짜 : { item['create_at']} </p>
                <img className="view" src="/imgs/view.svg" alt=""></img>
                <p>{item['views']}</p>
                <img className="like" src="/imgs/like.svg" alt=""></img>
                <p>{item['likes_count']}</p>
              </div>
            </li>
          )
        }
      </ul>


      <div className="board-page">
        <ul>
          { props.page - 1 > 0 ?
              <li>
                <Link href={{ pathname : "/board/" , query : { page : parseInt(props.page) - 1 }}}>
                  <a>&lt;</a>
                </Link>
              </li>
              :
              <li></li>
          }
          {
            pageArr.map((item, index) =>
              <li key={index} >
                <Link href={{ pathname : "/board/" , query : { page : item }}}>
                  <a className={ item == props.page && 'active' } >{item}</a>
                </Link>
              </li>
            )
          }
          {
            props.page < props.total_page ?
              <li>
                <Link href={{ pathname : "/board/" , query : { page : parseInt(props.page) + 1 }}}>
                  <a>&gt;</a>
                </Link>
              </li>
              :
              <li></li>
          }
        </ul>
      </div>
      <style jsx>{`
        a {
          text-decoration : none;
        }
        ul, li {
          list-style : none;
          padding : 0;
          margin : 0;
        }

        .board {
          width : 1000px;
          height : 500px;
          margin : 40px;
        }
        
        .board-top {
          border-bottom : 1px solid black;
          height : 50px;
        }
        
        .board-top > h1 {
          float : left;
          font-size : 22px;
          font-weight : 500;
          line-height : 50px;
          color : #555;
        }
        .board-create-btn > a{
          margin : 5px;
          padding : 5px 10px 5px 10px;
          float : right;
          border : 1px solid #dfdfdf;
          color : #ff5656;
        }

        
        .board > ul > li {
          padding-bottom : 20px;
          border-bottom : 1px solid #dfdfdf;
        }
        
        .board > ul > li > a {
          font-size : 14px;
          font-weight : 500;
          padding : 10px 10px 10px;
          cursor : pointer;
          white-space : nowrap;
        }
        .board > ul > li > a > p {
          overflow: hidden;
          text-overflow : ellipsis;
          width : 95%;
        }
        
        .board > ul > li > a:hover {
          color : #3b5998;
        }
        
        .post-bottom > p {
          display : inline-block;
          margin-left : 10px;
          font-size : 14px;
          font-weight : 400;
          color : #666;
        }
        
        .post-bottom > img {
          display : inline-block;
          margin-left : 10px;
        }

        .view {
          width : 18px;
          opacity : 0.6
        }

        .like {
          width : 14px;
          opacity : 0.8
        }
        
        .comment {
          float : right;
          margin-top : 10px;
          margin-right : 5px;
        }
        
        .comment > img{
          width : 30px;
          opacity : 0.55;
        }
        .board > ul > li > div > p{
          text-align : center;
          font-size : 12px;
          font-weight : 400;
          color : #666;
        }
        .board-page {
          margin : 30px 0 30px 0;
        }
        .board-page > ul {
          text-align : center;
        }
        .board-page > ul > li{
          display : inline-block;
          margin-left : 20px;
          width : 20px;
        }
        .active {
          color: red;
        }

        `}</style>
    </div>
  )
}
