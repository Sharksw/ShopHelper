/* @flow */
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getIsLoading, getLoadingMessage } from "../../selectors/mainSelectors";
import { switchLoading } from "../../actions/mainActions";

import NavigatorContainer from "./NavigatorContainer";

const mapStateToProps = createStructuredSelector({
  isLoading: getIsLoading,
  loadingMessage: getLoadingMessage
});

const mapDispatchToProps = { switchLoading };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigatorContainer);
