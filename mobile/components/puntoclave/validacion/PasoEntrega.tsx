import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { useRouter } from "expo-router";

import MapView, { Marker } from "react-native-maps";

interface Props {
    params: any;
    onEntregar: () => void;
}

export default function PasoEntrega({
    params,
    onEntregar
}: Props) {
    const router = useRouter();
    const handlePedidoPress = (pedido: any) => {
        
        router.push({
            pathname: "/(tabs)/comprobante",
            params: {
                origen: "/(tabs)/entregas/Validacion",
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

    const lat = Number(params.Latitud);
    const lng = Number(params.Longitud);

    return (
        <ScrollView style={styles.container}>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lng,
                    }}
                />
            </MapView>

            <TouchableOpacity style={styles.comprobante}
                onPress={() => handlePedidoPress({
                    id: params.pedidoId,
                    TOTAL_PEDI: params.total,
                    productos: JSON.parse(params.items),
                })}
            >
                <Text style={styles.btnText}>
                    Ver comprobante
                </Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={styles.titulo}>
                    Cliente
                </Text>

                <Text>{params.Cliente}</Text>

                <Text style={styles.label}>
                    Fecha:
                </Text>

                <Text>{params.Fecha}</Text>

                <Text style={styles.label}>
                    Total:
                </Text>

                <Text>Bs. {params.total}</Text>
            </View>

            <TouchableOpacity
                style={styles.entregar}
                onPress={onEntregar}
            >
                <Text style={styles.btnText}>
                    Entregar
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    map: {
        height: 200,
        borderRadius: 12,
    },

    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginTop: 16,
    },

    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    label: {
        marginTop: 10,
        fontWeight: "600",
    },

    comprobante: {
        marginTop: 16,
        backgroundColor: "#2563eb",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },

    entregar: {
        marginTop: 20,
        backgroundColor: "#16a34a",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 30,
    },

    btnText: {
        color: "white",
        fontWeight: "bold",
    },
});