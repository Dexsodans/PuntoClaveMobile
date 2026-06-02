import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import StepperPedido from "./StepperPedido";
import LineaTiempoMoto from "./LineaTiempoMoto";

interface Item {
    NOMBRE_PRO?: string;
    CANT_CAR?: number;
    SUB_TOTAL_CAR?: number;
}

interface Props {
    pedidoId?: string;
    total: number;
    metodo?: string;
    items?: Item[];
}

export default function ComprobanteScreen({
    pedidoId,
    total,
    metodo,
    items = [],
}: Props) {

    const params = useLocalSearchParams();
    const router = useRouter();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    if (params.origen) {
                        router.push(params.origen as any);
                    } else {
                        router.back();
                    }
                }}
                style={styles.backButton}
            >
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#1E3A5F"
                />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>
                Comprobante
            </Text>
        </View>
            {/* STEP GENERAL */}
            <StepperPedido pasoActual={6} />

            {/* ESTADO DELIVERY */}
            <LineaTiempoMoto estado={1} />

            {/* CARD COMPROBANTE */}
            <View style={styles.card}>
                <View style={styles.successIcon}>
                    <Ionicons
                        name="checkmark-circle"
                        size={70}
                        color="#22C55E"
                    />
                </View>

                <Text style={styles.title}>
                    ¡Pago realizado!
                </Text>

                <Text style={styles.subtitle}>
                    Tu pedido fue registrado correctamente
                </Text>

                <View style={styles.separator} />

                {/* INFO */}
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Pedido</Text>
                    <Text style={styles.value}>
                        #{pedidoId || "0001"}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Método</Text>
                    <Text style={styles.value}>
                        {metodo?.toUpperCase()}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Total</Text>
                    <Text style={styles.total}>
                        Bs. {total.toFixed(2)}
                    </Text>
                </View>

                {/* PRODUCTOS */}
                <View style={styles.productsContainer}>
                    <Text style={styles.productsTitle}>
                        Productos
                    </Text>

                    {items.map((item, index) => (
                        <View
                            key={index}
                            style={styles.productRow}
                        >
                            <Text style={styles.productName}>
                                {item.NOMBRE_PRO || "Producto"}
                            </Text>

                            <Text style={styles.productQty}>
                                x{item.CANT_CAR}
                            </Text>

                            <Text style={styles.productPrice}>
                                Bs. {item.SUB_TOTAL_CAR?.toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* BOTONES */}
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => router.push("/")}
                >
                    <Ionicons
                        name="home-outline"
                        size={20}
                        color="#fff"
                    />

                    <Text style={styles.primaryBtnText}>
                        Volver al inicio
                    </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={styles.secondaryBtn}
                >
                    <Ionicons
                        name="download-outline"
                        size={20}
                        color="#1E40AF"
                    />

                    <Text style={styles.secondaryBtnText}>
                        Descargar comprobante
                    </Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFF",
    },

    content: {
        padding: 16,
        gap: 16,
        paddingBottom: 40,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },

    successIcon: {
        alignItems: "center",
        marginBottom: 12,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1E3A5F",
        textAlign: "center",
    },

    subtitle: {
        marginTop: 6,
        textAlign: "center",
        color: "#64748B",
        fontSize: 14,
    },

    separator: {
        height: 1,
        backgroundColor: "#E2E8F0",
        marginVertical: 18,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 14,
    },

    label: {
        color: "#64748B",
        fontSize: 14,
    },

    value: {
        fontWeight: "600",
        color: "#1E293B",
    },

    total: {
        fontWeight: "700",
        color: "#F97316",
        fontSize: 18,
    },

    productsContainer: {
        marginTop: 10,
        gap: 10,
    },

    productsTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E3A5F",
        marginBottom: 6,
    },

    productRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 12,
    },

    productName: {
        flex: 1,
        fontWeight: "600",
        color: "#334155",
    },

    productQty: {
        width: 40,
        textAlign: "center",
        color: "#64748B",
    },

    productPrice: {
        fontWeight: "700",
        color: "#0F172A",
    },

    actions: {
        gap: 12,
    },

    primaryBtn: {
        backgroundColor: "#F97316",
        borderRadius: 14,
        paddingVertical: 16,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },

    primaryBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },

    secondaryBtn: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 14,
        paddingVertical: 14,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,

        backgroundColor: "#fff",
    },

    secondaryBtnText: {
        color: "#1E40AF",
        fontWeight: "700",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    backButton: {
        padding: 8,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1E3A5F",
        marginLeft: 10,
    },
});