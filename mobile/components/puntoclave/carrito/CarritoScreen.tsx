import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "@/lib/api";
import { palette, typography, spacing, radius, shadows } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";

interface ItemCarrito {
  id: number;
  NOM_PRO: string;
  IMAGEN_PRO?: string;
  CANT_CAR: number;
  SUB_TOTAL_CAR: number;
  PRECIO_VENTA_PRO: number;
}

export default function CarritoScreen() {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [loading, setLoading] = useState(true);

const fetchCarrito = async () => {
  try {

    const userData = await AsyncStorage.getItem("user");
    const user = JSON.parse(userData || "{}");

    const res = await fetch(`${BASE_URL}/api/carrito/?user_id=${user.id}`);
    const data:any = await res.json();

    console.log("carrito:", data);

    setItems(data.data || []);

  } catch (e) {
    console.log(e);
    setItems([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { fetchCarrito(); }, []);

  const total = items.reduce((acc, i) => acc + Number(i.SUB_TOTAL_CAR), 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Mi Carrito</Text>
        <Text style={styles.subtitulo}>{items.length} productos</Text>
      </View>

      {/* Lista */}
      <FlatList
        data={items || []}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="cart-outline" size={64} color={palette.textMuted} />
              <Text style={styles.emptyText}>Tu carrito está vacío</Text>
            </View>
          ) : null
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInRight.delay(index * 60).springify()}>
            <View style={styles.card}>
              {item.IMAGEN_PRO ? (
                <Image source={{ uri: item.IMAGEN_PRO }} style={styles.imagen} resizeMode="cover" />
              ) : (
                <View style={[styles.imagenPlaceholder]}>
                  <Text style={styles.placeholderText}>{item.NOM_PRO}</Text>
                </View>
              )}
              <View style={styles.info}>
                <Text style={styles.nombre} numberOfLines={2}>{item.NOM_PRO}</Text>
                <Text style={styles.precio}>Bs. {Number(item.PRECIO_VENTA_PRO).toFixed(2)}</Text>
                <View style={styles.cantRow}>
                  <View style={styles.cantBadge}>
                    <Text style={styles.cantText}>x{item.CANT_CAR}</Text>
                  </View>
                  <Text style={styles.subtotal}>Bs. {Number(item.SUB_TOTAL_CAR).toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}
      />

      {/* Footer total */}
      {items.length > 0 && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValor}>Bs. {total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.btnCheckout} activeOpacity={0.85}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            <Text style={styles.btnCheckoutText}>Confirmar pedido</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bgSecondary },
  header: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: palette.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderLight,
  },
  titulo: { fontSize: typography.size["2xl"], fontWeight: typography.weight.bold, color: palette.textPrimary },
  subtitulo: { fontSize: typography.size.sm, color: palette.textMuted, marginTop: 2 },
  lista: { padding: spacing.sm, paddingBottom: spacing.xl },
  card: {
    backgroundColor: palette.bgPrimary,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderWidth: 1,
    borderColor: palette.borderLight,
    ...shadows.md,
  },
  imagen: { width: 70, height: 70, borderRadius: radius.md, marginRight: spacing.md },
  imagenPlaceholder: {
    width: 70, height: 70, borderRadius: radius.md,
    backgroundColor: palette.actionPrimary,
    alignItems: "center", justifyContent: "center",
    marginRight: spacing.md,
  },
  placeholderText: { color: "#fff", fontSize: typography.size.xl, fontWeight: typography.weight.bold },
  info: { flex: 1, gap: 4 },
  nombre: { fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: palette.textPrimary },
  precio: { fontSize: typography.size.sm, color: palette.textSecondary },
  cantRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  cantBadge: {
    backgroundColor: palette.sky[100],
    borderRadius: radius.full,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  cantText: { fontSize: typography.size.xs, color: palette.sky[700], fontWeight: typography.weight.bold },
  subtotal: { fontSize: typography.size.md, fontWeight: typography.weight.bold, color: palette.pricePrimary },
  emptyContainer: { alignItems: "center", marginTop: 80, gap: 12 },
  emptyText: { fontSize: typography.size.lg, color: palette.textMuted },
  footer: {
    backgroundColor: palette.bgPrimary,
    padding: spacing.base,
    borderTopWidth: 1,
    borderTopColor: palette.borderLight,
    ...shadows.lg,
  },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.md },
  totalLabel: { fontSize: typography.size.lg, color: palette.textSecondary, fontWeight: typography.weight.medium },
  totalValor: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: palette.pricePrimary },
  btnCheckout: {
    backgroundColor: palette.actionPrimary,
    borderRadius: radius.lg,
    padding: spacing.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    ...shadows.sky,
  },
  btnCheckoutText: { color: "#fff", fontSize: typography.size.md, fontWeight: typography.weight.bold },
});