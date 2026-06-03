import { useLocalSearchParams } from "expo-router";
import ComprobanteScreen from "@/components/puntoclave/comprobante/ComprobanteScreen";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ComprobantePage() {

    const params = useLocalSearchParams();

    const total = Number(params.total || 0);

    const items = params.items
        ? JSON.parse(params.items as string)
        : [];

    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, paddingTop: insets.top }}>
            <ComprobanteScreen
                pedidoId={params.pedidoId as string}
                metodo={params.metodo as string}
                EST_PEDI={Number(params.estado) || 1}
                total={total}
                items={items}
            />
        </View>
    );
}