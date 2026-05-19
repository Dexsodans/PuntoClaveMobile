import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useCompra } from "./CompraContext";
import { palette, spacing, radius, typography, shadows } from "@/constants/Theme";

interface Props {
  onSiguiente: () => void;
  onAtras: () => void;
}

export default function DetalleCompraTab({ onSiguiente, onAtras }: Props) {
  const { items, actualizarCantidad, eliminarItem, total } = useCompra();
  console.log("Render DetalleCompraTab con items:", items);
  const handleCantidad = (id: number, valor: string) => {
    const num = parseInt(valor);
    if (!isNaN(num) && num > 0) {
      actualizarCantidad(id, num);
    }
  };

  const handleEliminar = (id: number, nombre: string) => {
    Alert.alert(
      "Eliminar producto",
      `¿Eliminar "${nombre}" del detalle?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => eliminarItem(id) },
      ]
    );
  };

  const handleSiguiente = () => {
    if (items.length === 0) {
      Alert.alert("Sin productos", "Agrega al menos un producto antes de continuar.");
      return;
    }
    onSiguiente();
  };

  return (
    <View style={styles.container}>
      {/* Encabezado tabla */}
      <View style={styles.encabezado}>
        <Text style={[styles.col, { flex: 2 }]}>Producto</Text>
        <Text style={[styles.col, styles.colCentro]}>Cant.</Text>
        <Text style={[styles.col, styles.colDerecha]}>Subtotal</Text>
        <Text style={[styles.col, { width: 32 }]}> </Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={styles.vacioIcono}>🛒</Text>
          <Text style={styles.vacioTexto}>No hay productos agregados</Text>
          <Text style={styles.vacioSub}>Vuelve atrás y agrega productos</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: spacing.xl }}
          renderItem={({ item }) => (
            <View style={styles.fila}>
              <Text style={[styles.celda, { flex: 2 }]} numberOfLines={2}>
                {item.nombre}
              </Text>

              {/* Input de cantidad */}
              <TextInput
                style={styles.inputCantidad}
                keyboardType="numeric"
                value={item.cantidad.toString()}
                onChangeText={(val) => handleCantidad(item.id, val)}
                selectTextOnFocus
              />

              <Text style={[styles.celda, styles.celdaDerecha]}>
                Bs {item.subtotal.toFixed(2)}
              </Text>

              <TouchableOpacity
                onPress={() => handleEliminar(item.id, item.nombre)}
                style={styles.btnEliminar}
              >
                <Text style={styles.eliminarText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total de compra</Text>
        <Text style={styles.totalValor}>Bs {total.toFixed(2)}</Text>
      </View>

      {/* Botones */}
      <View style={styles.botones}>
        <TouchableOpacity style={styles.btnAtras} onPress={onAtras}>
          <Text style={styles.btnAtrasText}>← Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSiguiente} onPress={handleSiguiente}>
          <Text style={styles.btnSiguienteText}>Continuar →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bgSecondary,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.bgTertiary,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderColor: palette.borderLight,
  },
  col: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: palette.textSecondary,
    textTransform: "uppercase",
  },
  colCentro: {
    width: 60,
    textAlign: "center",
  },
  colDerecha: {
    width: 90,
    textAlign: "right",
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.bgPrimary,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderColor: palette.borderLight,
  },
  celda: {
    fontSize: typography.size.base,
    color: palette.textPrimary,
  },
  celdaDerecha: {
    width: 90,
    textAlign: "right",
    fontWeight: typography.weight.medium,
    color: palette.pricePrimary,
  },
  inputCantidad: {
    width: 60,
    textAlign: "center",
    borderWidth: 1.5,
    borderColor: palette.actionPrimary,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    fontSize: typography.size.base,
    color: palette.textPrimary,
    backgroundColor: palette.sky[50],
  },
  btnEliminar: {
    width: 32,
    alignItems: "center",
  },
  eliminarText: {
    color: palette.textNegative,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
  vacio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing["2xl"],
    gap: spacing.sm,
  },
  vacioIcono: {
    fontSize: 48,
  },
  vacioTexto: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: palette.textPrimary,
  },
  vacioSub: {
    fontSize: typography.size.base,
    color: palette.textMuted,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: palette.bgPrimary,
    borderTopWidth: 2,
    borderColor: palette.actionPrimary,
    ...shadows.md,
  },
  totalLabel: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: palette.textSecondary,
  },
  totalValor: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: palette.pricePrimary,
  },
  botones: {
    flexDirection: "row",
    gap: spacing.sm,
    padding: spacing.base,
    backgroundColor: palette.bgPrimary,
  },
  btnAtras: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: palette.borderMedium,
    alignItems: "center",
  },
  btnAtrasText: {
    color: palette.textSecondary,
    fontWeight: typography.weight.semibold,
  },
  btnSiguiente: {
    flex: 2,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: palette.actionPrimary,
    alignItems: "center",
    ...shadows.sky,
  },
  btnSiguienteText: {
    color: "white",
    fontWeight: typography.weight.bold,
    fontSize: typography.size.md,
  },
});