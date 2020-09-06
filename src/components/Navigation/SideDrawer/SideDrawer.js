import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachClass = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachClass = [classes.SideDrawer, classes.Open];
    }

    return(
        <Aux>
        <Backdrop show={props.open} clicked={props.close}/>
        <div className={attachClass.join(' ')} onClick={props.close}>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav><NavigationItems isAuthenticated = {props.isAuth}/></nav>
            
        </div>
        </Aux>
    );

};

export default sideDrawer;