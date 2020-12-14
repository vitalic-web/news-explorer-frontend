import { Route, Redirect } from "react-router-dom";
import { useEffect } from 'react';

const ProtectedRoute = ({ component: Component, ...props }) => {
  useEffect(() => {
    if (!localStorage.isLogin) {
      props.openPopup();
    }
  }, [])

  return (
    <Route>
      { () => localStorage.isLogin ? <Component {...props} /> : <Redirect to="/" /> }
    </Route>
  )
}

export default ProtectedRoute;