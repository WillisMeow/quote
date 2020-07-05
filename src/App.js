import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import QuoteCreator from './containers/QuoteCreator/QuoteCreator';
import NewClient from './containers/QuoteCreator/Client/NewClient/NewClient';
import NewQuote from './containers/QuoteCreator/Quote/NewQuote';
import Quotes from './containers/QuoteCreator/Quote/Quotes';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/newclient" component={NewClient} />
          <Route path="/newquote" component={NewQuote} />
          <Route path="/quotes" component={Quotes} />
          <Route path="/" exact component={QuoteCreator} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default withRouter(App);
