import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    let navigationItems = null;
    if (props.isAuthenticated) {
        navigationItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem clicked={props.linkClicked} link="/newclient" exact>New Client</NavigationItem>
                <NavigationItem clicked={props.linkClicked} link="/newnewquote" exact>New New Quote</NavigationItem>
                <NavigationItem clicked={props.linkClicked} link="/quotes" exact>Quotes</NavigationItem>
                <NavigationItem clicked={props.linkClicked} link="/logout" exact>Logout</NavigationItem>
            </ul>
        )
    }
    return (navigationItems)
}

export default navigationItems;