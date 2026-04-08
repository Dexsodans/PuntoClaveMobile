import { FlatList, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "@/constants/Theme";
import { styles } from "@/assets/styles/tabs/carritoStyles";
import CarritoItem from "./CarritoItem";

interface ItemCarrito {
  id: number;
  NOM_PRO: string;
  IMAGEN_PRO?: string;
  CANT_CAR: number;
  SUB_TOTAL_CAR: number;
  PRECIO_VENTA_PRO: number;
}

interface Props {
  items: ItemCarrito[];
  loading: boolean;
}

export default function CarritoList({ items, loading }: Props) {

  return (
    <FlatList
      data={items || []}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.lista}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        !loading ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color={palette.textMuted} />
            <Text style={styles.emptyText}>Tu carrito está vacío</Text>
          </View>
        ) : null
      }
      renderItem={({ item, index }) => (
        <CarritoItem item={item} index={index} />
      )}
    />
  );
}