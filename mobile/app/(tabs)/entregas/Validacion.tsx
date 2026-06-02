import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import AppHeader from "@/components/puntoclave/AppHeader";
import ValidacionScreen from "@/components/puntoclave/validacion/ValidacionScreen";

export default function Page() {

    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();

    return (
        <View style={{ flex: 1, paddingTop: insets.top }}>
            <AppHeader
                titulo="Validación"
                subtitulo={params.Caja as string}
            />

            <ValidacionScreen params={params} />
        </View>
    );
}