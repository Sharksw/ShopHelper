/* @flow */
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getIsLoading } from "../../selectors/mainSelectors";

import NavigatorContainer from "./NavigatorContainer";

const mapStateToProps = createStructuredSelector({
  isLoading: getIsLoading
});

export default connect(mapStateToProps)(NavigatorContainer);
