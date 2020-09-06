import React, { Component } from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Ordercheckout/CheckoutSummar/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

const Checkout = props => {
 /*   state ={ ingredients: null,
             price: 0
            }
     componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            // ['salad', '1']
            if(param[0] === 'price'){
                price = param[1];
            }else {
            ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ingredients: ingredients, price: price});
    } */



    const cancelHandler = () => {
        props.history.goBack();
    }   
    
    const continueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }   
    
        let summary = <Redirect to="/"/>
        if(props.ings){
            const purchaseRedirect = props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                {purchaseRedirect}    
                <CheckoutSummary ingredients={props.ings}
                                 cancel={cancelHandler}
                                 continue={continueHandler}
                />
                <Route path={props.match.path + '/contact-data'} 
                       component={ContactData}
                                        />                     
                </div>                        
            );
        }
        return (
            <div>
                {summary}
                {/* <Route path={this.props.match.path + '/contact-data'} 
                       render={(props) => (<ContactData  ingredients={this.props.ings} 
                                                    price={this.props.tot} {...this.props}
                                        />)}/> */}
                                   
            </div>
        );
    }

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased:  state.order.purchased
    };
}


export default connect(mapStateToProps)(Checkout);