import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";

export default function PasoCodigo() {

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Ingrese el código que le dicte el cliente
            </Text>

            <TextInput
                placeholder="Código de validación"
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.boton}
            >
                <Text style={styles.texto}>
                    Validar
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },

    titulo: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 20,
        fontWeight: "600",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 14,
        marginBottom: 20,
    },

    boton: {
        backgroundColor: "#2563eb",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    texto: {
        color: "white",
        fontWeight: "bold",
    },
});