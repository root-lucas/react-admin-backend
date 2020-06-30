import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css'
import App from './App';
import { mainRoutes } from './routes/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      {/* 访问所有以/admin开头的路由的时候都以app组件进行渲染 */}
      <Route path="/admin" render={routeProps => <App {...routeProps} />} />
      {
        mainRoutes.map(route => {
          // return <Route key={route.path} path={route.path} component={route.component} />
          return <Route key={route.path} {...route} />
        })
      }
      <Redirect to='/404' />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
