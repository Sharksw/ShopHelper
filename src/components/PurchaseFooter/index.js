// @flow
import React, { PureComponent } from "react";
import { View } from "native-base";
import { Keyboard } from "react-native";

import TextBlock from "../TextBlock";

import styles from "./styles";
import i18n from "../../i18n";

type Props = {
  quantity: number,
  amount: number
};

type State = {
  hideFooter: boolean
};

class PurchaseFooter extends PureComponent<Props, State> {
  state = {
    hideFooter: true
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = () => {
    this.setState({ hideFooter: false });
  };

  keyboardDidHide = () => {
    this.setState({ hideFooter: true });
  };

  render() {
    return this.state.hideFooter ? (
      <View style={styles.footerContainer}>
        <TextBlock styles={styles.footerText}>
          {this.props.quantity} {i18n.t("pieces")}
        </TextBlock>
        <TextBlock styles={styles.footerText}>
          {this.props.amount} {i18n.t("purchaseTotal")}
        </TextBlock>
      </View>
    ) : null;
  }
}
export default PurchaseFooter;
