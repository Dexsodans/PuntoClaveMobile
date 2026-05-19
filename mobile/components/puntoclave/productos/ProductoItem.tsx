import { View, Image, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  FadeInRight,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { styles as s } from "@/assets/styles/tabs/productosStyles";
import { palette } from "@/constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "@/lib/api";
import { useRef } from "react";

interface Producto {
  id: number;
  COD_PRO?: string;
  NOM_PRO: string;
  DESC_PRO?: string;
  NOM_PROV?: string;
  PRECIO_VENTA_PRO?: number;
  PRECIO_VENTA_UNIDAD_PRO?: number;
  IMAGEN_PRO?: string;
  EST_PRO: boolean;
  stock_actual_inv?: number;
  stock_max_inv?: number;
  stock_min_inv?: number;
}

interface Props {
  producto: Producto;
  index: number;
  onProductoAgregado: (x: number, y: number) => void; // ← agregar esto
}

// Color de la barra de stock
function getStockColor(actual: number, min: number | null) {
  if (actual <= 0) return palette.stockOut;
  if (min && actual <= min) return palette.stockLow;
  return "#22c55e"; // verde normal
}

// Porcentaje de stock para la barra (máx visual = 50 unidades)
function getStockPct(actual: number, max: number | null) {
  const ref = max ?? 50;
  return Math.min(actual / ref, 1);
}

export default function ProductoItem({ producto, index, onProductoAgregado }: Props) {
  const scale = useSharedValue(1);
  const botonScale = useSharedValue(1);
  const botonBg = useSharedValue(0); 
  const btnRef = useRef<View>(null);

  const tieneOferta =
    producto.PRECIO_VENTA_UNIDAD_PRO &&
    producto.PRECIO_VENTA_PRO &&
    producto.PRECIO_VENTA_UNIDAD_PRO > producto.PRECIO_VENTA_PRO;

  const stock = producto.stock_actual_inv ?? 0;
  const stockColor = getStockColor(stock, producto.stock_min_inv ?? null);
  const stockPct = getStockPct(stock, producto.stock_max_inv ?? null);

  const placeholderColors = [palette.actionPrimary, palette.actionSecondary, palette.accent];
  const placeholderColor = placeholderColors[producto.NOM_PRO.charCodeAt(0) % 3];
  const initials = producto.NOM_PRO.slice(0, 2).toUpperCase();

  // ── Animación: press en la tarjeta ──
  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12 });
  };

  // ── Animación: botón + ──
  const botonAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: botonScale.value }],
  }));

const handleAgregar = async (e: any) => {
    const { pageX, pageY } = e.nativeEvent;

    onProductoAgregado(pageX, pageY);

    //console.log("CLICK:", pageX, pageY);

    try {

      const userData = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");
      const user = JSON.parse(userData || "{}");

      const response = await fetch(`${BASE_URL}/api/carrito/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          producto_id: producto.id
        })
      });

      const data = await response.json();

      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    // FadeInRight escalonado según el index
    <Animated.View entering={FadeInRight.delay(index * 80).springify()}>
      <Animated.View style={cardAnimStyle}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[s.card, !producto.EST_PRO && s.cardInactivo]}
        >

          {/* ── Imagen ── */}
          <View style={s.imagenWrapper}>
            {producto.IMAGEN_PRO ? (
              <Image
                source={{ uri: producto.IMAGEN_PRO }}
                style={s.imagen}
                resizeMode="cover"
              />
            ) : (
              <View style={[s.imagenPlaceholder, { backgroundColor: placeholderColor }]}>
                <Text style={s.placeholderText}>{initials}</Text>
              </View>
            )}

            {tieneOferta && (
              <View style={s.badgeOferta}>
                <Text style={s.badgeOfertaText}>OFERTA</Text>
              </View>
            )}

            {!producto.EST_PRO && (
              <View style={s.badgeSinStock}>
                <Text style={s.badgeSinStockText}>Sin stock</Text>
              </View>
            )}
          </View>

          {/* ── Info ── */}
          <View style={s.info}>

            {/* Código + Proveedor */}
            <View style={s.headerRow}>
              {producto.COD_PRO && (
                <Text style={s.codigo}>{producto.COD_PRO}</Text>
              )}
              {producto.NOM_PROV && (
                <View style={s.proveedorChip}>
                  <Text style={s.proveedorChipText}>{producto.NOM_PROV}</Text>
                </View>
              )}
            </View>

            <Text style={s.nombre} numberOfLines={2}>
              {producto.NOM_PRO}
            </Text>

            {producto.DESC_PRO && (
              <Text style={s.descripcion} numberOfLines={1}>
                {producto.DESC_PRO}
              </Text>
            )}

            {/* Barra de stock */}
            {producto.EST_PRO && (
              <View style={s.stockRow}>
                <View style={s.stockBarBg}>
                  <View
                    style={[
                      s.stockBarFill,
                      {
                        width: `${stockPct * 100}%`,
                        backgroundColor: stockColor,
                      },
                    ]}
                  />
                </View>
                <Text style={s.stockText}>{stock}</Text>
              </View>
            )}

            {/* Precios */}
            <View style={s.precioRow}>
              <Text style={s.precio}>
                Bs. {Number(producto.PRECIO_VENTA_PRO).toFixed(2)}
              </Text>
              {tieneOferta && (
                <>
                  <Text style={s.precioTachado}>
                    Bs. {Number(producto.PRECIO_VENTA_UNIDAD_PRO).toFixed(2)}
                  </Text>
                  <Text style={s.precioOferta}>
                    ↓ oferta
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* ── Botón + ── */}
          {producto.EST_PRO && (
            <Animated.View style={botonAnimStyle}>
              <View ref={btnRef}>
                <TouchableOpacity
                  style={s.botonAgregar}
                  onPress={handleAgregar}
                  activeOpacity={0.9}
                >
                  <Text style={s.botonAgregarText}>+</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}