/* @flow */
import * as React from "react";

import { Navigator } from "../../config/navigator";
import Loader from "../../components/Loader";

type Props = {
  isLoading: boolean
};

class NavigatorContainer extends React.Component<Props> {
  componentDidMount = () => {
    if (this.props.isLoading) {
      this.props.switchLoading(false);
    }
  };

  render = () => (
    <React.Fragment>
      <Navigator />
      <Loader condition={this.props.isLoading} />
    </React.Fragment>
  );
}
export default NavigatorContainer;
