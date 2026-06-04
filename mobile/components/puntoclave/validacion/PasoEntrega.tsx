import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import AnalisisCliente from "./AnalisisCliente";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import { palette, typography, radius, shadows, spacing } from "@/constants/Theme";

interface Props { params: any; onEntregar: () => void; }

export default function PasoEntrega({ params, onEntregar }: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    const handlePedidoPress = (pedido: any) => {
        router.push({
        pathname: "/(tabs)/comprobante",
        params: {
            origen: "/(tabs)/entregas/Validacion",
            total: pedido.TOTAL_PEDI,
            pedidoId: pedido.id,
            estado: pedido.EST_PEDI,
            items: JSON.stringify(
            pedido.productos.map((p: any) => ({
                NOMBRE_PRO: p.NOM_PRO,
                CANT_CAR: p.CANT_CAR,
                SUB_TOTAL_CAR: p.SUB_TOTAL_CAR,
            }))
            ),
            metodo: "Pagado",
        },
        });
    };

    const lat = Number(params.Latitud);
    const lng = Number(params.Longitud);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <MapView
            style={styles.map}
            initialRegion={{ latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
        >
            <Marker coordinate={{ latitude: lat, longitude: lng }} />
        </MapView>

        {/* Acciones rápidas */}
        <View style={styles.btnRow}>
            <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => handlePedidoPress({
                id: params.pedidoId,
                TOTAL_PEDI: params.total,
                EST_PEDI: params.EST_PEDI,
                productos: JSON.parse(params.items),
            })}
            activeOpacity={0.75}
            >
            <Feather name="file-text" size={16} color={palette.textPrimary} />
            <Text style={styles.btnOutlineText}>Ver comprobante</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.btnSky}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.75}
            >
            <Feather name="bar-chart-2" size={16} color="white" />
            <Text style={styles.btnPrimaryText}>Análisis cliente</Text>
            </TouchableOpacity>
        </View>

        {/* Card cliente */}
        <View style={styles.card}>
            <View style={styles.cardHeader}>
            <Feather name="user" size={16} color={palette.actionPrimary} />
            <Text style={styles.cardTitle}>Detalles del pedido</Text>
            </View>

            {[
            { icon: "user", label: "Cliente", value: params.Cliente },
            { icon: "calendar", label: "Fecha",   value: params.Fecha },
            { icon: "dollar-sign", label: "Total", value: `Bs. ${params.total}` },
            ].map(({ icon, label, value }, i, arr) => (
            <View key={label} style={[styles.row, i === arr.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.rowLabel}>
                <Feather name={icon as any} size={13} color={palette.textSecondary} />
                <Text style={styles.rowLabelText}>{label}</Text>
                </View>
                <Text style={[styles.rowValue, label === "Total" && { color: palette.actionPrimary }]}>
                {value}
                </Text>
            </View>
            ))}
        </View>

        {/* Botón entregar */}
        <TouchableOpacity style={styles.btnEntregar} onPress={onEntregar} activeOpacity={0.8}>
            <Feather name="package" size={18} color="white" />
            <Text style={styles.btnPrimaryText}>Confirmar entrega</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
            <AnalisisCliente id_cli={params.id_cli} onClose={() => setModalVisible(false)} />
        </Modal>
        </ScrollView>
    );
    }

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: spacing.base, gap: spacing.md, paddingBottom: spacing["3xl"] },
    map: { height: 200, borderRadius: radius.lg },
    btnRow: { flexDirection: "row", gap: spacing.sm },
    btnOutline: {
        flex: 1, padding: spacing.md, borderRadius: radius.md,
        flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
        backgroundColor: palette.bgPrimary, borderWidth: 0.5, borderColor: palette.borderMedium,
    },
    btnOutlineText: { fontSize: typography.size.sm, fontWeight: typography.weight.medium, color: palette.textPrimary },
    btnSky: {
        flex: 1, padding: spacing.md, borderRadius: radius.md,
        flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
        backgroundColor: palette.actionPrimary, ...shadows.sky,
    },
    btnPrimaryText: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: "white" },
    card: {
        backgroundColor: palette.bgPrimary, borderRadius: radius.lg,
        padding: spacing.base, ...shadows.sm,
    },
    cardHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: spacing.md },
    cardTitle: { fontSize: typography.size.base, fontWeight: typography.weight.medium, color: palette.textPrimary },
    row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 9, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: palette.borderLight },
    rowLabel: { flexDirection: "row", alignItems: "center", gap: 5 },
    rowLabelText: { fontSize: typography.size.sm, color: palette.textSecondary },
    rowValue: { fontSize: typography.size.sm, fontWeight: typography.weight.medium, color: palette.textPrimary },
    btnEntregar: {
        backgroundColor: palette.success.main, padding: spacing.base + 2,
        borderRadius: radius.md, flexDirection: "row", alignItems: "center",
        justifyContent: "center", gap: spacing.sm, ...shadows.md,
    },
    });