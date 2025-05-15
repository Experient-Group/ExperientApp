import { StyleSheet } from "react-native";

export const textInputStyle = StyleSheet.create({
  textInput: {
    width: 200,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    lineHeight: 20,
  },
  textInputWrapper: {
    flex: 0.1,
    justifyContent: "space-evenly",
  },
});

export const actionButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 25,
  },
  text: {
    fontWeight: "bold",
  },
});

export const screenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
