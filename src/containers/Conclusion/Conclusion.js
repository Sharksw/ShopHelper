/* @flow  */
import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import { iconSize } from "../../config/commonSizes";

type Props = {
  amountOfMoney?: number,
  navigate: () => void,
  datesShopList: any,
  shopsPurchases: any,
  amountOfMoney: any
};

// ({
//   amountOfMoney = 0,
//   navigate
// }): React.Node => (

class Conclusion extends Component<Props> {
  static defaultProps = {
    amountOfMoney: 0
  };

  excelPress = () => {
    console.log(
      JSON.stringify(
        this.props.shopsPurchases
          .toList()
          .sortBy(item => item.date)
          .flatten(),
        null,
        2
      )
    );
  };

  render() {
    const { amountOfMoney, navigate } = this.props;
    return (
      <View style={styles.container}>
        <Icon name="cogs" size={iconSize} onPress={navigate} />
        <Text>{`${amountOfMoney} грн`}</Text>
        <Icon
          name="file-excel-o"
          size={iconSize}
          color="#1d673d"
          onPress={this.excelPress}
        />
      </View>
    );
  }
}

export default Conclusion;
