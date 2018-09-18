/* @flow */
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getIsDatePickerOpen,
  getIsLoading,
  getCurrentDate
} from "../../selectors/mainSelectors";
import {
  getShopList,
  getDailyAmount,
  getShopsPurchases
} from "../../selectors/shoppingSelectors";
import { changeDate } from "../../actions/mainActions";
import { createShop, deleteShop } from "../../actions/shoppingActions";
import FirstScreen from "./FirstScreen";

const makeMapStateToProps = () => {
  const mapStateToProps = createStructuredSelector({
    isLoading: getIsLoading,
    showDatePicker: getIsDatePickerOpen,
    shopList: getShopList,
    shopsPurchases: getShopsPurchases,
    amountOfMoney: getDailyAmount,
    currentDate: getCurrentDate
  });
  return mapStateToProps;
};

const mapDispatchToProps = {
  setCurrentDate: changeDate.setCurrent,
  createShop,
  deleteShop
};

export default connect(
  makeMapStateToProps(),
  mapDispatchToProps
)(FirstScreen);
