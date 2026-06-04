import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { palette, typography, radius, shadows, spacing } from "@/constants/Theme";

interface Analisis {
  cliente_id: number; nombre: string; riesgo: string;
  probabilidad: number; tenure_meses: number;
  gasto_mensual_promedio: number; gasto_total: number;
  ultima_compra: string; dias_sin_comprar: number; recomendacion: string;
}
interface Props { id_cli: string; onClose: () => void; }

const riesgoConfig: Record<string, { label: string; bg: string; color: string }> = {
  alto:  { label: "Riesgo alto",   bg: palette.error.light,   color: palette.error.dark   },
  medio: { label: "Riesgo medio",  bg: palette.warning.light, color: palette.warning.dark },
  bajo:  { label: "Riesgo bajo",   bg: palette.success.light, color: palette.success.dark },
};

export default function AnalisisCliente({ id_cli, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [analisis, setAnalisis] = useState<Analisis | null>(null);

  useEffect(() => {
    if (!id_cli) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("http://192.168.31.195:8001/predecir-churn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cliente_id: Number(id_cli) }),
        });
        const data: any = await res.json();

        setAnalisis(data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [id_cli]);

  const est = riesgoConfig[analisis?.riesgo?.toLowerCase() ?? ""] ?? riesgoConfig.medio;
  const prob = Math.round((analisis?.probabilidad ?? 0) * 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Topbar */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={onClose}>
          <Feather name="arrow-left" size={20} color={palette.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Análisis de cliente</Text>
        <View style={styles.aiBadge}>
          <Feather name="zap" size={11} color={palette.info.dark} />
          <Text style={styles.aiBadgeText}>IA</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 60 }} color={palette.actionPrimary} size="large" />
      ) : (
        <>
          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.avatar}>
              <Feather name="user" size={26} color={palette.sky[700]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroName}>{analisis?.nombre}</Text>
              <Text style={styles.heroSub}>Cliente desde hace {analisis?.tenure_meses} meses</Text>
            </View>
            <View style={[styles.riesgoBadge, { backgroundColor: est.bg }]}>
              <Text style={[styles.riesgoText, { color: est.color }]}>{est.label}</Text>
            </View>
          </View>

          {/* Probabilidad */}
          <View style={styles.card}>
            <View style={styles.probHeader}>
              <Text style={styles.cardLabel}>Probabilidad de churn</Text>
              <Text style={styles.probNum}>{prob}%</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${prob}%` }]} />
            </View>
            <View style={styles.barTicks}>
              {["Bajo", "Medio", "Alto"].map(t => (
                <Text key={t} style={styles.barTick}>{t}</Text>
              ))}
            </View>
          </View>

          {/* Stats grid */}
          <Text style={styles.sectionTitle}>Métricas</Text>
          <View style={styles.grid}>
            {[
              { icon: "clock",        label: "Sin comprar",    value: `${analisis?.dias_sin_comprar} días`, warn: (analisis?.dias_sin_comprar ?? 0) > 20 },
              { icon: "trending-up",  label: "Gasto mensual",  value: `Bs. ${analisis?.gasto_mensual_promedio}`, sky: true },
              { icon: "dollar-sign",  label: "Gasto total",    value: `Bs. ${analisis?.gasto_total}`, sky: true },
              { icon: "calendar",     label: "Última compra",  value: analisis?.ultima_compra ?? "—" },
            ].map(({ icon, label, value, warn, sky }) => (
              <View key={label} style={styles.stat}>
                <View style={styles.statLabel}>
                  <Feather name={icon as any} size={13} color={palette.textSecondary} />
                  <Text style={styles.statLabelText}>{label}</Text>
                </View>
                <Text style={[styles.statValue, warn && { color: palette.warning.light }, sky && { color: palette.actionPrimary }]}>
                  {value}
                </Text>
              </View>
            ))}
          </View>

          {/* Recomendación */}
          <View style={styles.rec}>
            <View style={styles.recIcon}>
              <Feather name="zap" size={18} color={palette.info.dark} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.recTitle}>Recomendación IA</Text>
              <Text style={styles.recText}>{analisis?.recomendacion}</Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bgSecondary },
  content: { padding: spacing.base, gap: spacing.md, paddingBottom: spacing["3xl"] },

  topbar: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  backBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: palette.bgPrimary, borderWidth: 0.5, borderColor: palette.borderMedium,
    alignItems: "center", justifyContent: "center",
  },
  pageTitle: { flex: 1, fontSize: typography.size.base + 1, fontWeight: typography.weight.medium, color: palette.textPrimary },
  aiBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: palette.info.light, borderWidth: 0.5, borderColor: palette.sky[200],
    borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 3,
  },
  aiBadgeText: { fontSize: typography.size.xs, fontWeight: typography.weight.medium, color: palette.info.dark },

  hero: {
    backgroundColor: palette.bgPrimary, borderRadius: radius.lg,
    padding: spacing.base, flexDirection: "row", alignItems: "center", gap: spacing.md,
    ...shadows.sm,
  },
  avatar: {
    width: 52, height: 52, borderRadius: radius.full,
    backgroundColor: palette.sky[100], alignItems: "center", justifyContent: "center",
  },
  heroName: { fontSize: typography.size.base, fontWeight: typography.weight.medium, color: palette.textPrimary },
  heroSub: { fontSize: typography.size.xs + 1, color: palette.textSecondary, marginTop: 2 },
  riesgoBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full },
  riesgoText: { fontSize: typography.size.xs, fontWeight: typography.weight.medium },

  card: { backgroundColor: palette.bgPrimary, borderRadius: radius.lg, padding: spacing.base, ...shadows.sm },
  cardLabel: { fontSize: typography.size.sm, color: palette.textSecondary },
  probHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  probNum: { fontSize: typography.size.xl, fontWeight: typography.weight.medium, color: palette.textPrimary },
  barTrack: { height: 10, backgroundColor: palette.bgTertiary, borderRadius: radius.full, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: radius.full, backgroundColor: palette.warning.light },
  barTicks: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  barTick: { fontSize: typography.size.xs, color: palette.textMuted },

  sectionTitle: { fontSize: typography.size.xs + 1, fontWeight: typography.weight.semibold, color: palette.textSecondary, textTransform: "uppercase", letterSpacing: 0.8 },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  stat: {
    flex: 1, minWidth: "45%", backgroundColor: palette.bgPrimary,
    borderRadius: radius.md, padding: spacing.md, ...shadows.sm,
  },
  statLabel: { flexDirection: "row", alignItems: "center", gap: 4 },
  statLabelText: { fontSize: typography.size.xs + 1, color: palette.textSecondary },
  statValue: { fontSize: typography.size.lg, fontWeight: typography.weight.medium, color: palette.textPrimary, marginTop: 6 },

  rec: {
    backgroundColor: palette.info.light, borderWidth: 0.5, borderColor: palette.sky[200],
    borderRadius: radius.lg, padding: spacing.base, flexDirection: "row", gap: spacing.md,
  },
  recIcon: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: palette.sky[100], alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  recTitle: { fontSize: typography.size.sm, fontWeight: typography.weight.medium, color: palette.info.dark, marginBottom: 4 },
  recText: { fontSize: typography.size.sm - 1, color: palette.info.dark, lineHeight: typography.size.sm * 1.6 },
});