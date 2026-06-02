import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { palette } from "@/constants/Theme";
import { Card,Text } from "@/components/ui";
import EntregasList from "./EntregasList";

export default function EntregasScreen() {

    const router = useRouter();

    const handleEntregaPress = (entrega: any) => {
        
        router.push({
            pathname: "/(tabs)/entregas/RutasUbicaciones",
            params: {
                /* total: entrega.TOTAL_CAJA,
                entregaId: entrega.id,
                items: JSON.stringify(
                    entrega.productos.map((p: any) => ({
                        NOMBRE_PRO: p.NOM_PRO,
                        CANT_CAR: p.CANT_CAR,
                        SUB_TOTAL_CAR: p.SUB_TOTAL_CAR,
                    }))
                ),
                metodo: 'Pagado', */
                Caja: entrega.COD_CAJA,
                id_ruta: entrega.id_ruta,
            },
        });
    };

    return (
        <View style={styles.container}>

            <EntregasList
                onEntregaPress={handleEntregaPress}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.bgSecondary,
    },
});