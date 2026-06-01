import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EntregasScreen from "@/components/puntoclave/entregas/EntregasScreen";
import AppHeader from "@/components/puntoclave/AppHeader";

export default function Page() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, paddingTop: insets.top }}>
        <AppHeader
            titulo="Entregas"
            subtitulo="Historial de entregas"
        />
        <EntregasScreen />

        </View>
    );
    }