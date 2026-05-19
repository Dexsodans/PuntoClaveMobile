import { FlatList, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "@/lib/api";
import ProductoItemCompra from "@/components/puntoclave/productos/ProductoItemCompra";
import { palette, spacing, typography } from "@/constants/Theme";

interface Props {
  proveedorId: number;
  onIrADetalle: () => void;
}

export default function ListaProductosCompra({ proveedorId, onIrADetalle }: Props) {
  const [productos, setProductos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);

  useEffect(() => {
    setProductos([]);
    setPagina(1);
    setHayMas(true);
    fetchProductos(1, true);
  }, [proveedorId]);

  const fetchProductos = async (page: number, reset = false) => {
    try {
      if (page === 1) setCargando(true);
      else setCargandoMas(true);

      const token = await AsyncStorage.getItem("token");
      // CORREGIDO: usa id_prov en lugar de proveedor
      const res = await fetch(
        `${BASE_URL}/api/productos/?id_prov=${proveedorId}&page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data: any = await res.json();
      const nuevos = data.data || [];

      setProductos(prev => reset ? nuevos : [...prev, ...nuevos]);
      setHayMas(data.hasMore ?? false);
      setPagina(page);
    } catch (e) {
      console.error("Error cargando productos:", e);
    } finally {
      setCargando(false);
      setCargandoMas(false);
    }
  };

  const cargarMas = useCallback(() => {
    if (!cargandoMas && hayMas) {
      fetchProductos(pagina + 1);
    }
  }, [cargandoMas, hayMas, pagina]);

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={palette.actionPrimary} />
      </View>
    );
  }

  if (productos.length === 0) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.vacio}>Sin productos para este proveedor</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={productos}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <ProductoItemCompra producto={item} />}
        onEndReached={cargarMas}
        onEndReachedThreshold={0.4}
        contentContainerStyle={styles.lista}
        ListFooterComponent={
          cargandoMas ? (
            <ActivityIndicator
              color={palette.actionPrimary}
              style={{ marginVertical: spacing.md }}
            />
          ) : null
        }
      />
      
      <TouchableOpacity style={styles.btnDetalle} onPress={onIrADetalle}>
        <Text style={styles.btnDetalleText}>Ver detalle →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centrado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  vacio: {
    color: palette.textMuted,
    fontSize: typography.size.base,
  },
  lista: {
    paddingBottom: spacing.xl,
  },
  btnDetalle: {
    margin: spacing.base,
    backgroundColor: palette.actionPrimary,
    padding: spacing.md,
    borderRadius: 10,
    alignItems: "center",
  },
  btnDetalleText: {
    color: "white",
    fontWeight: typography.weight.semibold,
    fontSize: typography.size.md,
  },
});