import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import BASE_URL from "@/lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { palette, spacing, radius, typography, shadows } from "@/constants/Theme";

interface Proveedor {
  id: number;
  NOM_PROV: string;
  COD_PROV: string;
  EST_PROV: boolean;
}

interface Props {
  proveedorIdSeleccionado: number | null;
  onProveedorSeleccionado: (id: number, nombre: string) => void;
}

export default function ProveedorSelector({ proveedorIdSeleccionado, onProveedorSeleccionado }: Props) {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/proveedores/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: any = await res.json();
      console.log("Proveedores cargados:", data);
      const lista = Array.isArray(data) ? data : (data.data || []);
      setProveedores(lista.filter((p: Proveedor) => p.EST_PROV));
    } catch (e) {
      console.error("Error cargando proveedores:", e);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={palette.actionPrimary} />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.label}>Selecciona un proveedor</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={proveedores}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => {
          const seleccionado = proveedorIdSeleccionado === item.id;
          return (
            <TouchableOpacity
              style={[styles.btn, seleccionado && styles.btnActivo]}
              onPress={() => onProveedorSeleccionado(item.id, item.NOM_PROV)}
              activeOpacity={0.75}
            >
              <Text style={styles.inicial}>
                {item.NOM_PROV.charAt(0).toUpperCase()}
              </Text>
              <Text style={[styles.text, seleccionado && styles.textActivo]}>
                {item.NOM_PROV}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    padding: spacing.md,
    alignItems: "center",
  },
  label: {
    fontSize: typography.size.sm,
    color: palette.textSecondary,
    fontWeight: typography.weight.medium,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.base,
  },
  lista: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: palette.bgTertiary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: palette.borderLight,
    ...shadows.sm,
  },
  btnActivo: {
    backgroundColor: palette.actionPrimary,
    borderColor: palette.actionPrimary,
    ...shadows.sky,
  },
  inicial: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.25)",
    textAlign: "center",
    lineHeight: 22,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: "white",
    overflow: "hidden",
  },
  text: {
    color: palette.textPrimary,
    fontWeight: typography.weight.medium,
    fontSize: typography.size.base,
  },
  textActivo: {
    color: palette.textInverse,
  },
});