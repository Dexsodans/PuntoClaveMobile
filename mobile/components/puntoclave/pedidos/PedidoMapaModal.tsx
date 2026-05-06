import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
    visible: boolean;
    pedido: any;
    onClose: () => void;
}

export default function PedidoMapaModal({ visible, pedido, onClose }: Props) {

    if (!pedido) return null;
const lat = pedido?.["id_ubi__LATITUD_UBI"];
const lng = pedido?.["id_ubi__LONGITUD_UBI"];

    return (
        <Modal visible={visible} animationType="slide">

            <View style={styles.container}>

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={{ latitude: lat, longitude: lng }} />
                </MapView>

                <TouchableOpacity style={styles.btn} onPress={onClose}>
                    <Text style={{ color: "white" }}>Cerrar</Text>
                </TouchableOpacity>

            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    map: {
        flex: 1,
    },

    btn: {
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        backgroundColor: "#000",
        padding: 14,
        borderRadius: 10,
    },

});