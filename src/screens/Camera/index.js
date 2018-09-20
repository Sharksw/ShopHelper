// @flow

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Camera from "./Camera";
import { getCurrentDate, getIsLoading } from "../../selectors/mainSelectors";
import { updatePurchase } from "../../actions/shoppingActions";
import { switchLoading } from "../../actions/mainActions";

const makeMapStateToProps = () => {
  const mapStateToProps = createStructuredSelector({
    currentDate: getCurrentDate,
    loading: getIsLoading
  });
  return mapStateToProps;
};

const mapDispatchToProps = {
  updatePurchase,
  switchLoading
};

export default connect(
  makeMapStateToProps(),
  mapDispatchToProps
)(Camera);
