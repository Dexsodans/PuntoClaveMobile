import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { palette, spacing, radius, typography, shadows } from "@/constants/Theme";
import { ModoRegistro } from "./CompraContext";

interface Props {
  onSeleccionar: (modo: ModoRegistro) => void;
}

export default function ModoSelector({ onSeleccionar }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¿Cómo deseas registrar?</Text>
      <Text style={styles.subtitulo}>Elige el método de ingreso de la compra</Text>

      <View style={styles.opciones}>
        {/* Manual */}
        <TouchableOpacity
          style={styles.tarjeta}
          onPress={() => onSeleccionar("manual")}
          activeOpacity={0.8}
        >
          <View style={[styles.iconoCont, { backgroundColor: palette.sky[100] }]}>
            <Text style={styles.icono}>📋</Text>
          </View>
          <Text style={styles.tituloTarjeta}>Manual</Text>
          <Text style={styles.descTarjeta}>
            Selecciona los productos del proveedor e ingresa las cantidades manualmente
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Recomendado</Text>
          </View>
        </TouchableOpacity>

        {/* OCR */}
        <TouchableOpacity
          style={styles.tarjeta}
          onPress={() => onSeleccionar("ocr")}
          activeOpacity={0.8}
        >
          <View style={[styles.iconoCont, { backgroundColor: palette.accentLight }]}>
            <Text style={styles.icono}>📷</Text>
          </View>
          <Text style={styles.tituloTarjeta}>Escanear factura</Text>
          <Text style={styles.descTarjeta}>
            Sube una foto de la factura y los datos se completarán automáticamente
          </Text>
          <View style={[styles.badge, styles.badgeOcr]}>
            <Text style={[styles.badgeText, styles.badgeOcrText]}>OCR</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.base,
  },
  titulo: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitulo: {
    fontSize: typography.size.base,
    color: palette.textSecondary,
    marginBottom: spacing.xl,
  },
  opciones: {
    gap: spacing.md,
  },
  tarjeta: {
    backgroundColor: palette.bgPrimary,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1.5,
    borderColor: palette.borderLight,
    ...shadows.md,
  },
  iconoCont: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  icono: {
    fontSize: 26,
  },
  tituloTarjeta: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
    marginBottom: spacing.xs,
  },
  descTarjeta: {
    fontSize: typography.size.base,
    color: palette.textSecondary,
    lineHeight: typography.size.base * typography.leading.normal,
    marginBottom: spacing.md,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: palette.sky[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    color: palette.actionPrimary,
  },
  badgeOcr: {
    backgroundColor: palette.accentLight,
  },
  badgeOcrText: {
    color: palette.accent,
  },
});