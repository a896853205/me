import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
import HomeController from "./home-controller";
class BackgroundController extends React.Component {
  render() {
    // 这里需要查询localStoge的token
    // 向后台查询是否正确
    // 然后返回之后调用redux进行更新isAuthenticated
    let isAuthenticated = true;
    return (
      <Route 
        render = { props => 
          isAuthenticated ? (
            <HomeController />
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