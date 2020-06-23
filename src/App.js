import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import QuoteCreator from './containers/QuoteCreator/QuoteCreator';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" component={QuoteCreator} />
        </Switch>
      </Layout>
    </div>
  );
}

export default withRouter(App);
