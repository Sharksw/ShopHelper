import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export default StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "column",
    flex: 1
  },
  plusShop: {
    backgroundColor: theme.colors.backgroundColor,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#dcd5d5",
    borderBottomWidth: 1
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  modalContent: {
    padding: 15,
    backgroundColor: "#fff",
    width: "80%"
  }
});
