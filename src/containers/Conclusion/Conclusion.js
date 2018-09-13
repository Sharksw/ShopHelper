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
  amountOfMoney: any,
  switchLoading: Function
};

class Conclusion extends Component<Props> {
  static defaultProps = {
    amountOfMoney: 0
  };

  excelPress = async () => {
    try {
      this.props.switchLoading(true);
      const dataForConvert = this.props.shopsPurchases
        .toList()
        .sortBy(item => item.date)
        .flatten()
        .toJS();
      const data = await excelConverter(dataForConvert, "Report");

      const file =
        Platform.OS === "android"
          ? `${ExternalDirectoryPath}/report.xlsx`
          : `${DocumentDirectoryPath}/report.xlsx`;

      await writeFile(file, data, "ascii");
      const shareOptions = {
        title: "Share via",
        url: Platform.OS === "android" ? `file://${file}` : file
      };
      await Share.open(shareOptions);
    } catch (err) {
      console.log("error");
      console.log(err);
    } finally {
      this.props.switchLoading(false);
    }
  };

  render() {
    const { amountOfMoney, navigate } = this.props;
    return (
      <View style={styles.container}>
        <Icon name="cogs" size={iconSize} onPress={navigate} />
        <Text>{amountOfMoney}</Text>
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
