import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RutasUbicacionesScreen from "@/components/puntoclave/rutasUbicaciones/RutasScreen";
import AppHeader from "@/components/puntoclave/AppHeader";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();

    return (
        <View style={{ flex: 1, paddingTop: insets.top }}>
        <AppHeader
            titulo = {params.id_ruta as string} 
            subtitulo= {params.Caja as string}
        />
        <RutasUbicacionesScreen
            idRuta={params.id_ruta as string}
        />

        </View>
    );
    }