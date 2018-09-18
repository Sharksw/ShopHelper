/* @flow */
import * as React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import Modal from "react-native-modal";

import styles from "./styles";

class ModalPurcaseActions extends React.PureComponent {
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onBackdropPress}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Button transparent block onPress={this.props.edit}>
            <Text>Редактировать</Text>
          </Button>
          <Button transparent block onPress={this.props.copy}>
            <Text>Копировать</Text>
          </Button>
          <Button transparent block onPress={this.props.delete}>
            <Text>Удалить</Text>
          </Button>
          <Button transparent block>
            <Text>Изменить дату</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

export default ModalPurcaseActions;
