import React, {useState} from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'
import { authLogin, authLogout } from '../stores/actions/auth'

function Home(props) {
  return (
    <Layout>
      <div className="home">
        <div className="home-top">
        </div>

      </div>
      <style jsx>{`
        .home {
          
        } 
        `}</style>
    </Layout>
  )
}

const mapReduxStateToReactProps = (state) => {
  return {
    token : state.auth.token
  }
}

const mapReduxDispatchToReactProps = (dispatch) => {
  return {
    login : () => dispatch(authLogin()),
    logout : () => dispatch(authLogout()) 
  }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Home);
