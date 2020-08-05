import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './MainPage.module.css'
import Auth from '../Auth/Auth';

class MainPage extends Component {
    render () {
        let component = <Auth />
        if (this.props.isAuthenticated) {
            component = <Redirect to="/quotes" />
        }
        return (
            <div className={classes.Main}>
                <h2 className={classes.Header}>Please Login to use App</h2>
                {component}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(MainPage)