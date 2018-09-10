/* @flow */
import * as React from "react";
import { View } from "react-native";
import { Spinner } from "native-base";

import styles from "./styles";
// import theme from "../../config/theme";

type Props = {
  condition: boolean
};

const Loader: React.StatelessFunctionalComponent<Props> = ({ condition }) =>
  condition ? (
    <View style={styles.spinnerContainer}>
      <Spinner />
    </View>
  ) : null;

export default Loader;
