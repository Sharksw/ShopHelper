import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  opacityView: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  button: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    opacity: 0.5,
    margin: 20
  },
  capture: {
    padding: 15,
    alignSelf: "center"
  }
});
