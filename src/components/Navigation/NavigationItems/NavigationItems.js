import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem clicked={props.linkClicked} link="/newclient" exact>New Client</NavigationItem>
            <NavigationItem clicked={props.linkClicked} link="/newnewquote" exact>New New Quote</NavigationItem>
            <NavigationItem clicked={props.linkClicked} link="/quotes" exact>Quotes</NavigationItem>
            <NavigationItem clicked={props.linkClicked} link="/auth" exact>Auth</NavigationItem>
            {/* <NavigationItem link="/quotes" exact>Quotes</NavigationItem>
            <NavigationItem link="/authenticate" exact>Authenticate</NavigationItem> */}
        </ul>
    )
}

export default navigationItems;