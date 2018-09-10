/* @flow */
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getIsDatePickerOpen,
  getIsLoading
} from "../../selectors/mainSelectors";
import {
  getShopList,
  getDailyAmount,
  getShopsPurchases
} from "../../selectors/shoppingSelectors";
import { changeDate } from "../../actions/mainActions";
import { createShop } from "../../actions/shoppingActions";
import FirstScreen from "./FirstScreen";

const makeMapStateToProps = () => {
  const mapStateToProps = createStructuredSelector({
    isLoading: getIsLoading,
    showDatePicker: getIsDatePickerOpen,
    shopList: getShopList,
    shopsPurchases: getShopsPurchases,
    amountOfMoney: getDailyAmount
  });
  return mapStateToProps;
};

const mapDispatchToProps = {
  setCurrentDate: changeDate.setCurrent,
  createShop
};

export default connect(
  makeMapStateToProps(),
  mapDispatchToProps
)(FirstScreen);
