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
import Logout from './containers/Auth/Logout';
import MainPage from './containers/MainPage/MainPage';

class App extends Component {

  componentWillMount () {
    this.props.onTryAutoSignin()
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/newclient" component={NewClient} />          
            <Route path="/quotes" component={Quotes} />
            <Route path="/newnewquote" component={NewNewQuote} key="newnewquote" />
            <Route path="/editquote" exact component={NewNewQuote} key="editquote" />
            <Route path="/pdfquote" exact component={PDFView}/>
            <Route path="/logout" exact component={Logout}/>
            <Route path="/" exact component={MainPage} />
            <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
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
