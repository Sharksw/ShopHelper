// @flow

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import PurchasesScreen from "./PurchasesScreen";
import { getCurrentDate } from "../../selectors/mainSelectors";
import {
  getPurchases,
  getShopList,
  getShopAmount,
  getShopQuantity
} from "../../selectors/shoppingSelectors";
import {
  createPurchase,
  deleteShop,
  deletePurchase,
  updatePurchase
} from "../../actions/shoppingActions";

import { getCurrency } from "../../selectors/settingSelectors";

const makeMapStateToProps = () => {
  const purchases = getPurchases();

  const mapStateToProps = createStructuredSelector({
    currentDate: getCurrentDate,
    currency: getCurrency,
    shopList: getShopList,
    shopAmount: getShopAmount,
    shopQuantity: getShopQuantity,
    purchases
  });
  return mapStateToProps;
};

const mapDispatchToProps = {
  createPurchase,
  deletePurchase,
  updatePurchase,
  deleteShop
};

export default connect(
  makeMapStateToProps(),
  mapDispatchToProps
)(PurchasesScreen);
