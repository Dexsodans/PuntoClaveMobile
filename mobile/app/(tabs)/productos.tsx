// app/(tabs)/productos.tsx
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductosScreen from "@/components/puntoclave/productos/ProductosScreen";
import AppHeader from "@/components/puntoclave/AppHeader";

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <AppHeader titulo="Productos" subtitulo="Encuentra lo que necesitas" />
      <ProductosScreen />
    </View>
  );
}