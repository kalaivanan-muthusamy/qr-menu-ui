import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Restaurants from "./pages/restaurants/index";
import Login from "./pages/restaurants/Login";
import Registration from "./pages/restaurants/Registration";
import Dashboard from "./pages/restaurants/Dashboard/index";
import Foods from "./pages/restaurants/Foods/index";
import Categories from "./pages/restaurants/Categories/index";
import Branches from "./pages/restaurants/Branches/index";
import Logout from "./pages/restaurants/Logout";
import Menu from "./pages/menu/index";
import Sessions from "./pages/restaurants/sessions/index";
import OrderReports from "./pages/restaurants/reports/index";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("accessToken") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/restaurants", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/restaurants">
          <Restaurants />
        </Route>
        <Route exact path="/restaurants/login">
          <Login />
        </Route>
        <Route exact path="/restaurants/signup">
          <Registration />
        </Route>
        <Route exact path="/restaurants/dashboard">
          <Dashboard />
        </Route>
        <PrivateRoute path="/restaurants/foods" component={Foods} />
        <PrivateRoute path="/restaurants/categories" component={Categories} />
        <PrivateRoute path="/restaurants/branches" component={Branches} />
        <PrivateRoute path="/restaurants/sessions" component={Sessions} />
        <PrivateRoute
          path="/restaurants/order-reports"
          component={OrderReports}
        />
        <PrivateRoute path="/restaurants/logout" component={Logout} />
        <Route path="/menu/:restaurantId/:branchId">
          <Menu />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
