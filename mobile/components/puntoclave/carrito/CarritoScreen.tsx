import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import BASE_URL from "@/lib/api";
import { styles } from "@/assets/styles/tabs/carritoStyles";
import CarritoList from "@/components/puntoclave/carrito/CarritoList";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";




interface ItemCarrito {
  id: number;
  NOM_PRO: string;
  IMAGEN_PRO?: string;
  CANT_CAR: number;
  SUB_TOTAL_CAR: number;
  PRECIO_VENTA_PRO: number;
}

export default function CarritoScreen() {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCarrito = async () => {
    try {

      const userData = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");
      const user = JSON.parse(userData || "{}");

      const res = await fetch(`${BASE_URL}/api/carrito/?user_id=${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: any = await res.json();

      setItems(data.data || []);

    } catch (e) {
      console.log(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
useFocusEffect(
  useCallback(() => {
    fetchCarrito();
  }, [])
);

  const total = items.reduce((acc, i) => acc + Number(i.SUB_TOTAL_CAR), 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      <View style={styles.header}>
        <Text style={styles.titulo}>Mi Carrito</Text>
        <Text style={styles.subtitulo}>{items.length} productos</Text>
      </View>

      <CarritoList items={items} loading={loading} />

      {items.length > 0 && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValor}>Bs. {total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.btnCheckout} activeOpacity={0.85}
          onPress={() =>
              router.push({
                pathname: "/(tabs)/ConfirmarPedido",
                params: { total: total, items: JSON.stringify(items) }
              })
            }>
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            <Text style={styles.btnCheckoutText}>Confirmar pedido</Text>
            
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}