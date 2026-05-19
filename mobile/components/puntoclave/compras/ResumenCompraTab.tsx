import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useCompra } from "./CompraContext";
import { palette, spacing, radius, typography, shadows } from "@/constants/Theme";

interface Props {
  onAtras: () => void;
  onExito: () => void;
}

export default function ResumenCompraTab({ onAtras, onExito }: Props) {
  const { items, total, proveedorNombre, modo, confirmarCompra, cargandoConfirmar, resetear } = useCompra();

  const hoy = new Date().toISOString().split("T")[0];
  const [facturaNumero, setFacturaNumero] = useState("");
  const [fecha, setFecha] = useState(hoy);

  const handleConfirmar = async () => {
    if (!facturaNumero.trim()) {
      Alert.alert("Falta el número de factura", "Ingresa el número de factura para continuar.");
      return;
    }

    Alert.alert(
      "Confirmar registro",
      `¿Registrar compra por Bs ${total.toFixed(2)} de ${proveedorNombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            const resultado = await confirmarCompra(facturaNumero.trim(), fecha);
            if (resultado.success) {
              Alert.alert("✅ Compra registrada", "La compra fue registrada exitosamente.", [
                {
                  text: "Aceptar",
                  onPress: () => {
                    resetear();
                    onExito();
                  },
                },
              ]);
            } else {
              Alert.alert("Error", resultado.error || "No se pudo registrar la compra.");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Resumen de compra</Text>
        <View style={styles.modoBadge}>
          <Text style={styles.modoBadgeText}>
            {modo === "ocr" ? "📷 OCR" : "📋 Manual"}
          </Text>
        </View>
      </View>

      {/* Info proveedor */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Proveedor</Text>
        <Text style={styles.cardValor}>{proveedorNombre}</Text>
      </View>

      {/* Datos de la factura */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Número de factura *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: F-001234"
          placeholderTextColor={palette.textMuted}
          value={facturaNumero}
          onChangeText={setFacturaNumero}
          autoCapitalize="characters"
        />

        <Text style={[styles.cardLabel, { marginTop: spacing.md }]}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={palette.textMuted}
          value={fecha}
          onChangeText={setFecha}
        />
      </View>

      {/* Lista de productos */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Productos ({items.length})</Text>

        {items.map((item, idx) => (
          <View
            key={item.id}
            style={[
              styles.filaProducto,
              idx < items.length - 1 && styles.filaProductoBorde,
            ]}
          >
            <View style={styles.filaInfo}>
              <Text style={styles.filaProductoNombre} numberOfLines={1}>
                {item.nombre}
              </Text>
              <Text style={styles.filaCantidad}>× {item.cantidad}</Text>
            </View>
            <Text style={styles.filaSubtotal}>Bs {item.subtotal.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total de compra</Text>
        <Text style={styles.totalValor}>Bs {total.toFixed(2)}</Text>
      </View>

      {/* Botones */}
      <View style={styles.botones}>
        <TouchableOpacity
          style={styles.btnAtras}
          onPress={onAtras}
          disabled={cargandoConfirmar}
        >
          <Text style={styles.btnAtrasText}>← Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnConfirmar, cargandoConfirmar && styles.btnDeshabilitado]}
          onPress={handleConfirmar}
          disabled={cargandoConfirmar}
          activeOpacity={0.8}
        >
          {cargandoConfirmar ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.btnConfirmarText}>✓ Confirmar registro</Text>
          )}
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bgSecondary,
  },
  content: {
    padding: spacing.base,
    gap: spacing.md,
    paddingBottom: spacing["3xl"],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  titulo: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
  },
  modoBadge: {
    backgroundColor: palette.sky[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  modoBadgeText: {
    fontSize: typography.size.sm,
    color: palette.actionPrimary,
    fontWeight: typography.weight.semibold,
  },
  card: {
    backgroundColor: palette.bgPrimary,
    borderRadius: radius.lg,
    padding: spacing.base,
    ...shadows.sm,
  },
  cardLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: palette.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  cardValor: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
  },
  input: {
    borderWidth: 1.5,
    borderColor: palette.borderMedium,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.size.base,
    color: palette.textPrimary,
    backgroundColor: palette.bgTertiary,
  },
  filaProducto: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  filaProductoBorde: {
    borderBottomWidth: 1,
    borderColor: palette.borderLight,
  },
  filaInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  filaProductoNombre: {
    flex: 1,
    fontSize: typography.size.base,
    color: palette.textPrimary,
  },
  filaCantidad: {
    fontSize: typography.size.sm,
    color: palette.textMuted,
    fontWeight: typography.weight.medium,
  },
  filaSubtotal: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: palette.pricePrimary,
    minWidth: 80,
    textAlign: "right",
  },
  totalCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: palette.actionPrimary,
    borderRadius: radius.lg,
    padding: spacing.base,
    ...shadows.sky,
  },
  totalLabel: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: "rgba(255,255,255,0.85)",
  },
  totalValor: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: "white",
  },
  botones: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
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
  btnConfirmar: {
    flex: 2,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: palette.success.main,
    alignItems: "center",
    ...shadows.md,
  },
  btnDeshabilitado: {
    opacity: 0.6,
  },
  btnConfirmarText: {
    color: "white",
    fontWeight: typography.weight.bold,
    fontSize: typography.size.md,
  },
});