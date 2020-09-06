import React, {useState} from 'react';
import {connect} from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => { 

    const [showSideDrawer, setshowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setshowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setshowSideDrawer(!showSideDrawer);        
    }

    return(
    <Aux>
        <Toolbar 
            isAuth={props.isAuthenticate}
            clicked={sideDrawerToggleHandler}/>
        <SideDrawer 
                    isAuth={props.isAuthenticate}
                    open={showSideDrawer} 
                    close={sideDrawerClosedHandler}/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>

);
}


const mapStateToProps = state => {
    return {
        isAuthenticate: state.auth.token != null
    };
};

export default connect(mapStateToProps)(Layout);