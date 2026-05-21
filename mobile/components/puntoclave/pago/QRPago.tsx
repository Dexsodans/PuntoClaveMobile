import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

interface Props {
    total: number;
}

export default function QRPago({ total }: Props) {
    // QR decorativo (patrón visual sin librería externa)
    const QR_SIZE = 160;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Escaneá el código QR</Text>
            <Text style={styles.subtitle}>Usá tu app bancaria para transferir</Text>

            {/* QR visual decorativo */}
            <View style={styles.qrWrapper}>
                <View style={styles.qrBox}>
                    {/* Esquinas */}
                    <View style={[styles.corner, styles.cornerTL]} />
                    <View style={[styles.corner, styles.cornerTR]} />
                    <View style={[styles.corner, styles.cornerBL]} />
                    <View style={[styles.corner, styles.cornerBR]} />
                    {/* Contenido central */}
                    <View style={styles.qrCenter}>
                        <Image
                            source={require("@/assets/images/qr.jpeg")}
                            style={styles.qrImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={16} color="#F97316" />
                <Text style={styles.infoText}>QR válido por <Text style={styles.bold}>10 minutos</Text></Text>
            </View>

            <View style={styles.totalBox}>
                <Text style={styles.totalLabel}>Monto a transferir</Text>
                <Text style={styles.totalMonto}>Bs. {total.toFixed(2)}</Text>
            </View>

            <View style={styles.pasos}>
                {[
                    "Abrí tu app bancaria",
                    "Seleccioná 'Pagar con QR'",
                    "Escaneá el código",
                    "Confirmá el pago",
                ].map((paso, i) => (
                    <View key={i} style={styles.paso}>
                        <View style={styles.pasoBadge}>
                            <Text style={styles.pasoBadgeText}>{i + 1}</Text>
                        </View>
                        <Text style={styles.pasoText}>{paso}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const CORNER = 18;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        gap: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    title: { fontSize: 17, fontWeight: "700", color: "#1E40AF" },
    subtitle: { fontSize: 13, color: "#94A3B8", marginTop: -8 },
    qrWrapper: { padding: 8, backgroundColor: "#F0F9FF", borderRadius: 16 },
    qrBox: {
        width: 170, height: 170,
        backgroundColor: "#fff",
        borderRadius: 12,
        alignItems: "center", justifyContent: "center",
        position: "relative",
        borderWidth: 1, borderColor: "#E2E8F0",
    },
    corner: {
        position: "absolute",
        width: CORNER, height: CORNER,
        borderColor: "#1E40AF",
    },
    cornerTL: { top: 10, left: 10, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 4 },
    cornerTR: { top: 10, right: 10, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 4 },
    cornerBL: { bottom: 10, left: 10, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 4 },
    cornerBR: { bottom: 10, right: 10, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 4 },
    qrCenter: { alignItems: "center", justifyContent: "center" },
    infoRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    infoText: { fontSize: 13, color: "#64748B" },
    bold: { fontWeight: "700", color: "#F97316" },
    totalBox: {
        backgroundColor: "#FFF7ED",
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FED7AA",
        width: "100%",
    },
    totalLabel: { fontSize: 12, color: "#94A3B8", marginBottom: 2 },
    totalMonto: { fontSize: 24, fontWeight: "800", color: "#F97316" },
    pasos: { width: "100%", gap: 10 },
    paso: { flexDirection: "row", alignItems: "center", gap: 10 },
    pasoBadge: {
        width: 24, height: 24, borderRadius: 12,
        backgroundColor: "#EFF6FF",
        alignItems: "center", justifyContent: "center",
    },
    pasoBadgeText: { fontSize: 12, fontWeight: "700", color: "#1E40AF" },
    pasoText: { fontSize: 13, color: "#475569", flex: 1 },
    qrImage: {
    width: 120,
    height: 120,
},
});