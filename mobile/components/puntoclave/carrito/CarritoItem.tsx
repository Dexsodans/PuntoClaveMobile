import { View, Text, Image } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { styles } from "@/assets/styles/tabs/carritoStyles";

interface ItemCarrito {
  id: number;
  NOM_PRO: string;
  IMAGEN_PRO?: string;
  CANT_CAR: number;
  SUB_TOTAL_CAR: number;
  PRECIO_VENTA_PRO: number;
}

interface Props {
  item: ItemCarrito;
  index: number;
}

export default function CarritoItem({ item, index }: Props) {

  return (
    <Animated.View entering={FadeInRight.delay(index * 60).springify()}>
      <View style={styles.card}>

        {item.IMAGEN_PRO ? (
          <Image
            source={{ uri: item.IMAGEN_PRO }}
            style={styles.imagen}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagenPlaceholder}>
            <Text style={styles.placeholderText}>{item.NOM_PRO}</Text>
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.nombre} numberOfLines={2}>
            {item.NOM_PRO}
          </Text>

          <Text style={styles.precio}>
            Bs. {Number(item.PRECIO_VENTA_PRO).toFixed(2)}
          </Text>

          <View style={styles.cantRow}>
            <View style={styles.cantBadge}>
              <Text style={styles.cantText}>x{item.CANT_CAR}</Text>
            </View>

            <Text style={styles.subtotal}>
              Bs. {Number(item.SUB_TOTAL_CAR).toFixed(2)}
            </Text>
          </View>
        </View>

      </View>
    </Animated.View>
  );
}