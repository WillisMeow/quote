import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import NewClient from './containers/QuoteCreator/Client/NewClient/NewClient';
import NewNewQuote from './containers/QuoteCreator/Quote/NewNewQuote'
import Quotes from './containers/QuoteCreator/Quote/Quotes/Quotes';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/newclient" component={NewClient} />
          <Route path="/newnewquote" component={NewNewQuote} />
          <Route path="/quotes" component={Quotes} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default withRouter(App);
