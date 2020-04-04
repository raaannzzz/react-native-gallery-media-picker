import { StyleSheet } from "react-native";
export default StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#626262"
  },
  thumb: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
    position: "relative"
  },
  textWrapper: {
    flexDirection: "row",

    position: "absolute", // child
    bottom: 0, // position where you want,
    right: 0,
    left: 0,
    shadowColor: "#000",
    height: 15,
    shadowOffset: {
      width: 40,
      height: 40
    },
    shadowOpacity: 40,
    shadowRadius: 20,
    // shadow props for android
    elevation: 40
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "flex-start",
    textAlign: "right",
    position: "absolute", // child
    bottom: 0, // position where you want
    left: 0,
    color: "#fff",
    backgroundColor: "transparent"
  },
  counter: {
    fontSize: 12,
    alignSelf: "flex-end",
    textAlign: "left",
    position: "absolute", // child
    bottom: 0, // position where you want
    right: 0,
    color: "#fff",
    backgroundColor: "transparent"
  },
  first: {
    borderTopWidth: 1,
    borderTopColor: "#626262"
  }
});
