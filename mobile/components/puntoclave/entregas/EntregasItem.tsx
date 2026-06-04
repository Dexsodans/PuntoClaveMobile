import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { palette, typography, radius, shadows, spacing } from "@/constants/Theme";
import { Feather } from "@expo/vector-icons";

interface Props {
  entrega: any;
  index: number;
  onPress: () => void;
}

const estadoConfig = {
  1: { label: "Cerrado",    bg: palette.success.light, color: palette.success.dark },
  2: { label: "En proceso", bg: palette.info.light,    color: palette.info.dark    },
  3: { label: "Pendiente",  bg: palette.warning.light, color: palette.warning.dark },
} as const;

export default function EntregasItem({ entrega, index, onPress }: Props) {
  const est = estadoConfig[entrega.EST_CAJA as 1 | 2 | 3] ?? estadoConfig[3];

  return (
    <Animated.View entering={FadeInRight.delay(index * 80)}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>

        {/* Header: código + badge */}
        <View style={styles.header}>
          <View style={styles.codigoRow}>
            <Feather name="package" size={15} color={palette.actionPrimary} />
            <Text style={styles.codigo}>{entrega.COD_CAJA}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: est.bg }]}>
            <Text style={[styles.badgeText, { color: est.color }]}>{est.label}</Text>
          </View>
        </View>

        {/* Ruta */}
        <View style={styles.rutaRow}>
          <Feather name="map-pin" size={13} color={palette.actionPrimary} />
          <Text style={styles.ruta}>{entrega.nombre_ruta}</Text>
        </View>

        <View style={styles.divider} />

        {/* Fecha */}
        <View style={styles.metaRow}>
          <Feather name="clock" size={12} color={palette.textMuted} />
          <Text style={styles.fecha}>
            {new Date(entrega.FECHA_CREACION_CAJA).toLocaleString()}
          </Text>
          <Feather name="arrow-right" size={12} color={palette.textMuted} style={styles.arrow} />
          <Text style={styles.verDetalle}>Ver detalles</Text>
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

    rutaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    ruta: {
        fontSize: typography.size.sm + 1,
        color: palette.actionPrimary,
        fontWeight: typography.weight.medium,
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

    fecha: {
        fontSize: typography.size.xs + 1,
        color: palette.textMuted,
        flex: 1,
    },

    arrow: {
        marginLeft: 4,
    },

    verDetalle: {
        fontSize: typography.size.xs + 1,
        color: palette.textMuted,
    },
    });