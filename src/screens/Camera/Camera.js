/* @flow */
import React, { PureComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import ImageResizer from "react-native-image-resizer";
import { readFile } from "react-native-fs";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

type Props = {
  currentDate: string,
  updatePurchase: Function,
  switchLoading: Function
};

export default class Camera extends PureComponent<Props> {
  takePicture = async () => {
    try {
      if (this.camera) {
        this.props.switchLoading({
          condition: true,
          text: "Photo is processed"
        });
        const options = { quality: 1, base64: true };
        const data = await this.camera.takePictureAsync(options);
        const id = this.props.navigation.getParam("id");
        const shopId = this.props.navigation.getParam("shopId");
        const { updatePurchase, currentDate } = this.props;

        const { uri } = await ImageResizer.createResizedImage(
          `data:image/jpeg;base64, ${data.base64}`,
          800,
          600,
          "JPEG",
          100
        );
        const base64 = await readFile(uri, "base64");

        updatePurchase({
          id,
          shopId,
          param: "photo",
          value: base64,
          date: currentDate
        });
        this.props.navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.props.switchLoading({
        condition: false,
        text: ""
      });
    }
  };

  goBack = () => this.props.navigation.goBack();

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.opacityView}>
          <TouchableOpacity onPress={this.goBack} style={styles.button}>
            <Icon name="chevron-left" size={10} />
          </TouchableOpacity>
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        />

        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={this.takePicture}
            style={[styles.button, styles.capture]}
          >
            <Icon name="camera" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Camera.navigationOptions = {
  header: null
};
