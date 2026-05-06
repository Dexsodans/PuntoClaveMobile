import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PedidosScreen from "@/components/puntoclave/pedidos/PedidosScreen";
import AppHeader from "@/components/puntoclave/AppHeader";

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <AppHeader
        titulo="Pedidos"
        subtitulo="Historial de pedidos"
      />
      <PedidosScreen />
    </View>
  );
}