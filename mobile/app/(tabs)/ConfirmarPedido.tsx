import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import BASE_URL from "@/lib/api";

export default function ConfirmarPedidoScreen() {

    const router = useRouter();
    const params = useLocalSearchParams();

    const items = params.items ? JSON.parse(params.items as string) : [];
    const total = Number(params.total);

    const [marker, setMarker] = useState<any>(null);
    const [direccion, setDireccion] = useState<string>("");
    const [fecha, setFecha] = useState<Date>(new Date());
    const [fechaSeleccionada, setFechaSeleccionada] = useState(false);
    const [horaSeleccionada, setHoraSeleccionada] = useState(false);

    const formatFecha = (date: Date) =>
        date.toLocaleDateString("es-BO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    const formatHora = (date: Date) =>
        date.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit", hour12: false });

    const openDatePicker = () => {
        DateTimePickerAndroid.open({
            value: fecha,
            mode: "date",
            minimumDate: new Date(),
            maximumDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
            onChange: (event, selectedDate) => {
                if (selectedDate) {
                    setFecha(selectedDate);
                    setFechaSeleccionada(true);
                }
            },
        });
    };

    const openTimePicker = () => {
        DateTimePickerAndroid.open({
            value: fecha,
            mode: "time",
            is24Hour: true,
            onChange: (event, selectedDate) => {
                if (!selectedDate) return;
                const hour = selectedDate.getHours();
                if (hour < 9 || hour > 19) return;
                const nuevaFecha = new Date(fecha);
                nuevaFecha.setHours(selectedDate.getHours());
                nuevaFecha.setMinutes(selectedDate.getMinutes());
                setFecha(nuevaFecha);
                setHoraSeleccionada(true);
            },
        });
    };

    const handleMapPress = async (e: any) => {
        const coord = e.nativeEvent.coordinate;
        setMarker(coord);
        setDireccion("Obteniendo dirección...");
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${coord.latitude}&lon=${coord.longitude}&format=json`,
                { headers: { "Accept-Language": "es" } }
            );
            const data:any = await res.json();
            setDireccion(data.display_name || "Dirección no encontrada");
        } catch {
            setDireccion("Ubicación marcada, pero no se pudo obtener la dirección");
        }
    };

    const registrarPedido = async () => {
        try {
            const userData = await AsyncStorage.getItem("user");
            const token = await AsyncStorage.getItem("token");
            const user = JSON.parse(userData || "{}");

            if (!marker) { console.log("Selecciona una ubicación"); return; }
            if (!fechaSeleccionada || !horaSeleccionada) { console.log("Debes seleccionar fecha y hora"); return; }

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
            const id_ubi = ubiData["ubicacion creada"].id;

            const pedidoRes = await fetch(`${BASE_URL}/api/pedidos/`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ id_usu: user.id, id_ubi, TOTAL_PEDI: total, FECHA_PEDI: fecha }),
            });
            const pedidoData: any = await pedidoRes.json();
            const id_pedi = pedidoData["pedido creado"].id;

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

            router.replace("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Confirmar Pedido</Text>
                <Text style={styles.headerTotal}>Total: Bs. {total.toFixed(2)}</Text>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

                {/* MAPA */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="location-outline" size={18} color="#F97316" />
                        <Text style={styles.cardTitle}>Ubicación de entrega</Text>
                    </View>
                    <Text style={styles.cardHint}>Toca el mapa para marcar tu dirección</Text>

                    <View style={styles.mapWrapper}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: -16.5,
                                longitude: -68.15,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                            onPress={handleMapPress}
                        >
                            {marker && <Marker coordinate={marker} pinColor="#F97316" />}
                        </MapView>
                    </View>

                    {/* DIRECCIÓN READONLY */}
                    <View style={styles.direccionWrapper}>
                        <Ionicons name="map-outline" size={16} color="#38BDF8" style={{ marginTop: 2 }} />
                        <TextInput
                            style={styles.direccionInput}
                            value={marker ? direccion : "Ninguna ubicación seleccionada"}
                            editable={false}
                            multiline
                            placeholder="Ninguna ubicación seleccionada"
                            placeholderTextColor="#94A3B8"
                        />
                    </View>
                </View>

                {/* FECHA Y HORA */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="calendar-outline" size={18} color="#F97316" />
                        <Text style={styles.cardTitle}>Fecha y hora de entrega</Text>
                    </View>
                    <Text style={styles.cardHint}>Entregas disponibles de 9:00 a 19:00</Text>

                    <View style={styles.pickerRow}>
                        <TouchableOpacity style={styles.pickerBtn} onPress={openDatePicker} activeOpacity={0.8}>
                            <Ionicons name="calendar" size={20} color="#1E40AF" />
                            <Text style={styles.pickerBtnLabel}>Elegir fecha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.pickerBtn} onPress={openTimePicker} activeOpacity={0.8}>
                            <Ionicons name="time" size={20} color="#1E40AF" />
                            <Text style={styles.pickerBtnLabel}>Elegir hora</Text>
                        </TouchableOpacity>
                    </View>

                    {/* FECHA SELECCIONADA */}
                    {fechaSeleccionada && (
                        <View style={styles.selectedRow}>
                            <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
                            <Text style={styles.selectedText}>{formatFecha(fecha)}</Text>
                        </View>
                    )}
                    {horaSeleccionada && (
                        <View style={styles.selectedRow}>
                            <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
                            <Text style={styles.selectedText}>Hora: {formatHora(fecha)}</Text>
                        </View>
                    )}
                    {(!fechaSeleccionada || !horaSeleccionada) && (
                        <View style={styles.selectedRow}>
                            <Ionicons name="information-circle-outline" size={16} color="#94A3B8" />
                            <Text style={styles.placeholderText}>
                                {!fechaSeleccionada && !horaSeleccionada
                                    ? "Aún no seleccionaste fecha ni hora"
                                    : !fechaSeleccionada
                                    ? "Falta seleccionar la fecha"
                                    : "Falta seleccionar la hora"}
                            </Text>
                        </View>
                    )}
                </View>

                {/* RESUMEN */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="receipt-outline" size={18} color="#F97316" />
                        <Text style={styles.cardTitle}>Resumen del pedido</Text>
                    </View>
                    {items.map((item: any, idx: number) => (
                        <View key={idx} style={styles.itemRow}>
                            <Text style={styles.itemName} numberOfLines={1}>
                                {item.CANT_CAR}x {item.NOMBRE_PRO || `Producto #${item.id_pro}`}
                            </Text>
                            <Text style={styles.itemPrice}>Bs. {Number(item.SUB_TOTAL_CAR).toFixed(2)}</Text>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <View style={styles.itemRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalPrice}>Bs. {total.toFixed(2)}</Text>
                    </View>
                </View>

            </ScrollView>

            {/* BOTÓN CONFIRMAR */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmBtn} onPress={registrarPedido} activeOpacity={0.85}>
                    <Ionicons name="checkmark-done" size={20} color="#fff" />
                    <Text style={styles.confirmBtnText}>Confirmar pedido</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    header: {
        backgroundColor: "#ffffff",
        paddingTop: 52,
        paddingBottom: 18,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    headerTitle: {
        color: "#000000",
        fontSize: 22,
        fontWeight: "700",
        letterSpacing: 0.3,
    },
    headerTotal: {
        color: "#ff8000",
        fontSize: 15,
        fontWeight: "600",
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        gap: 14,
        paddingBottom: 24,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#1E40AF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 14,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E40AF",
    },
    cardHint: {
        fontSize: 12,
        color: "#94A3B8",
        marginBottom: 12,
        marginLeft: 2,
    },
    mapWrapper: {
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#BAE6FD",
        height: 220,
    },
    map: {
        flex: 1,
    },
    direccionWrapper: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
        marginTop: 12,
        backgroundColor: "#F0F9FF",
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#BAE6FD",
    },
    direccionInput: {
        flex: 1,
        fontSize: 13,
        color: "#1E40AF",
        lineHeight: 18,
    },
    pickerRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 12,
    },
    pickerBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#EFF6FF",
        borderWidth: 1.5,
        borderColor: "#93C5FD",
        borderRadius: 12,
        paddingVertical: 12,
    },
    pickerBtnLabel: {
        color: "#1E40AF",
        fontWeight: "600",
        fontSize: 14,
    },
    selectedRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 4,
    },
    selectedText: {
        color: "#166534",
        fontSize: 13,
        fontWeight: "500",
        flex: 1,
    },
    placeholderText: {
        color: "#94A3B8",
        fontSize: 13,
        fontStyle: "italic",
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
    },
    itemName: {
        color: "#334155",
        fontSize: 14,
        flex: 1,
        marginRight: 8,
    },
    itemPrice: {
        color: "#F97316",
        fontWeight: "600",
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: "#E2E8F0",
        marginVertical: 8,
    },
    totalLabel: {
        color: "#1E40AF",
        fontWeight: "700",
        fontSize: 16,
    },
    totalPrice: {
        color: "#F97316",
        fontWeight: "800",
        fontSize: 17,
    },
    footer: {
        padding: 16,
        paddingBottom: 28,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 6,
    },
    confirmBtn: {
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
    confirmBtnText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 0.3,
    },
});
