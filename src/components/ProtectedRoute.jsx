import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

// Protected Route Verifies the JWT Token

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Redirect to="/login" />; // If no JWT Token then simply redirects to login
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
