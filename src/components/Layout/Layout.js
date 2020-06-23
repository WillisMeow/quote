import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosed = () => {
        this.setState({showSideDrawer : false})
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer}
        });
    };

    render () {
        return (
            <>
                <Toolbar
                    // add isAuth
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    // add isAuth
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosed}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

export default Layout;