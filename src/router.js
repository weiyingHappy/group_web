import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'
import { modelRoute } from 'router'
import { upperModle } from 'util'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  let routes = [
    {
      path: '/login',
      models: () => [],
      component: () => import('./routes/login/'),
    },
  ]

  console.log("app ",app)

  const getRouterObj = (item, action) => {
    return ({
      path: `/${item.model}/${action}/:id${item.cus ? `/${item.cus}` : ''}`,
      models: () => [import(`./models/${item.model}`)],
      component: () => import(`./routes/${item.model}/${upperModle(item.model)}${upperModle(action)}`),
    })
  }

  for (const i in modelRoute) {
    const item = modelRoute[i]
    if (item.nolist !== true) {
      routes.push(getRouterObj(item, 'list'))
    }
    if (item.noadd !== true) {
      routes.push(getRouterObj(item, 'add'))
    }
    if (item.nodetail !== true) {
      routes.push(getRouterObj(item, 'detail'))
    }
  }

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/login" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
