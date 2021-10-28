import React from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { AuthRoot } from '../../../config/api';
import Spinner from '../Spinner/Spinner';
import Home from '../../../pages/Home/Home'

interface PrivateRouteProps extends RouteProps {
  component: any;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  const { isAuthenticated } = useSelector(
    (state: any) => {
      return {
        isAuthenticated: state.auth.token,
        // isAuthenticated: "YES"   //TEMPORARY MODIFIED FOR ADDING DUMMY DATA. Remove this and uncomment previous line when integrating with backend.
      };
    }
  );

  if (isAuthenticated === '') {
    return (<Home />);
  } else {
    return (
      <Route
        {...rest}
        render={(routeProps) => {
          if (isAuthenticated) {
            return (<Component {...routeProps} />)
          }
          window.location.replace(`${AuthRoot}auth/login?redirect_to=${window.location.href}`)
          return null;

          // : (
          //   <Redirect
          //     to={{
          //       pathname: `https://staging.accounts.excelmec.org/auth/login?redirect_to=http://localhost:3000${routeProps.location}`,
          //       state: { from: routeProps.location }
          //     }}
          //   />
        }
        }
      />
    );
  }
};

export default PrivateRoute;