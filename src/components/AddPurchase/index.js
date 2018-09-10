// @flow
import React, { PureComponent } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Input from "../../components/Input";

import styles from "./styles";

type Props = {
  id: string,
  currency: string,
  createPurchase: Function,
  shop: any,
  currentDate: string
};

type State = {
  price: string,
  quantity: string
};
class AddPurchase extends PureComponent<Props, State> {
  state = {
    price: "",
    quantity: ""
  };

  handleChange = (name: string, text: string): void => {
    this.setState({ [name]: text });
  };

  createPurchase = () => {
    const { price, quantity } = this.state;
    const { createPurchase, id, shop, currentDate } = this.props;

    return createPurchase({
      id,
      price,
      shopName: shop.name,
      quantity: quantity || "1",
      date: currentDate,
      currency: shop.currency
    });
  };

  render() {
    return (
      <View style={styles.item}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Кол-во 0.0 шт."
            onChangeText={text => this.handleChange("quantity", text)}
            value={this.state.quantity}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Цена 0.0 грн"
            onChangeText={text => this.handleChange("price", text)}
            value={this.state.price}
            keyboardType="numeric"
          />
        </View>
        <Icon
          name="plus-circle"
          size={30}
          color="#f00"
          onPress={this.createPurchase}
        />
      </View>
    );
  }
}

export default AddPurchase;
