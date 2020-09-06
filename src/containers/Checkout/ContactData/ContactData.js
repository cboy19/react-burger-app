import React, { useState } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

const ContactData = props => {

 const [orderFrom, setorderFrom] =  useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                                },
                    value: '' ,
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false           
                  },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                                },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false              
                  },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                                },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 7
                    },
                    valid: false,
                    touched: false              
                  },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                                },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false              
                  },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                                },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false              
                  },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                                {value: 'fastest', displayValue: 'Fastest'},
                                {value: 'cheapest', displayValue: 'Cheapest'}
                             ]
                                },
                    value: 'fastest',
                    validation: {},
                    valid: true,            
                  }
                    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
       event.preventDefault();
       const formData = {};
       for (let formDataElement in orderFrom){
           formData[formDataElement] = orderFrom[formDataElement].value;
       }
       const order = {
          ingredients: props.ings,
          price: props.tot,
          orderData: formData,
          user: props.user          
       };
       props.onOrderBurger(order, props.token);
    }


    const checkValidity = (value, rules) => {
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

   const inputChnagedHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {
            ...orderFrom
        };

        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updateFormElement.value = event.target.value;
        updateFormElement.valid = checkValidity(updateFormElement.value, updateFormElement.validation )
        updateFormElement.touched = true;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        updatedOrderForm[inputIdentifier] = updateFormElement;
        setorderFrom(updatedOrderForm);
        setFormIsValid(formIsValid);

    }

        const formElementsArray = [];
        for (let key in orderFrom){
            formElementsArray.push({
                id: key,
                config: orderFrom[key]
            });
        }
        let form = (
            <form onSubmit={orderHandler}>
            {
                formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           invalid={!formElement.config.valid}
                           shouldValidate={formElement.config.validation}
                           touched={formElement.config.touched}
                           changed={(event) => inputChnagedHandler(event, formElement.id)}
                    />
                ))
            }
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
        );
        if(props.loading){
            form = <Spinner />
        }
        return (
                <div className={classes.ContactData}>
                    <h4>Enter Your Contact Details</h4>
                    {form}
                </div>
        );
    }

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        tot: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        user: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));