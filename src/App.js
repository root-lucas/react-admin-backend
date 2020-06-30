import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { adminRoutes } from './routes/index'
import Frame from './components/Frame/Index'
import { isLogined } from './utils/auth';

import './App.css'

function App() {
  // 三目运算符检查用户是否登录进行页面跳转
  return (isLogined() ? (
    <Frame>
      <Switch>
        {
          adminRoutes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={routeProps => {
                  return <route.component {...routeProps} />
                }}
              />
            )
          })
        }
        <Redirect to={adminRoutes[0].path} from='/admin' />
        <Redirect to='/404' />
      </Switch>
    </Frame>) : (<Redirect to='/login' />)
  );
}

export default App;
