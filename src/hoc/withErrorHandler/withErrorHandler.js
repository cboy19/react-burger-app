import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, setError] = useState(null);


             const reqinterceptor =  axios.interceptors.request.use(req => {
                setError(null);
                return req;
            });
            const resinterceptor = axios.interceptors.response.use(res => res, err => {
                setError(err);
            });
  

        useEffect(()=>{

            return () => {
                axios.interceptors.request.eject(reqinterceptor);
                axios.interceptors.response.eject(resinterceptor);
            };
        },[reqinterceptor,resinterceptor]);

       const errorConfirmedHandler = () => {
        setError(null);
        }

            return(
                <Aux>
                    <Modal show={error}
                           modelClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            );
        }
    }

export default withErrorHandler;