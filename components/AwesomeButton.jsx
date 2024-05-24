import { Text, TouchableOpacity, View, Alert } from "react-native";
import {
  INGREDIENTS,
  useSandwich,
  addedToCart,
  setAddedToCart,
} from "../hooks/useSandwich";

export const AwesomeButton = ({
  title,
  color = "#000",
  backgroundColor = "#f1f1f1",
  bold = false,
  onPress,
  alertText,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: 30,
          backgroundColor,
          borderRadius: 17,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color,
            textAlign: "center",
            fontWeight: bold ? "900" : "normal",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
