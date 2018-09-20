/* @flow */
import * as React from "react";

import { Navigator } from "../../config/navigator";
import Loader from "../../components/Loader";

type Props = {
  isLoading: boolean,
  loadingMessage: string
};

class NavigatorContainer extends React.Component<Props> {
  componentDidMount = () => {
    if (this.props.isLoading) {
      this.props.switchLoading({ condition: false, text: "" });
    }
  };

  render = () => (
    <>
      <Navigator />
      <Loader
        condition={this.props.isLoading}
        message={this.props.loadingMessage}
      />
    </>
  );
}
export default NavigatorContainer;
