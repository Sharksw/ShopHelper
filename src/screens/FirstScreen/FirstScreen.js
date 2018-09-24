/* @flow */
import React from "react";
import { View, ImageBackground, Alert } from "react-native";
import DatePicker from "react-native-datepicker";

import Icon from "react-native-vector-icons/FontAwesome";
import ShopItem from "../../containers/ShopItem";
import Conclusion from "../../containers/Conclusion";
import Calendar from "../../containers/Calendar";
import ModalPurcaseActions from "../../components/ModalPurcaseActions";

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

  constructor(props) {
    super(props);
    this.datePickerRef = React.createRef();

    this.state = {
      modalActionsIsVisible: false,
      itemId: null
    };
  }

  onDateChangeHandler = date =>
    this.props.changeShopDateCreatedHandler(date, this.state.itemId);

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

  openModal = itemId => {
    this.setState({ modalActionsIsVisible: true, itemId });
  };

  hideModal = () => this.setState({ modalActionsIsVisible: false });

  goToPage = (page: string, opts: Object = {}): void => {
    this.props.navigation.navigate(page, opts);
    this.hideModal();
  };

  edit = () => this.goToPage("PurchasesScreen", { id: this.state.itemId });

  okAlertHandler = () => {
    this.hideModal();
    this.props.deleteShop({
      id: this.state.itemId,
      date: this.props.currentDate
    });
  };

  delete = () =>
    Alert.alert("Удалить?", null, [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: this.okAlertHandler
      }
    ]);

  copy = () => {
    this.hideModal();
    this.props.createCopyShop(this.state.itemId);
  };

  changeShopDate = () => {
    this.datePickerRef.current.onPressDate();
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
            <ModalPurcaseActions
              isVisible={this.state.modalActionsIsVisible}
              onBackdropPress={this.hideModal}
              edit={this.edit}
              delete={this.delete}
              copy={this.copy}
              changeShopDate={this.changeShopDate}
            >
              <DatePicker
                showIcon={false}
                ref={this.datePickerRef}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={this.onDateChangeHandler}
                hideText
              />
            </ModalPurcaseActions>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default FirstScreen;
