import { View, Text } from "react-native";
import { logout } from "@/services/auth/authServices";
import ActionButton from "@/components/ActionButton";
import { screenStyle } from "@/constants/styles/styles";

export default function HomeScreen() {
  return (
    <View style={screenStyle.container}>
      <Text style={{ fontSize: 24 }}>Home placeholder</Text>
      <ActionButton
        label="logout"
        onPress={async () => {
          logout();
        }}
      />
    </View>
  );
}
