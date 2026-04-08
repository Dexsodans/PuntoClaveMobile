import { StyleSheet } from "react-native";
import { palette, typography, spacing, radius, shadows } from "@/constants/Theme";

export const styles = StyleSheet.create({

  // ── Screen ──
  container: {
    flex: 1,
    backgroundColor: palette.bgSecondary,
    position: "relative",
  },
  header: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: palette.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderLight,
  },
  titulo: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
  },
  subtitulo: {
    fontSize: typography.size.sm,
    color: palette.textMuted,
    marginTop: 2,
  },

  // ── Lista ──
  skeletonContainer: {
    padding: spacing.xs,
  },
  lista: {
    padding: spacing.sm,
    paddingBottom: spacing.xl,
  },
  footer: {
    marginVertical: spacing.lg,
    alignItems: "center" as const,
  },

  // ── Card ──
  card: {
    backgroundColor: palette.bgPrimary,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: palette.borderLight,
    ...shadows.md,
  },
  cardInactivo: {
    opacity: 0.45,
  },

  // ── Imagen ──
  imagenWrapper: {
    position: "relative" as const,
    marginRight: spacing.md,
  },
  imagen: {
    width: 85,
    height: 85,
    borderRadius: radius.md,
  },
  imagenPlaceholder: {
    width: 85,
    height: 85,
    borderRadius: radius.md,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  placeholderText: {
    color: palette.textInverse,
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
  },

  // ── Badges ──
  badgeOferta: {
    position: "absolute" as const,
    top: -6,
    left: -6,
    backgroundColor: palette.accent,
    borderRadius: radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeOfertaText: {
    color: palette.textInverse,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
  },
  badgeSinStock: {
    position: "absolute" as const,
    bottom: 4,
    left: 0,
    right: 0,
    backgroundColor: "rgba(239,68,68,0.88)",
    borderRadius: radius.sm,
    alignItems: "center" as const,
    paddingVertical: 3,
  },
  badgeSinStockText: {
    color: palette.textInverse,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
  },

  // ── Info ──
  info: {
    flex: 1,
    gap: 2,
  },
  headerRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  codigo: {
    fontSize: typography.size.xs,
    color: palette.textMuted,
    fontWeight: typography.weight.medium,
  },
  proveedorChip: {
    backgroundColor: palette.sky[100],
    borderRadius: radius.full,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  proveedorChipText: {
    fontSize: typography.size.xs,
    color: palette.sky[700],
    fontWeight: typography.weight.semibold,
  },
  nombre: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: palette.textPrimary,
    lineHeight: typography.size.md * 1.3,
    marginTop: 2,
  },
  descripcion: {
    fontSize: typography.size.sm,
    color: palette.textSecondary,
    lineHeight: typography.size.sm * 1.4,
  },

  // ── Stock bar ──
  stockRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: spacing.xs,
    marginTop: 4,
  },
  stockBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: palette.bgTertiary,
    borderRadius: radius.full,
    overflow: "hidden" as const,
  },
  stockBarFill: {
    height: 4,
    borderRadius: radius.full,
  },
  stockText: {
    fontSize: typography.size.xs,
    color: palette.textMuted,
    minWidth: 28,
    textAlign: "right" as const,
  },

  // ── Precios ──
  precioRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: spacing.sm,
    marginTop: 4,
  },
  precio: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: palette.pricePrimary,
  },
  precioTachado: {
    fontSize: typography.size.sm,
    color: palette.priceStrike,
    textDecorationLine: "line-through" as const,
  },
  precioOferta: {
    fontSize: typography.size.sm,
    color: palette.priceOffer,
    fontWeight: typography.weight.semibold,
  },

  // ── Botón + ──
  botonAgregar: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    backgroundColor: palette.actionPrimary,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginLeft: spacing.sm,
    ...shadows.sky,
  },
  botonAgregarText: {
    color: palette.textInverse,
    fontSize: 22,
    fontWeight: typography.weight.bold,
    lineHeight: 26,
  },

  // ── Skeleton ──
  skeletonCard: {
    backgroundColor: palette.bgPrimary,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    padding: spacing.md,
  },
  skeletonInfo: {
    flex: 1,
    gap: 2,
  },
});