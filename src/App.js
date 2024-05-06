import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Home from "./components/home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRegister from "./components/Register/AdminRegister";
import UserRegister from "./components/Register/UserRegister";
import AdminLogin from "./components/Login/AdminLogin";
import UserLogin from "./components/Login/UserLogin";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ModifyProducts from "./components/ModifyProducts";
import AddProducts from "./components/AddProducts";
import UpdateProducts from "./components/UpdateProducts";
import DeleteProducts from "./components/DeleteProducts";

function App() {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/admin/register" component={AdminRegister} />
      <Route exact path="/user/register" component={UserRegister} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/admin/login" component={AdminLogin} />
      <Route exact path="/user/login" component={UserLogin} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/products" component={Products} />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <ProtectedRoute
        exact
        path="/modify-products"
        component={ModifyProducts}
      />
      <ProtectedRoute exact path="/add-products" component={AddProducts} />
      <ProtectedRoute
        exact
        path="/update-products"
        component={UpdateProducts}
      />
      <ProtectedRoute
        exact
        path="/delete-products"
        component={DeleteProducts}
      />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default App;
