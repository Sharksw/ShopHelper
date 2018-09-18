/* @flow */
import * as React from "react";
import { View, ImageBackground, Alert } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import ShopItem from "../../containers/ShopItem";
import Conclusion from "../../containers/Conclusion";
import Calendar from "../../containers/Calendar";
import ModalPurcaseActions from "./ModalPurcaseActions";

import { iconSize } from "../../config/commonSizes";
import styles from "./styles";

type Props = {
  navigation: Object,
  createShop: Function,
  shopList: any,
  amountOfMoney: number,
  shopsPurchases: any,
  isLoading: boolean
};

const style = { width: "100%", height: "100%" };

class FirstScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    headerTitle: <Calendar />,
    color: "red"
  };

  state = {
    modalActionsIsVisible: false,
    itemId: null
  };

  shopListMapper = () => {
    const { shopList, shopsPurchases } = this.props;

    if (!shopList) return null;
    return shopList.map(item => {
      const id = item.get("id");

      return shopsPurchases.get(id) ? (
        <ShopItem
          key={id}
          id={id}
          text={item.get("name")}
          currency={item.get("currency")}
          amount={item.get("totalAmount")}
          goToPage={this.goToPage}
          openModal={this.openModal}
        />
      ) : null;
    });
  };

  goToPage = (page: string, opts: Object = {}): void => {
    this.props.navigation.navigate(page, opts);
    this.setState({ modalActionsIsVisible: false });
  };

  openModal = itemId => {
    this.setState({ modalActionsIsVisible: true, itemId });
  };

  delete = () =>
    Alert.alert("Удалить?", null, [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          this.setState({ modalActionsIsVisible: false });
          this.props.deleteShop({
            id: this.state.itemId,
            date: this.props.currentDate
          });
        }
      }
    ]);

  render() {
    const size = iconSize * 1.4;
    return (
      <View>
        <ImageBackground
          // $FlowFixMe
          source={require("../../img/bg.jpg")} // eslint-disable-line
          style={style}
        >
          <View style={styles.container}>
            <View>
              {this.shopListMapper()}
              <View style={styles.plusShop}>
                <Icon
                  onPress={this.props.createShop}
                  name="plus-circle"
                  size={size}
                  color="#f00"
                />
              </View>
            </View>
            <Conclusion navigate={() => this.goToPage("Settings")} />
            <ModalPurcaseActions
              isVisible={this.state.modalActionsIsVisible}
              onBackdropPress={() =>
                this.setState({ modalActionsIsVisible: false })
              }
              edit={() =>
                this.goToPage("PurchasesScreen", { id: this.state.itemId })
              }
              delete={this.delete}
              copy={() => this.props.createShop()}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default FirstScreen;
