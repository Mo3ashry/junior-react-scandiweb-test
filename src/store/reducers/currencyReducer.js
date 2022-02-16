import { CHANGE_CURRENCY } from "../actions/currencyAction";

export default function currency(
  state = { label: "USD", symbol: "$" },
  action
) {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return action.currency;
    default:
      return state;
  }
}
