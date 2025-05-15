import { actionButtonStyle } from "@/constants/styles/styles";
import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

interface ActionButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={actionButtonStyle.button} onPress={onPress}>
      <Text style={actionButtonStyle.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
