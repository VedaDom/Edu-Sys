import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, user, ...rest }) => {
    console.log('user', user);
    
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!user ? (
                    <RouteComponent {...routeProps} />
                ) : (
                        <Redirect to={'/login'} />
                    )
            }
        />
    );
};

export default PrivateRoute;