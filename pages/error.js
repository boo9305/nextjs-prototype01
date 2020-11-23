import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { useRouter } from 'next/router' 
import Link from 'next/link'

import Layout from '../components/Layout'

function error(props) {
  const route = useRouter()
  const [msg ,setMsg ] = useState("") 

  useEffect(() => {
    if ( route.query.err === 'auth' ) {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
    }
  })

  return (
    <Layout>
      <div className="error">
        {props.token}
        {props.id}
        {
          route.query.err ==='auth' &&
            <div>
              <Link href="/login"><a>로그인</a></Link> <h2>이 필요한 서비스입니다.</h2>
            </div>
        }
      </div>
      <style jsx>{`
        .error {
          margin : 0 auto;
          width : 300px;
          margin-top : 100px;
        }
        

        .error > div > a, h2 {
          display : inline;
          font-size : 15px;
          font-weight : 500;
          color : #999;
        }
        .error > div > a {
          text-decoration : none;
          color : red
        }


        `}</style>
        
    </Layout>
  )
}

const mapReduxStateToReactProps = (state) => {
  return {
    token : state.auth.token ,
    id : state.auth.id
  }
}

export default connect(mapReduxStateToReactProps, null)(error);
