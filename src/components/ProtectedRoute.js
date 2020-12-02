import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  console.log(`ProtectedRoute: ${localStorage.isLogin}`);
  return (
    <Route>
      { () => localStorage.isLogin ? <Component {...props} /> : <Redirect to="/" /> }
    </Route>
  )
}

export default ProtectedRoute;