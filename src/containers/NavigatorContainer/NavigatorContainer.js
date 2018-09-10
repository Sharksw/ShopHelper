/* @flow */
import * as React from "react";

import { Navigator } from "../../config/navigator";
import Loader from "../../components/Loader";

type Props = {
  isLoading: boolean
};

const NavigatorContainer: React.StatelessFunctionalComponent<Props> = ({
  isLoading
}) => (
  <>
    <Navigator />
    <Loader condition={isLoading} />
  </>
);

export default NavigatorContainer;
