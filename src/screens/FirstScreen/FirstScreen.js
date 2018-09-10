/* @flow */
import * as React from "react";
import { View, ImageBackground } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import ShopItem from "../../containers/ShopItem";
import Conclusion from "../../containers/Conclusion";
import Calendar from "../../containers/Calendar";
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
          amount={item.get("totalAmount")}
          goToPage={this.goToPage}
        />
      ) : null;
    });
  };

  goToPage = (page: string, opts: Object = {}): void => {
    this.props.navigation.navigate(page, opts);
  };

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
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default FirstScreen;
