import { StyleSheet } from "react-native";

export default StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    flexGrow: 1
  },
  headerIcon: {
    marginLeft: 18
  },
  itemContent: {
    flexDirection: "row",
    marginTop: 10
  },
  itemConsumption: {
    justifyContent: "space-around",
    flexGrow: 1,
    paddingLeft: 24
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputContainer: {
    // width: "100%",
    flexGrow: 1,
    paddingTop: 12
  }
});
