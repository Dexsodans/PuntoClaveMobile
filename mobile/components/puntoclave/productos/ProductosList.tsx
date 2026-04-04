import { FlatList, ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
import ProductoItem from "./ProductoItem";
import BASE_URL from "@/lib/api";

export default function ProductosList() {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/productos/`);
      const data: any = await response.json();
      setProductos(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  if (loading) {
    return (
      <View style={{ marginTop: 20 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductoItem producto={item} />}
    />
  );
}