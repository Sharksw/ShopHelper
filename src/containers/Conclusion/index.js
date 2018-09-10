/* @flow */
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  getDatesShops,
  getDailyAmount,
  getShopsPurchases
} from "../../selectors/shoppingSelectors";

import { switchLoading } from "../../actions/mainActions";

import Conclusion from "./Conclusion";

const mapStateToProps = createStructuredSelector({
  datesShopList: getDatesShops,
  shopsPurchases: getShopsPurchases,
  amountOfMoney: getDailyAmount
});

const mapDispatchToProps = { switchLoading };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conclusion);
