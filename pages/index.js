import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'
import { authLogin, authLogout } from '../stores/actions/auth'

const items = [
  ['1-1', '1-2', '1-3' ],
  ['2-1', '2-2' ],
  ['3-1' ],
]


function Home(props) {
  const [toggle, setToggle] = useState([false, false])
  const onHandleClick = (e, item, index) => {
    let tog = Array.from(toggle)

    if (tog[index] == false) {
      let l = item.length;
      e.target.style.height = 25 * l + 'px' 
      tog[index] = true;
      setToggle(tog)
    } else {
      e.target.style.height = '25px' 
      tog[index] = false;
      setToggle(tog)
    }

  }

  const onHandleClick2 = () => {
    if (Notification) {
      Notification.requestPermission()
      alert(Notification.permission)
    }


  }

  useEffect(() => {
  })

  return (
    <Layout>
      <div className="home">
        <div className="home-top">
          <button value="button" onClick={onHandleClick2}>Button</button>
        </div>

        <div className="home-bottom">
          

          <ul className="default-list">
            {
              items.map((item, index) =>
                <li className="item" onClick={(e) => onHandleClick(e, item, index)}>
                  {index}
                  {
                    item.map((sub_item, sub_index) => {
                      return <div>{sub_item}</div>
                    })
                  }
                </li>
              )
            }

          </ul>
        </div>

      </div>
      <style jsx>{`
        .home {
          
        } 

        .item {
          border : 1px solid black;
          transition : all 0.5s;
          height : 25px;
          line-height : 25px;
          overflow : hidden;
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
