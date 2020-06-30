import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem clicked={props.linkClicked} link="/" exact>Quote Creator</NavigationItem>
            <NavigationItem clicked={props.linkClicked} link="/newclient" exact>New Client</NavigationItem>
            {/* <NavigationItem link="/quotes" exact>Quotes</NavigationItem>
            <NavigationItem link="/authenticate" exact>Authenticate</NavigationItem> */}
        </ul>
    )
}

export default navigationItems;