// @flow
import React, { PureComponent } from "react";
import { Image } from "react-native";
import { View } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import Input from "../Input";
import TextBlock from "../TextBlock";

import { floatInputValue } from "../../utils/formatInput";
import styles from "./styles";
import i18n from "../../i18n";

type Props = {
  goToPage: any,
  currency: string,
  id: string,
  shopId: string,
  name: string,
  price: number,
  quantity: number,
  photo: string,
  barCode: string,
  deletePurchase: Function,
  updatePurchase: Function,
  currentDate: string,
  amount: number
};

class PurchaseItem extends PureComponent<Props> {
  deleteItem = () => {
    const { id, shopId, deletePurchase, currentDate } = this.props;
    deletePurchase({ id, shopId, date: currentDate });
  };

  handleChangeInput = (name: string, text: string): void => {
    const { id, shopId, updatePurchase, currentDate } = this.props;
    updatePurchase({ id, shopId, param: name, value: text, date: currentDate });
  };
  render() {
    const { id, shopId, currency } = this.props;
    const photo = `data:image/jpeg;base64, ${this.props.photo}`;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <View style={{ flex: 1 }}>
            <Input
              placeholder={i18n.t("purchase")}
              value={this.props.name}
              onChangeText={text => this.handleChangeInput("name", text)}
            />
          </View>

          <Icon
            style={styles.headerIcon}
            onPress={this.deleteItem}
            name="trash-o"
            size={24}
          />
          {this.props.barCode ? (
            <Icon
              style={styles.headerIcon}
              name="check-circle"
              size={24}
              onPress={() => this.props.goToPage("BarCode", { id, shopId })}
            />
          ) : (
            <Icon
              style={styles.headerIcon}
              name="barcode"
              size={24}
              onPress={() => this.props.goToPage("BarCode", { id, shopId })}
            />
          )}
        </View>
        <View style={styles.itemContent}>
          <View>
            {this.props.photo ? (
              <Image
                style={{
                  width: 120,
                  height: 120
                }}
                source={{ uri: photo }}
              />
            ) : (
              <Icon
                onPress={() => this.props.goToPage("Camera", { id, shopId })}
                name="picture-o"
                color="#8b8b8b"
                size={120}
              />
            )}
          </View>
          <View style={styles.itemConsumption}>
            <Input
              placeholder={`${i18n.t("count")} 0.0 ${i18n.t("pieces")}.`}
              value={floatInputValue(this.props.quantity)}
              keyboardType="numeric"
              onChangeText={text => this.handleChangeInput("quantity", text)}
            />
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Input
                  placeholder={`Цена 0.0 ${i18n.t("pieces")}.`}
                  value={floatInputValue(this.props.price)}
                  keyboardType="numeric"
                  onChangeText={text => this.handleChangeInput("price", text)}
                />
              </View>
              <TextBlock>{currency}</TextBlock>
            </View>
            <View style={styles.row}>
              <TextBlock>{i18n.t("purchaseTotal")}:</TextBlock>
              <View style={styles.inputContainer}>
                <Input
                  placeholder={`Cумма 0.0 ${i18n.t("pieces")}.`}
                  value={floatInputValue(this.props.amount)}
                  keyboardType="numeric"
                  onChangeText={text => this.handleChangeInput("amount", text)}
                />
              </View>
              <TextBlock>{currency}</TextBlock>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default PurchaseItem;
