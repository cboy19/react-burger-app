import React from 'react';
import classes from './Burger.module.css';
import BurgerIngd from './BurgerIngd/BurgerIngd';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
                                    .map(igKey => {
                                        return [...Array(props.ingredients[igKey])].map((_,i) => {
                                           return <BurgerIngd key={igKey + i} type={igKey} />
                                        });
                                    })
                                    .reduce((arr, el) => {
                                        return arr.concat(el);
                                    }, []);  
    if (transformedIngredients.length === 0)     {
        transformedIngredients = <p> please add ingredients!!!</p>
    }                           

    return (
        <div className={classes.Burger}>
            <BurgerIngd type="bread-top"/>
            {transformedIngredients}
            <BurgerIngd type="bread-bottom"/>
        </div>
    );
}

export default burger;