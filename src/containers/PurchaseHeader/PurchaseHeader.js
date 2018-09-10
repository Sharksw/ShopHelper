// @flow
import React from "react";
import { View } from "react-native";
import { Text } from "native-base";

import HeaderInput from "../../components/HeaderInput";

type Props = {
  shop: any,
  updateShop: Function,
  date: string
};

const PurchaseHeader = (props: Props) => {
  if (!props.shop) return null;

  const name = props.shop.get("name");
  const totalAmount = props.shop.get("totalAmount");
  const id = props.shop.get("id");
  const currency = props.shop.get("currency");
  return (
    <View
      style={{
        paddingBottom: 15,
        flexDirection: "row",
        alignItems: "flex-end"
      }}
    >
      <HeaderInput
        placeholder="Покупка"
        value={name}
        onChangeText={text =>
          props.updateShop({ id, date: props.date, param: "name", value: text })
        }
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>
          {" "}
          Σ {totalAmount} {currency}
        </Text>
      </View>
    </View>
  );
};

export default PurchaseHeader;
