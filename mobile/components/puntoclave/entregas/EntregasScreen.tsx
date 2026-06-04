import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { palette } from "@/constants/Theme";
import { Card,Text, Button } from "@/components/ui";
import EntregasList from "./EntregasList";


export default function EntregasScreen() {

    const router = useRouter();

    const handleEntregaPress = (entrega: any) => {
        
        router.push({
            pathname: "/(tabs)/entregas/RutasUbicaciones",
            params: {
                Caja: entrega.COD_CAJA,
                id_ruta: entrega.id_ruta,
                idcaja: entrega.id,
                est_caja: entrega.EST_CAJA,
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