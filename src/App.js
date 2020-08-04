import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from './store/actions/index';
import NewClient from './containers/QuoteCreator/Client/NewClient/NewClient';
import NewNewQuote from './containers/QuoteCreator/Quote/NewNewQuote'
import Quotes from './containers/QuoteCreator/Quote/Quotes/Quotes';
import PDFView from './containers/QuoteCreator/Quote/PDF/PDFView';
import Auth from './containers/Auth/Auth';

class App extends Component {

  componentWillMount () {
    this.props.onTryAutoSignin()
  }

  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/newclient" component={NewClient} />
            <Route path="/auth" component={Auth} />
            <Route path="/quotes" component={Quotes} />
            <Route path="/newnewquote" component={NewNewQuote} key="newnewquote" />
            <Route path="/editquote" exact component={NewNewQuote} key="editquote" />
            <Route path="/pdfquote" exact component={PDFView}/>
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actionCreators.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
