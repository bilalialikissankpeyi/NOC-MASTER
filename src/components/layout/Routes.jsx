import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../../pages/Dashboard'
import Customers from '../../pages/Customers'
import Analytics from '../../pages/Analytics'
import Details from '../../pages/DetailsPage'
import Ont from '../../pages/Ont'
import Actions from '../../pages/Actions'

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Dashboard} />
      <Route path='/customers' component={Customers} />
      <Route path='/analytics' component={Analytics} />
      <Route path='/actions' component={Actions} />
      <Route path='/ont' component={Ont} />
      <Route path='/Details' component={Details} />
    </Switch>
  )
}

export default Routes
