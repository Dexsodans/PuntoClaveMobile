import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

interface Analisis {
    cliente_id: number;
    nombre: string;
    riesgo: string;
    probabilidad: number;
    tenure_meses: number;
    gasto_mensual_promedio: number;
    gasto_total: number;
    ultima_compra: string;
    dias_sin_comprar: number;
    recomendacion: string;
}
interface Props {
    id_cli: string;
    onClose: () => void;
}


export default function AnalisisCliente({
    id_cli,
    onClose,
}: Props) {
    
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [analisis, setAnalisis] = useState<Analisis | null>(null);

    
    const cargarAnalisis = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                "http://192.168.31.195:8001/predecir-churn",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cliente_id: Number(id_cli),
                    }),
                }
            );

            const data:any = await response.json();

            console.log("Respuesta IA:", data);

            setAnalisis(data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (id_cli) {
            cargarAnalisis();
        }
    }, [id_cli]);
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <TouchableOpacity
                style={styles.back}
                onPress={onClose}
            >
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#000"
                />
                <Text>Volver</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>
                Análisis de Cliente
            </Text>

            <View style={styles.card}>
                <Text style={styles.nombre}>
                    {analisis?.nombre}
                </Text>

                <Text>
                    Riesgo: {analisis?.riesgo.toUpperCase()}
                </Text>

                <Text>
                    Probabilidad: {(analisis?.probabilidad ?? 0) * 100}%
                </Text>

                <Text>
                    Antigüedad: {analisis?.tenure_meses} meses
                </Text>

                <Text>
                    Gasto mensual:
                    Bs. {analisis?.gasto_mensual_promedio}
                </Text>

                <Text>
                    Gasto total:
                    Bs. {analisis?.gasto_total}
                </Text>

                <Text>
                    Última compra:
                    {" "}
                    {analisis?.ultima_compra}
                </Text>

                <Text>
                    Días sin comprar:
                    {" "}
                    {analisis?.dias_sin_comprar}
                </Text>
            </View>

            <View style={styles.recomendacion}>
                <Text style={styles.recTitulo}>
                    Recomendación
                </Text>

                <Text>
                    {analisis?.recomendacion}
                </Text>
            </View>
            
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 16,
    },

    back: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    titulo: {
        fontSize: 24,
        fontWeight: "700",
    },

    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        gap: 10,
    },

    nombre: {
        fontSize: 18,
        fontWeight: "700",
    },

    recomendacion: {
        backgroundColor: "#f8fafc",
        padding: 16,
        borderRadius: 12,
    },

    recTitulo: {
        fontWeight: "700",
        marginBottom: 10,
    },
});