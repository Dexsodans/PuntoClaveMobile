import { View } from "react-native";
import { Text } from "react-native";
import ProductosList from "./ProductosList";

export default function ProductosScreen() {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Productos
      </Text>

      <ProductosList />
    </View>
  );
}