import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { storeCategoriesNames } from "../store/actions/categoriesActions";
import Cart from "./Cart";
import Category from "./Category";
import Nav from "./Nav";
import Product from "./Product";
import BallsLoader from "../styledComponents/BallsLoader";
import NotFound from "./NotFound";
import { DisplayError } from "../styledComponents/General.styled";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "$",
      error: null,
    };
  }

  componentDidMount() {
    setTimeout(
      () =>
        //store categories names for displaying in navBar dynamically
        storeCategoriesNames(this.props.dispatch).then(
          (res) => res?.message && this.setState({ error: res.message })
        ),
      2000
    );
  }
  render() {
    return (
      <div className="App">
        {this.state.error ? (
          <DisplayError>{this.state.error}</DisplayError>
        ) : this.props.loading ? (
          <BallsLoader />
        ) : (
          <Router>
            <Nav
              currency={this.state.currency}
              setCurrency={this.setState.currency}
            />
            <main>
              <Switch>
                <Route exact path="/" render={() => <Category />} />
                <Route
                  path="/category/:categoryName"
                  render={({ match }) => (
                    <Category categoryName={match.params.categoryName} />
                  )}
                />
                <Route
                  path="/product/:id"
                  render={({ match }) => <Product id={match.params.id} />}
                />
                <Route path="/cart" component={Cart} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
              </Switch>
            </main>
          </Router>
        )}
      </div>
    );
  }
}
function mapStateToProps({ categories }) {
  return { loading: categories?.length > 0 ? false : true };
}

export default connect(mapStateToProps)(App);
