import React, { Component } from "react";
import MenuContainer from "../styledComponents/MenuContainer";
import {connect} from "react-redux"

class CurrenciesMenu extends Component {
  render() {
    return (
      <MenuContainer>
        <ul>
          {this.props.currencies.map((currency) => (
            <li
              key={currency.label}
              onClick={() => this.props.setUserCurrency(currency)}
              className={this.props.userCurrency.label===currency.label?"selected":"option"}
            >
              
              {`${currency.symbol} ${currency.label}`}
            </li>
          ))}
        </ul>
      </MenuContainer>
    );
  }
}

function mapStateToProps({userCurrency}){
  return{userCurrency}
}

export default connect(mapStateToProps) (CurrenciesMenu);
