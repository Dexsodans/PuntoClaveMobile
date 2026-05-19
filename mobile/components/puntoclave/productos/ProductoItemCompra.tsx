import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useCompra } from "@/components/puntoclave/compras/CompraContext";
import { palette, spacing, radius, typography, shadows } from "@/constants/Theme";

export default function ProductoItemCompra({ producto }: any) {
  const { agregarItem, items } = useCompra();

  const itemEnCarrito = items.find(i => i.id === producto.id);
  const cantidadEnCarrito = itemEnCarrito?.cantidad ?? 0;

  return (
    <View style={styles.card}>
      {producto.IMAGEN_PRO ? (
        <Image source={{ uri: producto.IMAGEN_PRO }} style={styles.imagen} />
      ) : (
        <View style={styles.imagenPlaceholder}>
          <Text style={styles.imagenPlaceholderText}>📦</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.nombre} numberOfLines={2}>
          {producto.NOM_PRO}
        </Text>
        <Text style={styles.precio}>Bs {Number(producto.PRECIO_VENTA_PRO).toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={[styles.btn, cantidadEnCarrito > 0 && styles.btnAgregado]}
        onPress={() => agregarItem(producto)}
        activeOpacity={0.75}
      >
        {cantidadEnCarrito > 0 ? (
          <Text style={styles.btnText}>+{cantidadEnCarrito}</Text>
        ) : (
          <Text style={styles.btnText}>+ Agregar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.bgPrimary,
    marginHorizontal: spacing.base,
    marginVertical: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
    gap: spacing.md,
    ...shadows.sm,
  },
  imagen: {
    width: 52,
    height: 52,
    borderRadius: radius.sm,
    backgroundColor: palette.bgTertiary,
  },
  imagenPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: radius.sm,
    backgroundColor: palette.bgTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  imagenPlaceholderText: {
    fontSize: 24,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  nombre: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: palette.textPrimary,
  },
  precio: {
    fontSize: typography.size.base,
    color: palette.pricePrimary,
    fontWeight: typography.weight.medium,
  },
  btn: {
    backgroundColor: palette.actionPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    minWidth: 80,
    alignItems: "center",
  },
  btnAgregado: {
    backgroundColor: palette.actionSecondary,
  },
  btnText: {
    color: "white",
    fontWeight: typography.weight.bold,
    fontSize: typography.size.sm,
  },
});