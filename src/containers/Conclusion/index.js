/* @flow */
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  getDatesShops,
  getDailyAmount,
  getShopsPurchases
} from "../../selectors/shoppingSelectors";

import Conclusion from "./Conclusion";

const mapStateToProps = createStructuredSelector({
  datesShopList: getDatesShops,
  shopsPurchases: getShopsPurchases,
  amountOfMoney: getDailyAmount
});

export default connect(mapStateToProps)(Conclusion);
