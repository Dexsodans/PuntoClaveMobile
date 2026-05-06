import { View, StyleSheet } from "react-native";
import { useState } from "react";
import PedidosList from "./PedidosList";
import PedidoMapaModal from "./PedidoMapaModal";
import { palette } from "@/constants/Theme";

export default function PedidosScreen() {

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState<any>(null);

    return (
        <View style={styles.container}>

            <PedidosList
                onPedidoPress={(pedido) => setPedidoSeleccionado(pedido)}
            />

            <PedidoMapaModal
                pedido={pedidoSeleccionado}
                visible={!!pedidoSeleccionado}
                onClose={() => setPedidoSeleccionado(null)}
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