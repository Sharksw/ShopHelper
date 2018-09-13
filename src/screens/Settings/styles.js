import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export default StyleSheet.create({
  settingContainer: {
    marginTop: 18,
    paddingHorizontal: 10
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50
  },
  header: {
    marginBottom: 20
  },
  dateInput: { margin: 0, borderColor: "transparent" },
  dateStyle: {
    fontSize: theme.fontSizes.main,
    color: "#000",
    marginRight: -50
  },
  dateView: {
    flexDirection: "row",
    alignItems: "center"
  }
});
