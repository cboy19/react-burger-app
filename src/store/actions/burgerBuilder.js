import * as actionTypes from './actionTypes';

export const add_ingredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const remove_ingredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};


export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };    
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    };    
}



export const initIngredients = () => {
/*     return dispatch => {
        axios.get('https://react-my-burger-884f9.firebaseio.com/Ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed);
            });
    } */

    return{
        type: actionTypes.INIT_INGREDIENTS
    };
}