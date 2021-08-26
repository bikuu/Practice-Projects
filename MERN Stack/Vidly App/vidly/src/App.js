import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Movies from "./Components/movies";
import Customers from "./Components/Customers";
import Rentals from "./Components/Rentals";
import MovieForm from "./Components/MovieForm";
import LoginForm from "./Components/loginForm";
import Register from "./Components/registerForm";
import Logout from "./Components/logout";
import auth from "./Services/authServices";
import ProtectedRoute from "./Components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <main className="container">
        <Navbar user={user} />
        <Switch>
          <Redirect from="/" to="movies" exact />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route path="/movies/new" component={MovieForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </main>
    );
  }
}

function NotFound() {
  return <h1>NotFound</h1>;
}

export default App;
