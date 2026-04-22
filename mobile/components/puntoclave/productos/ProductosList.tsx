import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import ProductoItem from "./ProductoItem";
import ProductoSkeleton from "./ProductoSkeleton";
import BASE_URL from "@/lib/api";
import { palette, spacing } from "@/constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SKELETON_COUNT = 5; 

interface Props {
  onProductoAgregado: (x: number, y: number) => void;
}


export default function ProductosList({ onProductoAgregado }: Props) {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchProductos = async (currentPage: number) => {
    if (loadingMore || !hasMore) return;

    try {
      if (currentPage === 1) setLoading(true);
      else setLoadingMore(true);

      const token = await AsyncStorage.getItem("token");
      console.log('🔑 Token para fetchProductos:', token);

      const response = await fetch(
      `${BASE_URL}/api/productos/?page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      const data: any = await response.json();

      setProductos(prev => {
        const nuevos = [...prev, ...data.data];

        const unicos = Array.from(
          new Map(nuevos.map(p => [p.id, p])).values()
        );

        return unicos;
      });
      setHasMore(data.hasMore);
      setPage(currentPage + 1);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProductos(1);
  }, []);

  // ── Skeletons mientras carga la primera página ──
  if (loading) {
    return (
      <View style={styles.skeletonContainer}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ProductoSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <ProductoItem producto={item} index={index} onProductoAgregado={onProductoAgregado} />
      )}
      contentContainerStyle={styles.lista}
      showsVerticalScrollIndicator={false}
      onEndReached={() => fetchProductos(page)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator color={palette.actionPrimary} />
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: spacing.xs,
  },
  lista: {
    padding: spacing.xs,
    paddingBottom: spacing.xl,
    width: "100%",
  },
  footer: {
    marginVertical: spacing.lg,
    alignItems: "center",
  },
});