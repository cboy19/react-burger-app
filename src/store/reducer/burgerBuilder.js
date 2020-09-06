import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const intialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false    
};

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.9,
    bacon: 1.0
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building: true
    };  
}

const reducer = (state = intialState, action) => {

    switch(action.type){
        case actionTypes.ADD_INGREDIENT:return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };                 
        default:return state;      

    }

};

export default reducer;