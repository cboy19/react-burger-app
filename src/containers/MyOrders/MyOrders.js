import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import ShowOrders from '../../components/Ordercheckout/ShowOrders/ShowOrders';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const MyOrders = props => {

    useEffect(()=>{
        props.onGetOrders(props.token, props.user);
    },[]);

        let orders = <Spinner />
        if (!props.loading){
            orders = props.orders.map(order => (
                <ShowOrders key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                />
                    ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }

const mapStateToProps = state => {
    return {
        orders: state.myOrder.orders,
        loading: state.myOrder.loading,
        token: state.auth.token,
        user: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: (token, user) => dispatch(actions.getOrders(token,user))
    };
};

export  default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(MyOrders, axios));