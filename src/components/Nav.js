import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeCurrency } from "../store/actions/currencyAction";
import Badge from "../styledComponents/Badge";
import Button from "../styledComponents/Button";
import Container from "../styledComponents/Container";
import RelativeDiv from "../styledComponents/RelativeDiv";
import Grid from "../styledComponents/Grid";
import NavStyledLink from "../styledComponents/NavStyledLink";
import { getCurrencies } from "../utils/fetchApi";
import cartImg from "../utils/icons/cart.svg";
import bagLogo from "../utils/icons/logo.svg";
import openedMenuIcon from "../utils/icons/openedToggle.svg";
import closedMenuIcon from "../utils/icons/closedToggle.svg";
import MiniCart from "./MiniCart";
import CurrenciesMenu from "./CurrenciesMenu";
import CoverScreen from "../styledComponents/CoverScreen";
import CartMenu from "../styledComponents/CartMenu";

class Nav extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.currencyListRef = createRef(null);
    this.cartListRef = createRef(null);
    this.state = {
      activeLink: "all",
      currencies: [],
      openCurrencyList: false,
      openCart: false,
    };
  }

  // getCurrencies / setDropMenu listeners
  componentDidMount() {
    getCurrencies().then((result) =>
      this.setState({ currencies: result.data.currencies })
    );
    document.addEventListener("mousedown", this.dropDownHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.dropDownHandler);
  }

  dropDownHandler = (e) => {
    if (this.currencyListRef?.current.contains(e.target)) {
      this.state.openCart && this.setState({ openCart: false });
      return;
    }
    if (this.cartListRef?.current.contains(e.target)) {
      this.state.openCurrencyList && this.setState({ openCurrencyList: false });
      return;
    }
    this.setState({ openCart: false, openCurrencyList: false });
  };

  setUserCurrency = (currency) => {
    this.props.dispatch(changeCurrency(currency));
    this.setState({ openCurrencyList: false });
  };
  handleViewBag = () => {
    this.setState({ openCart: false });
  };
  toggleMenuState = (menu) => {
    this.setState((prevState) => ({
      [menu]: !prevState[menu],
    }));
  };
  render() {
    const { activeLink, currencies, openCurrencyList, openCart } = this.state;
    const { categories, userCurrency, cart } = this.props;

    return (
      <Container>
        <Grid parent direction="col">
          <Grid item cols={5} style={{ height: "100%" }}>
            {categories.map((category) => (
              <NavStyledLink
                key={category.name}
                active={activeLink === category.name ? "true" : "false"}
              >
                <Link
                  to={`/category/${category.name}`}
                  onClick={() => this.setState({ activeLink: category.name })}
                >
                  {category.name}
                </Link>
              </NavStyledLink>
            ))}
          </Grid>
          <Grid item cols={2} align="center">
            <img src={bagLogo} alt="logo" />
          </Grid>
          <Grid item cols={5} align="end">
            <RelativeDiv divRef={this.currencyListRef}>
              <Button
                noBorder
                small
                font="1.7rem"
                onClick={() => this.toggleMenuState("openCurrencyList")}
              >
                {userCurrency?.symbol ? userCurrency.symbol : "$"}
                <img
                  src={openCurrencyList ? openedMenuIcon : closedMenuIcon}
                  alt="toggle"
                  style={{ paddingLeft: ".5rem" }}
                />
              </Button>
              {openCurrencyList && (
                <CurrenciesMenu
                  currencies={currencies}
                  setUserCurrency={this.setUserCurrency}
                />
              )}
            </RelativeDiv>
            <RelativeDiv divRef={this.cartListRef}>
              <Button
                noBorder
                small
                onClick={() => this.toggleMenuState("openCart")}
              >
                <img src={cartImg} alt="empty cart" />
                {cart.length > 0 && <Badge>{cart.length}</Badge>}
              </Button>
              {openCart && (
                <CartMenu>
                  {" "}
                  <MiniCart handleViewBag={this.handleViewBag} />
                </CartMenu>
              )}
            </RelativeDiv>
            {openCart && <CoverScreen />}
          </Grid>
        </Grid>
      </Container>
    );
  }
}
function mapStateToProps({ categories, userCurrency, cart }) {
  return { categories, userCurrency, cart };
}
export default connect(mapStateToProps)(Nav);
