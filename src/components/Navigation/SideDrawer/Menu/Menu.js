import React from 'react';
import classes from './Menu.module.css';

const menu = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default menu;