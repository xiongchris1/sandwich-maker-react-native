import {
  Button,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import {
  INGREDIENTS,
  useSandwich,
  addedToCart,
  setAddedToCart,
} from "../hooks/useSandwich";
import { AwesomeButton } from "./AwesomeButton";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const BottomUI = () => {
  const addIngredient = useSandwich((state) => state.addIngredient);
  const [addedToCart, setAddedToCart] = useSandwich((state) => [
    state.addedToCart,
    state.setAddedToCart,
  ]);
  const total = useSandwich((state) => state.total);
  const showAlert = () => {
    Alert.alert("Order Complete!", console.log("PURCHASE BUTTON PRESSED"));
  };
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
        }}
      >
        {addedToCart ? (
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
              }}
            >
              Total: ${total.toFixed(2)}
            </Text>
            <Text
              style={{
                color: "#666",
                marginTop: 4,
                marginBottom: 16,
              }}
            >
              Your order will be available in 10 minutes. Thank you!
            </Text>
            <AwesomeButton
              title={`Purchase`}
              color="#fff"
              bold
              backgroundColor="#7C4DFF"
              onPress={showAlert}
            />
            <AwesomeButton
              title={`Cancel Order`}
              color="#fff"
              backgroundColor="red"
              bold
              onPress={() => setAddedToCart(false)}
            />
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "right",
              }}
            >
              <Text
                style={{
                  flexShrink: 1,
                  fontSize: 22,
                  fontWeight: "900",
                }}
              >
                Sandwich Maker
              </Text>
            </View>
            <Text
              style={{
                color: "#666",
              }}
            >
              Make your fresh sandwich below!
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#ececec",
                marginVertical: 25,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Total: ${total.toFixed(2)}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: 10,
                marginBottom: 8,
                marginLeft: -20,
                marginRight: -20,
              }}
            >
              {Object.keys(INGREDIENTS).map((ingredient) => (
                <View
                  key={ingredient}
                  style={{
                    padding: 10,
                  }}
                >
                  <AwesomeButton
                    title={
                      INGREDIENTS[ingredient].icon +
                      `${capitalizeFirstLetter(ingredient)} (+$${INGREDIENTS[
                        ingredient
                      ].price.toFixed(2)})`
                    }
                    onPress={() => addIngredient(ingredient)}
                  />
                </View>
              ))}
            </ScrollView>
            <AwesomeButton
              title={`Add To Cart ($${total.toFixed(2)})`}
              color="#fff"
              backgroundColor="#7C4DFF"
              bold
              onPress={() => setAddedToCart(true)}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
