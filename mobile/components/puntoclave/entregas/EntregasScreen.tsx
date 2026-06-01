import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { palette } from "@/constants/Theme";
import { Card,Text } from "@/components/ui";

export default function EntregasScreen() {

    const router = useRouter();

    const handlePedidoPress = (pedido: any) => {
        
        router.push({
            pathname: "/(tabs)/comprobante",
            params: {
                total: pedido.TOTAL_PEDI,
                pedidoId: pedido.id,
                items: JSON.stringify(
                    pedido.productos.map((p: any) => ({
                        NOMBRE_PRO: p.NOM_PRO,
                        CANT_CAR: p.CANT_CAR,
                        SUB_TOTAL_CAR: p.SUB_TOTAL_CAR,
                    }))
                ),
                metodo: 'Pagado',
            },
            /*  router.replace({
                    pathname: "/(tabs)/comprobante",
                    params: { total, pedidoId: id_pedi, items: JSON.stringify(items), metodo },
                }); */
        });
    };

    return (
        <View style={styles.container}>

            {/* <PedidosList
                onPedidoPress={handlePedidoPress}
            /> */}
            <Text>
                Hola
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.bgSecondary,
    },
});