import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import NewClient from './containers/QuoteCreator/Client/NewClient/NewClient';
import NewNewQuote from './containers/QuoteCreator/Quote/NewNewQuote'
import Quotes from './containers/QuoteCreator/Quote/Quotes/Quotes';
import PDFView from './containers/QuoteCreator/Quote/PDF/PDFView';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/newclient" component={NewClient} />
          <Route path="/quotes" component={Quotes} />
          <Route path="/newnewquote" component={NewNewQuote} />
          <Route path="/pdfquote" exact component={PDFView}/>
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default withRouter(App);
