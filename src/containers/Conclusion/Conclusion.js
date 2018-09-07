/* @flow  */
import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import {
  writeFile,
  ExternalDirectoryPath,
  DocumentDirectoryPath
} from "react-native-fs";
import Share from "react-native-share";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import { iconSize } from "../../config/commonSizes";
import excelConverter from "../../utils/excelConverter";

type Props = {
  amountOfMoney?: number,
  navigate: () => void,
  datesShopList: any,
  shopsPurchases: any,
  amountOfMoney: any
};

class Conclusion extends Component<Props> {
  static defaultProps = {
    amountOfMoney: 0
  };

  excelPress = async () => {
    try {
      const data = await excelConverter(
        this.props.shopsPurchases
          .toList()
          .sortBy(item => item.date)
          .flatten()
          .toJS()
      );

      const file =
        Platform.OS === "android"
          ? `${ExternalDirectoryPath}/report.xlsx`
          : `${DocumentDirectoryPath}/report.xlsx`;

      await writeFile(file, data, "ascii");
      const shareOptions = {
        title: "Share via",
        url: Platform.OS === "android" ? `file://${file}` : file
      };
      Share.open(shareOptions).catch(() => {});
    } catch (err) {
      console.log("error");
      console.log(err);
    }
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
