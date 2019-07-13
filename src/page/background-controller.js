import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
class BackgroundController extends React.Component {
  render() {
    // 这里需要查询localStoge的token
    // 向后台查询是否正确
    // 然后返回之后调用redux进行更新isAuthenticated
    let isAuthenticated = false;
    return (
      <Route 
        render = { props => 
          isAuthenticated ? (
            <div>Home</div>
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}
export default BackgroundController;