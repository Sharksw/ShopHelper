import React from "react";

import { View, ScrollView } from "react-native";
// import { writeFile, ExternalDirectoryPath } from "react-native-fs";
// import Share from "react-native-share";

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

  // componentDidMount() {
  //   console.log(Platform.OS);
  //   if (this.props.purchases) {
  //     // // const base =
  //     // //   "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64, ";
  //     // // console.log(base + wbout);

  //     // // writeFile(file, wbout, "ascii")
  //     // //   .then(r => {
  //     // //     const shareOptions = {
  //     // //       title: "Share via",
  //     // //       url: Platform.OS === "android" ? `file://${file}` : file
  //     // //     };
  //     // //     Share.open(shareOptions);
  //     // //     console.log(shareOptions.url);
  //     // //     console.log("success");
  //     // //   })
  //     // //   .catch(e => {
  //     // //     console.log(e);
  //     // //   });
  //     // // console.log(wbout);
  //   }
  // }
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
