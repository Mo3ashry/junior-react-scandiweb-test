import React, { Component } from "react";
import MenuContainer from "../styledComponents/MenuContainer";

class CurrenciesMenu extends Component {
  render() {
    return (
      <MenuContainer>
        <ul>
          {this.props.currencies.map((currency) => (
            <li
              key={currency.label}
              onClick={() => this.props.setUserCurrency(currency)}
            >
              {" "}
              {currency.symbol} {currency.label}
            </li>
          ))}
        </ul>
      </MenuContainer>
    );
  }
}

export default CurrenciesMenu;
