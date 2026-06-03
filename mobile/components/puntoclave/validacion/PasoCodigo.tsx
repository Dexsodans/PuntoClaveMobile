import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import { useState } from "react";
import BASE_URL from "@/lib/api";
import { useRouter } from "expo-router";


interface Props {
    pedidoId: string;
}
export default function PasoCodigo({ pedidoId }: Props) {

    const [codigo, setCodigo] = useState("");

    const router = useRouter();
    const handleValidar = async () => {

        
        const response = await fetch(`${BASE_URL}/api/pedidos/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                /* Authorization: `Bearer ${token}`, */
            },
            body: JSON.stringify({
                id_pedi: pedidoId,
                COD_VALIDACION: codigo,
            }),
        });

        const data: any = await response.json();

        if (data.success) {
            Alert.alert(
                "Éxito",
                "Validación exitosa"
            );
            router.back();
        } else {
            Alert.alert(
                "Error",
                "Validación fallida"
            );
        }
    };
    const alerta = () => {

                // Ejemplo de fetch
        Alert.alert(
            "Confirmar entrega",
            "¿Deseas entregar este pedido?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Aceptar",
                    onPress: () => handleValidar(),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Ingrese el código que le dicte el cliente
            </Text>

            <TextInput
                placeholder="Código de validación"
                style={styles.input}
                value={codigo}
                onChangeText={setCodigo}
            />

            <TouchableOpacity
                style={styles.boton}
                onPress={alerta}
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