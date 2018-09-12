import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Settings from "./Settings";

import * as settingSelectors from "../../selectors/settingSelectors";
import { changeDate } from "../../actions/mainActions";
import { removeTillDate } from "../../actions/shoppingActions";
import {
  changeSetting,
  changeDateRemoving
} from "../../actions/settingActions";

const mapStateToProps = createStructuredSelector({
  currency: settingSelectors.getCurrency,
  locale: settingSelectors.getLocale,
  reportName: settingSelectors.getReportName,
  email: settingSelectors.getEmail,
  removingDate: settingSelectors.getRemovingDate,
  formatedRemovingDate: settingSelectors.getFormatedRemovingDate
});

const mapDispatchToProps = {
  setCurrent: changeDate.setCurrent,
  changeSetting,
  changeDateRemoving,
  removeTillDate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
