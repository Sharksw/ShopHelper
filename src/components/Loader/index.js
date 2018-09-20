/* @flow */
import * as React from "react";
import { View, Text } from "react-native";
import { Spinner } from "native-base";

import styles from "./styles";
// import theme from "../../config/theme";

type Props = {
  condition: boolean,
  message: string
};

const Loader: React.StatelessFunctionalComponent<Props> = ({
  condition,
  message
}) =>
  condition ? (
    <View style={styles.spinnerContainer}>
      <Spinner />
      <Text style={styles.spinnerText}>{message}</Text>
    </View>
  ) : null;

export default Loader;
