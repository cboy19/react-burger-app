import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import Aux from '../../hoc/Aux/Aux';
import Burger from  '../../components/Burger/Burger';
import axios from '../../axios-order';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Order from '../../components/Burger/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


const BurgerBuilder = props => {

    const [totalPrice, settotalPrice] = useState(4);
    const [purchasing, setpurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    },[])

    const purchaseHandler = () => {
        if (props.isAuthenticated){
            setpurchasing(true);
        } else {
            props.onRedirectPath("/checkout");
            props.history.push("/auth");
        }

    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
                          .map(igkey => {
                            return ingredients[igkey];
                          })
                          .reduce((sum, el) => {
                              return sum + el;
                          }, 0);
        //this.setState({purchase: sum > 0});  
        return sum > 0;                
    }

/*     addIngredients = (type) => {
        const updatedIngd = {
            ...this.state.ingredients
        }
        updatedIngd[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngd,
            totalPrice: newPrice
        }); 
        this.updatePurchaseState(updatedIngd);
    }

    removeIngredients = (type) => {
        const updatedIngd = {
            ...this.state.ingredients
        }
        if(this.state.ingredients[type] <= 0){ return }
        updatedIngd[type] = this.state.ingredients[type] - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngd,
            totalPrice: newPrice
        }); 
        this.updatePurchaseState(updatedIngd);
                                            
    }    */
    
    const purchaseCancelHandler = () => {
        setpurchasing(false);
        settotalPrice(4);
    }

    const purchaseContinueHandler = () => {
            props.onInitPurchase();
            const queryParams = [];
        //    for (let i in this.state.ingredients){
       //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        //    }
            queryParams.push('price=' + totalPrice);
            const queryString = queryParams.join('&');
            props.history.push({
                pathname: '/checkout',
                search: '?' + queryString
            });
    }

        const disableControls = {
            ...props.ings
        }; 
        for(let key in disableControls){
            disableControls[key] = disableControls[key] <= 0
        }

        let orderSummary = null;       
        let burger = props.error ? <p>Cannot load Ingredients</p> : <Spinner/>;

        if (props.ings){
            burger = ( 
                <Aux>
                    <Burger ingredients={props.ings}/>
                    <BuildControls 
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemove={props.onIngredientRemove}
                    disable={disableControls}
                    purchase={updatePurchaseState(props.ings)}
                    price={props.tot}
                    isAuth={props.isAuthenticated}
                    orderNow={purchaseHandler}/>
                </Aux>
                 );

            orderSummary = <Order ingredients={props.ings} 
            price={props.tot}
            continue={purchaseContinueHandler}
            cancel={purchaseCancelHandler}/>;      
        }

        return(
            <Aux>
                <Modal show={purchasing} modelClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }



const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.add_ingredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actions.remove_ingredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))

    };
   
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        tot: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));