import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MetodoPagoSelector from "./MetodoPagoSelector";
import FormularioTarjeta from "./FormularioTarjeta";
import QRPago from "./QRPago";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "@/lib/api";

export default function PagoScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();

    const total = Number(params.total || 0);
    const pedidoId = params.pedidoId as string | undefined;
    const items = params.items ? JSON.parse(params.items as string) : [];
    const marker = params.marker ? JSON.parse(params.marker as string) : null;
    const direccion = params.direccion as string | undefined;
    const fecha = params.fecha ? new Date(params.fecha as string) : null;

    const [metodo, setMetodo] = useState<"tarjeta" | "qr" | "efectivo" | null>(null);
    const [pagando, setPagando] = useState(false);

    const handlePagar = async () => {
        if (!metodo) return;
        setPagando(true);

        try {
            // Si ya existe pedidoId (rare case), solo navegamos al comprobante.
            if (!pedidoId) {
                const userData = await AsyncStorage.getItem("user");
                const token = await AsyncStorage.getItem("token");
                const user = JSON.parse(userData || "{}");

                if (!user?.id) throw new Error("Usuario no autenticado");
                if (!marker) throw new Error("Falta ubicación para el pedido");

                // 1) Crear ubicación
                const ubiRes = await fetch(`${BASE_URL}/api/ubicaciones/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    body: JSON.stringify({
                        LATITUD_UBI: marker.latitude,
                        LONGITUD_UBI: marker.longitude,
                        DIRECCION_UBI: direccion || "Ubicacion nueva",
                    }),
                });
                const ubiData: any = await ubiRes.json();
                const id_ubi = ubiData["ubicacion creada"]?.id;
                if (!id_ubi) throw new Error("No se pudo crear la ubicación");

                // 2) Crear pedido
                const pedidoRes = await fetch(`${BASE_URL}/api/pedidos/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ id_usu: user.id, id_ubi, TOTAL_PEDI: total, FECHA_PEDI: fecha || new Date() }),
                });
                const pedidoData: any = await pedidoRes.json();
                const id_pedi = pedidoData["pedido creado"]?.id;
                if (!id_pedi) throw new Error("No se pudo crear el pedido");

                // 3) Crear detalle_pedidos
                for (const item of items) {
                    await fetch(`${BASE_URL}/api/detalle_pedidos/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                        body: JSON.stringify({
                            id_pedi,
                            id_pro: item.id_pro,
                            CANT_DET_PEDI: item.CANT_CAR,
                            SUB_TOTAL_DET_PEDI: item.SUB_TOTAL_CAR,
                        }),
                    });
                }
                console.log("Lo que enviamos a comprobante:", { total, pedidoId: id_pedi, items, metodo });

                // Navegar al comprobante con el id creado
                setPagando(false);
                router.replace({
                    pathname: "/(tabs)/comprobante",
                    params: { total, pedidoId: id_pedi, items: JSON.stringify(items), metodo },
                });
                return;
            }

            // Si ya hay pedidoId solo navegamos
            setPagando(false);
            router.replace({
                pathname: "/pedido/comprobante",
                params: { total, pedidoId, items: JSON.stringify(items), metodo },
            });
        } catch (err: any) {
            console.log(err);
            setPagando(false);
            Alert.alert("Error", err.message || "Error al procesar el pago");
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color="#1E40AF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pago</Text>
                <View style={styles.totalBadge}>
                    <Text style={styles.totalBadgeText}>Bs. {total.toFixed(2)}</Text>
                </View>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                {/* STEPPER MINI */}
                <View style={styles.stepperMini}>
                    {["Carrito", "Confirmar", "Pago", "Comprobante"].map((s, i) => (
                        <View key={s} style={styles.stepMiniRow}>
                            <View style={[styles.stepMiniDot, i <= 2 && styles.stepMiniDotActive]}>
                                <Text style={[styles.stepMiniNum, i <= 2 && styles.stepMiniNumActive]}>
                                    {i + 1}
                                </Text>
                            </View>
                            {i < 3 && (
                                <View style={[styles.stepMiniLine, i < 2 && styles.stepMiniLineActive]} />
                            )}
                        </View>
                    ))}
                </View>
                <View style={styles.stepLabels}>
                    {["Carrito", "Confirmar", "Pago", "Comprobante"].map((s, i) => (
                        <Text key={s} style={[styles.stepLabel, i === 2 && styles.stepLabelActive]}>
                            {s}
                        </Text>
                    ))}
                </View>

                {/* SELECTOR DE MÉTODO */}
                <MetodoPagoSelector metodo={metodo} onSelect={setMetodo} />

                {/* FORMULARIO SEGÚN MÉTODO */}
                {metodo === "tarjeta" && <FormularioTarjeta />}
                {metodo === "qr" && <QRPago total={total} />}
                {metodo === "efectivo" && (
                    <View style={styles.efectivoCard}>
                        <Ionicons name="cash-outline" size={40} color="#22C55E" />
                        <Text style={styles.efectivoTitle}>Pago en efectivo</Text>
                        <Text style={styles.efectivoText}>
                            El repartidor cobrará <Text style={styles.efectivoBold}>Bs. {total.toFixed(2)}</Text> al momento de la entrega. Ten el monto exacto listo.
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* BOTÓN PAGAR */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
                <TouchableOpacity
                    style={[styles.pagarBtn, !metodo && styles.pagarBtnDisabled]}
                    onPress={handlePagar}
                    disabled={!metodo || pagando}
                    activeOpacity={0.85}
                >
                    {pagando ? (
                        <Text style={styles.pagarBtnText}>Procesando...</Text>
                    ) : (
                        <>
                            <Ionicons name="shield-checkmark" size={20} color="#fff" />
                            <Text style={styles.pagarBtnText}>Pagar Bs. {total.toFixed(2)}</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFF" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingBottom: 14,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
        gap: 10,
    },
    backBtn: { padding: 4 },
    headerTitle: { flex: 1, fontSize: 20, fontWeight: "700", color: "#1E40AF" },
    totalBadge: {
        backgroundColor: "#FFF7ED",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: "#FED7AA",
    },
    totalBadgeText: { color: "#F97316", fontWeight: "700", fontSize: 14 },
    scroll: { flex: 1 },
    scrollContent: { padding: 16, gap: 14, paddingBottom: 24 },

    stepperMini: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 4 },
    stepMiniRow: { flexDirection: "row", alignItems: "center" },
    stepMiniDot: {
        width: 28, height: 28, borderRadius: 14,
        backgroundColor: "#E2E8F0", alignItems: "center", justifyContent: "center",
    },
    stepMiniDotActive: { backgroundColor: "#F97316" },
    stepMiniNum: { fontSize: 12, fontWeight: "700", color: "#94A3B8" },
    stepMiniNumActive: { color: "#fff" },
    stepMiniLine: { width: 32, height: 2, backgroundColor: "#E2E8F0" },
    stepMiniLineActive: { backgroundColor: "#F97316" },
    stepLabels: { flexDirection: "row", justifyContent: "space-around", marginBottom: 16 },
    stepLabel: { fontSize: 10, color: "#94A3B8", fontWeight: "500" },
    stepLabelActive: { color: "#F97316", fontWeight: "700" },

    efectivoCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        gap: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    efectivoTitle: { fontSize: 18, fontWeight: "700", color: "#1E3A5F" },
    efectivoText: { fontSize: 14, color: "#64748B", textAlign: "center", lineHeight: 20 },
    efectivoBold: { fontWeight: "700", color: "#22C55E" },

    footer: {
        padding: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },
    pagarBtn: {
        backgroundColor: "#F97316",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 16,
        borderRadius: 14,
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 5,
    },
    pagarBtnDisabled: { backgroundColor: "#CBD5E1", shadowOpacity: 0 },
    pagarBtnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});