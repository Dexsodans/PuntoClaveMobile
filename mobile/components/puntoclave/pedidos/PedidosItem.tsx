import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { palette } from "@/constants/Theme";

interface Props {
    pedido: any;
    index: number;
    onPress: () => void;
}


export default function PedidoItem({ pedido, index, onPress }: Props) {

    return (
        <Animated.View entering={FadeInRight.delay(index * 80)}>
            <TouchableOpacity
                style={styles.card}
                onPress={onPress}
            >

                <Text style={styles.codigo}>
                    {pedido.COD_PEDI}
                </Text>

                <Text style={styles.total}>
                    Bs. {pedido.TOTAL_PEDI}
                </Text>

                <Text style={styles.fecha}>
                    {new Date(pedido.FECHA_PEDI).toLocaleString()}
                </Text>

                <Text style={styles.direccion}>
                    {pedido.ubicacion?.DIRECCION_UBI || "Sin dirección"}
                </Text>

                <Text style={styles.estado}>
                    Estado: {pedido.EST_PEDI}
                </Text>

            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginHorizontal: 12,
        marginVertical: 6,
        elevation: 2,
    },

    codigo: {
        fontWeight: "bold",
        fontSize: 16,
    },

    total: {
        color: palette.actionPrimary,
        fontSize: 15,
        marginTop: 4,
    },

    fecha: {
        color: "#666",
        marginTop: 4,
    },

    direccion: {
        marginTop: 6,
        fontSize: 13,
        color: "#555",
    },

    estado: {
        marginTop: 6,
        fontSize: 13,
        color: "#555",
    },

});