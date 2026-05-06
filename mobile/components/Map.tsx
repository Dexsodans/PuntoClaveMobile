import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function Map() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -16.5,
                    longitude: -68.15,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: -16.5,
                        longitude: -68.15,
                    }}
                    title="La Paz"
                    description="Ubicación inicial"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});