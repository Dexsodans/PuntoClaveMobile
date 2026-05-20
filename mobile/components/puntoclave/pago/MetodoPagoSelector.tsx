import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Metodo = "tarjeta" | "qr" | "efectivo";

interface Props {
    metodo: Metodo | null;
    onSelect: (m: Metodo) => void;
}

const METODOS: { id: Metodo; icon: any; label: string; desc: string; color: string }[] = [
    { id: "tarjeta", icon: "card", label: "Tarjeta", desc: "Crédito o débito", color: "#3B82F6" },
    { id: "qr", icon: "qr-code", label: "QR / Transferencia", desc: "Escaneá y pagá", color: "#8B5CF6" },
    { id: "efectivo", icon: "cash", label: "Efectivo", desc: "Al recibir el pedido", color: "#22C55E" },
];

export default function MetodoPagoSelector({ metodo, onSelect }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Método de pago</Text>
            {METODOS.map((m) => {
                const selected = metodo === m.id;
                return (
                    <TouchableOpacity
                        key={m.id}
                        style={[styles.card, selected && { borderColor: m.color, backgroundColor: `${m.color}10` }]}
                        onPress={() => onSelect(m.id)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.iconWrap, { backgroundColor: `${m.color}20` }]}>
                            <Ionicons name={m.icon} size={22} color={m.color} />
                        </View>
                        <View style={styles.info}>
                            <Text style={[styles.label, selected && { color: m.color }]}>{m.label}</Text>
                            <Text style={styles.desc}>{m.desc}</Text>
                        </View>
                        <View style={[styles.radio, selected && { borderColor: m.color }]}>
                            {selected && <View style={[styles.radioDot, { backgroundColor: m.color }]} />}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    title: { fontSize: 16, fontWeight: "700", color: "#1E40AF", marginBottom: 12 },
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderWidth: 2,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
    },
    iconWrap: { width: 42, height: 42, borderRadius: 12, alignItems: "center", justifyContent: "center" },
    info: { flex: 1 },
    label: { fontSize: 15, fontWeight: "700", color: "#1E3A5F" },
    desc: { fontSize: 12, color: "#94A3B8", marginTop: 1 },
    radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#CBD5E1", alignItems: "center", justifyContent: "center" },
    radioDot: { width: 10, height: 10, borderRadius: 5 },
});