import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { adminRoutes } from './routes/index'

function App() {
    return (
        <div>
            <h1>我是app组件</h1>
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
                <Redirect to='/404' />
            </Switch>
        </div>
    );
}

export default App;
