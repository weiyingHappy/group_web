/* global window */
import React from 'react'
import { connect } from 'dva'
import { Layout, General } from 'components'
import { classnames, config } from 'utils'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import '../themes/index.less'

const { openPages } = config
const { Header, Sider, styles, Bread } = Layout
const { Loader } = General
const App = ({ children, app, loading, location, dispatch }) => {
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const { user, router, siderFold } = app

  const switchSider = () => {
    dispatch({ type: 'app/switchSider' })
  }

  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }

  return (
    <div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      <Helmet>
        <title>cooke</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className={classnames(styles.layout, { [styles.fold]: siderFold })}>
        <div className={styles.sider}>
          <Sider router={router} siderFold={siderFold} />
        </div>
        <div className={styles.main}>
          <Header user={user} siderFold={siderFold} switchSider={switchSider} />
          <Bread router={router} />
          <div className={styles.container}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
