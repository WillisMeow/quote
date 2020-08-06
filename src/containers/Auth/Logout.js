import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import { Redirect, withRouter } from 'react-router-dom';

class Logout extends Component {

    componentDidMount () {
        this.props.onAuthLogout()
    }

    render () {
        let redirect = null;
        if (!this.props.isAuthenticated) {
            redirect = (
                <div>
                    <Redirect to='/' />
                </div>
            )
        }
        return (redirect)
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthLogout: () => dispatch(actionCreators.authLogout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout))