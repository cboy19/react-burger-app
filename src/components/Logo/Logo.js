import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classess from './Logo.module.css';

const logo = () => (
    <div className={classess.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;