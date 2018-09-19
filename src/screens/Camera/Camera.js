/* @flow */
import React, { PureComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import ImageResizer from "react-native-image-resizer";
import { readFile } from "react-native-fs";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

export default class Camera extends PureComponent {
  takePicture = async () => {
    if (this.camera) {
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
      console.log(base64);

      updatePurchase({
        id,
        shopId,
        param: "photo",
        value: base64,
        date: currentDate
      });
      this.props.navigation.goBack();
    }
  };

  goBack = () => this.props.navigation.goBack();

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
        >
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
