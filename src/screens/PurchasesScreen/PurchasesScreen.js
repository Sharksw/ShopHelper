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
      id: null,
      shop: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ((!prevState.id || !prevState.shop) && nextProps.navigation) {
      const id = nextProps.navigation.getParam("id");

      return {
        id,
        shop: nextProps.shopList.find(item => item.id === id)
      };
    }
    return null;
  }

  componentWillUnmount = () => {
    const { purchases, deleteShop, currentDate } = this.props;

    if (!purchases.size) {
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
    if (!this.state.shop) return null;
    const id = this.props.navigation.getParam("id");

    return (
      <View style={styles.purchaseContainer}>
        <AddPurchase
          id={id}
          createPurchase={this.props.createPurchase}
          currentDate={this.props.currentDate}
          shop={this.state.shop}
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
