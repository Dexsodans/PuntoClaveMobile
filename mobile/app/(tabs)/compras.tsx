import { CompraProvider } from "@/components/puntoclave/compras/CompraContext";
import RegistrarCompraScreen from "@/components/puntoclave/compras/RegistrarCompraScreen";
import AppHeader from "@/components/puntoclave/AppHeader";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Compras() {
    const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
    <CompraProvider>
      <AppHeader titulo="Compras" subtitulo="Encuentra lo que necesitas"/>
      <RegistrarCompraScreen />
    </CompraProvider>
    </View>
  );
}