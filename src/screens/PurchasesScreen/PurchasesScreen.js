import React from "react";

import { View, ScrollView } from "react-native";

import AddPurchase from "../../components/AddPurchase";
import PurchaseHeader from "../../containers/PurchaseHeader";
import PurchaseItem from "../../components/PurchaseItem";
import PurchaseFooter from "../../components/PurchaseFooter";

import styles from "./styles";

type Props = {
  currentDate: string,
  currency: string,
  shopList: any,
  purchases: any,
  shopAmount: number,
  shopQuantity: number,
  createPurchase: Function,
  deleteShop: Function,
  updatePurchase: Function,
  deletePurchase: Function
};

class PurchasesScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.navigation.getParam("id"),
      shop: props.shopList.find(
        ({ id }) => id === props.navigation.getParam("id")
      )
    };
  }

  componentWillUnmount = () => {
    const { purchases, deleteShop, currentDate } = this.props;

    if (!purchases) {
      deleteShop({ date: currentDate, id: this.state.shop.get("id") });
    }
  };

  goToPage = (page: string, opts: Object = {}): void => {
    this.props.navigation.navigate(page, opts);
  };

  purchaseItemMapper = () =>
    this.props.purchases
      ? this.props.purchases.map(item => {
          const id = item.get("id");
          return (
            <PurchaseItem
              key={id}
              id={id}
              currency={item.get("currency")}
              deletePurchase={this.props.deletePurchase}
              updatePurchase={this.props.updatePurchase}
              currentDate={this.props.currentDate}
              shopId={this.state.id}
              name={item.get("name")}
              price={item.get("price")}
              quantity={item.get("quantity")}
              photo={item.get("photo")}
              barCode={item.get("barCode")}
              amount={item.amount}
              goToPage={this.goToPage}
            />
          );
        })
      : null;

  render() {
    const id = this.props.navigation.getParam("id");

    return (
      <View style={styles.purchaseContainer}>
        <AddPurchase
          id={id}
          createPurchase={this.props.createPurchase}
          currentDate={this.props.currentDate}
          shopName={this.state.shop.name}
          currency={this.props.currency}
        />
        <View style={styles.purchases}>
          <ScrollView>{this.purchaseItemMapper()}</ScrollView>
        </View>
        <PurchaseFooter
          amount={this.props.shopAmount}
          quantity={this.props.shopQuantity}
        />
      </View>
    );
  }
}

PurchasesScreen.navigationOptions = {
  headerTitle: props => <PurchaseHeader {...props} />
};

export default PurchasesScreen;
