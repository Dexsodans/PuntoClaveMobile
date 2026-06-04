import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { palette, typography, radius, shadows, spacing } from "@/constants/Theme";
import { Feather } from "@expo/vector-icons";

interface Props {
  ruta: any;
  index: number;
  onPress: () => void;
}

const estadoConfig: Record<string, { label: string; bg: string; color: string }> = {
  "1": { label: "Pendiente",  bg: palette.warning.light, color: palette.warning.dark  },
  "2": { label: "En proceso", bg: palette.info.light,    color: palette.info.dark     },
  "3": { label: "Entregado",  bg: palette.success.light, color: palette.success.dark  },
  "4": { label: "Cancelado",  bg: palette.error.light,   color: palette.error.dark    },
};

export default function RutasItem({ ruta, index, onPress }: Props) {
  const pedido = ruta.pedido;
  const est = estadoConfig[String(pedido?.EST_PEDI)] ?? {
    label: String(pedido?.EST_PEDI ?? "—"),
    bg: palette.info.light,
    color: palette.info.dark,
  };

  return (
    <Animated.View entering={FadeInRight.delay(index * 80)}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>

        {/* Header: código + badge */}
        <View style={styles.header}>
          <View style={styles.codigoRow}>
            <Feather name="navigation" size={15} color={palette.actionPrimary} />
            <Text style={styles.codigo}>{pedido?.COD_PEDI}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: est.bg }]}>
            <Text style={[styles.badgeText, { color: est.color }]}>{est.label}</Text>
          </View>
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>Bs. {pedido?.TOTAL_PEDI}</Text>
        </View>

        <View style={styles.divider} />

        {/* Footer */}
        <View style={styles.metaRow}>
          <Feather name="arrow-right" size={12} color={palette.textMuted} />
          <Text style={styles.verDetalle}>Ver pedido</Text>
        </View>

      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.bgPrimary,
    borderRadius: radius.lg,
    marginHorizontal: spacing.base,
    marginVertical: spacing.xs + 1,
    padding: spacing.base,
    gap: spacing.sm - 2,
    ...shadows.sm,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  codigoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  codigo: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    color: palette.textPrimary,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
  },

  badgeText: {
    fontSize: typography.size.xs + 1,
    fontWeight: typography.weight.medium,
  },

  totalRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },

  totalLabel: {
    fontSize: typography.size.sm,
    color: palette.textSecondary,
  },

  totalValue: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
    color: palette.actionPrimary,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.borderLight,
    marginVertical: 2,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  verDetalle: {
    fontSize: typography.size.xs + 1,
    color: palette.textMuted,
  },
});