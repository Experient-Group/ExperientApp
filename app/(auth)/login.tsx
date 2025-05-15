import ActionButton from "@/components/ActionButton";
import { screenStyle, textInputStyle } from "@/constants/styles/styles";
import { login, storeTokenFromStorage } from "@/services/auth/authServices";
import { RootState } from "@/state/store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";

export default function LoginScreen() {
  const router = useRouter();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attemptedLogin, setAttemptedLogin] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      await storeTokenFromStorage();
      //put logic to validate accessToken here in a real app, including clearing tokens in AsyncStorage/state if token is not valid/is expired
      if (accessToken) {
        router.replace("/(home)/home");
      }
    };
    checkToken();
  }, [accessToken, attemptedLogin]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login(username, password);
    } catch (error) {
      console.error(error);
    } finally {
      setAttemptedLogin(true);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={screenStyle.container}
    >
      <Text style={{ fontSize: 24 }}>Please login</Text>
      <View style={textInputStyle.textInputWrapper}>
        <TextInput
          style={textInputStyle.textInput}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          editable={!isLoading}
        ></TextInput>
        <TextInput
          style={textInputStyle.textInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        ></TextInput>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ActionButton
            label=" Login"
            onPress={() => {
              handleLogin();
            }}
          />
        )}
        {attemptedLogin && !isAuthenticated ? (
          <Text style={{ color: "red" }}>Login failed</Text>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}
