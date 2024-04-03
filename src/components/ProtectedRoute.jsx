import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get("jwt_token");
  console.log(jwtToken);
  console.log(props);
  if (jwtToken === undefined) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
