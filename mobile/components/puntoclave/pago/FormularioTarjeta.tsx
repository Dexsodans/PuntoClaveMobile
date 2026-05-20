import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function FormularioTarjeta() {
    const [numero, setNumero] = useState("");
    const [nombre, setNombre] = useState("");
    const [vence, setVence] = useState("");
    const [cvv, setCvv] = useState("");

    const formatNumero = (v: string) => {
        const digits = v.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(.{4})/g, "$1 ").trim();
    };

    const formatVence = (v: string) => {
        const digits = v.replace(/\D/g, "").slice(0, 4);
        if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
        return digits;
    };

    return (
        <View style={styles.container}>
            {/* TARJETA VISUAL */}
            <View style={styles.cardVisual}>
                <View style={styles.cardTop}>
                    <View style={styles.chip} />
                    <Ionicons name="card" size={28} color="rgba(255,255,255,0.7)" />
                </View>
                <Text style={styles.cardNumero}>
                    {numero || "•••• •••• •••• ••••"}
                </Text>
                <View style={styles.cardBottom}>
                    <View>
                        <Text style={styles.cardLabel}>Titular</Text>
                        <Text style={styles.cardValue}>{nombre || "NOMBRE APELLIDO"}</Text>
                    </View>
                    <View>
                        <Text style={styles.cardLabel}>Vence</Text>
                        <Text style={styles.cardValue}>{vence || "MM/AA"}</Text>
                    </View>
                </View>
            </View>

            {/* CAMPOS */}
            <View style={styles.campos}>
                <View style={styles.campo}>
                    <Text style={styles.campoLabel}>Número de tarjeta</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="1234 5678 9012 3456"
                        placeholderTextColor="#94A3B8"
                        keyboardType="numeric"
                        value={numero}
                        onChangeText={(v) => setNumero(formatNumero(v))}
                        maxLength={19}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.campoLabel}>Nombre del titular</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Como aparece en la tarjeta"
                        placeholderTextColor="#94A3B8"
                        autoCapitalize="characters"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                </View>

                <View style={styles.row}>
                    <View style={[styles.campo, { flex: 1 }]}>
                        <Text style={styles.campoLabel}>Vencimiento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="MM/AA"
                            placeholderTextColor="#94A3B8"
                            keyboardType="numeric"
                            value={vence}
                            onChangeText={(v) => setVence(formatVence(v))}
                            maxLength={5}
                        />
                    </View>
                    <View style={[styles.campo, { flex: 1 }]}>
                        <Text style={styles.campoLabel}>CVV</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="•••"
                            placeholderTextColor="#94A3B8"
                            keyboardType="numeric"
                            secureTextEntry
                            value={cvv}
                            onChangeText={(v) => setCvv(v.replace(/\D/g, "").slice(0, 4))}
                            maxLength={4}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        gap: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    cardVisual: {
        backgroundColor: "#1E40AF",
        borderRadius: 16,
        padding: 20,
        gap: 16,
        shadowColor: "#1E40AF",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    chip: {
        width: 36, height: 28, borderRadius: 6,
        backgroundColor: "#FCD34D",
        borderWidth: 1, borderColor: "#F59E0B",
    },
    cardNumero: { color: "#fff", fontSize: 18, fontWeight: "600", letterSpacing: 3 },
    cardBottom: { flexDirection: "row", justifyContent: "space-between" },
    cardLabel: { color: "rgba(255,255,255,0.6)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 },
    cardValue: { color: "#fff", fontSize: 13, fontWeight: "600", marginTop: 2 },

    campos: { gap: 12 },
    campo: { gap: 6 },
    campoLabel: { fontSize: 12, fontWeight: "600", color: "#475569" },
    input: {
        backgroundColor: "#F8FAFF",
        borderWidth: 1.5,
        borderColor: "#CBD5E1",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: "#1E3A5F",
    },
    row: { flexDirection: "row", gap: 12 },
});