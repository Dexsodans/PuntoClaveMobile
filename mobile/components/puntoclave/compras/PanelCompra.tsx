import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useCompra } from "./CompraContext";
import { palette } from "@/constants/Theme";

export default function PanelCompra() {

    const { items, total, eliminarItem } = useCompra();

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Compra actual</Text>

            {items.map(item => (
                <View key={item.id} style={styles.row}>
                    <Text style={styles.nombre}>{item.nombre}</Text>

                    <Text>
                        {item.cantidad} x Bs {item.precio}
                    </Text>

                    <TouchableOpacity
                        onPress={() => eliminarItem(item.id)}
                    >
                        <Text style={styles.eliminar}>✕</Text>
                    </TouchableOpacity>

                </View>
            ))}

            <Text style={styles.total}>
                Total: Bs {total.toFixed(2)}
            </Text>

            <TouchableOpacity style={styles.btnConfirmar}>
                <Text style={{ color: "white" }}>
                    Registrar compra
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "white",
        padding: 12,
        borderTopWidth: 1,
        borderColor: "#ddd"
    },

    title: {
        fontWeight: "bold",
        marginBottom: 6
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4
    },

    nombre: {
        width: "40%"
    },

    eliminar: {
        color: "red"
    },

    total: {
        marginTop: 10,
        fontWeight: "bold"
    },

    btnConfirmar: {
        marginTop: 10,
        backgroundColor: palette.actionPrimary,
        padding: 12,
        borderRadius: 8,
        alignItems: "center"
    }

});