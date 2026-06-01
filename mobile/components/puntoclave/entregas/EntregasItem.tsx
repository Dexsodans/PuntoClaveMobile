import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { palette } from "@/constants/Theme";

interface Props {
    entrega: any;
    index: number;
    onPress: () => void;
}


export default function EntregasItem({ entrega, index, onPress }: Props) {

    return (
        <Animated.View entering={FadeInRight.delay(index * 80)}>
            <TouchableOpacity
                style={styles.card}
                onPress={onPress}
            >

                <Text style={styles.codigo}>
                    {entrega.COD_ENTREGA}
                </Text>

                <Text style={styles.total}>
                    Bs. {entrega.TOTAL_ENTREGA}
                </Text>

                <Text style={styles.fecha}>
                    {new Date(entrega.FECHA_ENTREGA).toLocaleString()}
                </Text>

                <Text style={styles.direccion}>
                    {entrega.ubicacion?.DIRECCION_UBI || "Sin dirección"}
                </Text>

                <Text style={styles.estado}>
                    Estado: {entrega.EST_ENTREGA}
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