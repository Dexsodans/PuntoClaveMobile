import { View, Text, StyleSheet, ScrollView } from "react-native";
import Animated, {
    FadeInDown,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
} from "react-native-reanimated";
import { useEffect } from "react";

const PASOS = [
    { id: 1, label: "Selección", emoji: "🛍️", desc: "Elegiste tus productos" },
    { id: 2, label: "Carrito", emoji: "🛒", desc: "Revisaste tu pedido" },
    { id: 3, label: "Confirmación", emoji: "📍", desc: "Indicaste tu dirección" },
    { id: 4, label: "En camino", emoji: "🛵", desc: "El repartidor va" },
    { id: 5, label: "Pago", emoji: "💳", desc: "Transacción lista" },
    { id: 6, label: "Comprobante", emoji: "✅", desc: "¡Listo!" },
];

interface Props {
    pasoActual: number; // 1–6
}

function StepDot({ paso, pasoActual, index }: { paso: typeof PASOS[0]; pasoActual: number; index: number }) {
    const scale = useSharedValue(0.6);
    const completado = pasoActual > paso.id;
    const activo = pasoActual === paso.id;

    useEffect(() => {
        if (activo) {
            scale.value = withDelay(index * 80, withSpring(1.15, { damping: 8 }));
        } else {
            scale.value = withDelay(index * 60, withSpring(1));
        }
    }, [pasoActual]);

    const dotStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            style={styles.stepWrapper}
        >
            <Animated.View
                style={[
                    styles.dot,
                    completado && styles.dotCompletado,
                    activo && styles.dotActivo,
                    dotStyle,
                ]}
            >
                {completado ? (
                    <Text style={styles.checkmark}>✓</Text>
                ) : (
                    <Text style={[styles.dotEmoji, activo && styles.dotEmojiActivo]}>
                        {paso.emoji}
                    </Text>
                )}
            </Animated.View>

            <Text style={[styles.stepLabel, activo && styles.stepLabelActivo, completado && styles.stepLabelCompletado]}>
                {paso.label}
            </Text>

            {activo && (
                <Text style={styles.stepDesc}>{paso.desc}</Text>
            )}
        </Animated.View>
    );
}

export default function StepperPedido({ pasoActual }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Flujo del pedido</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {PASOS.map((paso, i) => (
                    <View key={paso.id} style={styles.stepRow}>
                        <StepDot paso={paso} pasoActual={pasoActual} index={i} />

                        {/* Conector */}
                        {i < PASOS.length - 1 && (
                            <View style={styles.connectorWrap}>
                                <View
                                    style={[
                                        styles.connector,
                                        pasoActual > paso.id && styles.connectorActivo,
                                    ]}
                                />
                                {pasoActual === paso.id + 1 && (
                                    <Text style={styles.connectorArrow}>›</Text>
                                )}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#1E40AF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    titulo: { fontSize: 15, fontWeight: "700", color: "#1E40AF", marginBottom: 14 },
    scrollContent: {
        alignItems: "flex-start",
        paddingVertical: 4,
        gap: 0,
    },
    stepRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    stepWrapper: {
        alignItems: "center",
        width: 64,
    },
    dot: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#E2E8F0",
        marginBottom: 6,
    },
    dotCompletado: {
        backgroundColor: "#DCFCE7",
        borderColor: "#22C55E",
    },
    dotActivo: {
        backgroundColor: "#FFF7ED",
        borderColor: "#F97316",
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 4,
    },
    dotEmoji: { fontSize: 18 },
    dotEmojiActivo: { fontSize: 20 },
    checkmark: { fontSize: 18, color: "#22C55E", fontWeight: "700" },
    stepLabel: {
        fontSize: 10,
        color: "#94A3B8",
        textAlign: "center",
        fontWeight: "500",
    },
    stepLabelActivo: { color: "#F97316", fontWeight: "700", fontSize: 11 },
    stepLabelCompletado: { color: "#22C55E" },
    stepDesc: {
        fontSize: 9,
        color: "#F97316",
        textAlign: "center",
        marginTop: 2,
        width: 60,
    },
    connectorWrap: {
        width: 20,
        alignItems: "center",
        marginBottom: 20,
        position: "relative",
    },
    connector: {
        width: 20,
        height: 2,
        backgroundColor: "#E2E8F0",
        borderRadius: 1,
    },
    connectorActivo: { backgroundColor: "#22C55E" },
    connectorArrow: {
        position: "absolute",
        color: "#F97316",
        fontSize: 14,
        fontWeight: "700",
        top: -8,
    },
});