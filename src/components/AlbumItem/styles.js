import { StyleSheet, Dimensions } from "react-native";
const dim = Dimensions.get("window");
export default StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 2
  },
  thumb: {
    width: dim.width / 2.03,
    height: 180,
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
    backgroundColor: "transparent",
    marginLeft: 3
  },
  counter: {
    fontSize: 12,
    alignSelf: "flex-end",
    textAlign: "left",
    position: "absolute", // child
    bottom: 0, // position where you want
    right: 0,
    color: "#fff",
    backgroundColor: "transparent",
    marginRight: 3
  },
  first: {
    borderTopWidth: 1,
    borderTopColor: "#626262"
  }
});
