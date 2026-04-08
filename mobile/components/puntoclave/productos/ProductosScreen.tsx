import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef, useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import ProductosList from "@/components/puntoclave/productos/ProductosList";
import { useCarrito } from "@/components/puntoclave/carrito/CarritoContext";
import { palette, typography, spacing, radius, shadows } from "@/constants/Theme";

interface FlyingItem {
  id: string;
  startX: number;
  startY: number;
}

// Componente del item volador (una bolita naranja)
function FlyingDot({ startX, startY, endX, endY, onDone }: {
  startX: number; startY: number;
  endX: number;   endY: number;
  onDone: () => void;
}) {
  const x = useSharedValue(startX);
  const y = useSharedValue(startY);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Arranca la animación al montar
  useEffect(() => {
    x.value = withTiming(endX, { duration: 600, easing: Easing.out(Easing.quad) });
    y.value = withTiming(endY - 40, {  // sube un poco antes
      duration: 250,
      easing: Easing.out(Easing.quad),
    });

    // Luego baja al carrito
    setTimeout(() => {
      y.value = withTiming(endY, { duration: 350, easing: Easing.in(Easing.quad) });
      scale.value = withTiming(0.3, { duration: 350 });
      opacity.value = withTiming(0, { duration: 350 }, () => {
        runOnJS(onDone)();
      });
    }, 250);
  });

  const animStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: x.value,
    top: y.value,
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: palette.accent,
    zIndex: 9999,
    pointerEvents: "none",
  }));

  return <Animated.View style={animStyle} />;
}

export default function ProductosScreen() {
  const insets = useSafeAreaInsets();
  const { cartIconRef, conteo, setConteo } = useCarrito();
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const cartBadgeScale = useSharedValue(1);
  const cartIconViewRef = useRef<View>(null);

  // Posición del ícono del carrito
  const cartPos = useRef({ x: 0, y: 0 });

  const handleCartLayout = () => {
    cartIconViewRef.current?.measureInWindow((x, y) => {
      cartPos.current = { x, y };
    });
  };
  
  // Esta función la llama ProductoItem cuando agrega al carrito
  const handleProductoAgregado = (itemX: number, itemY: number) => {
    console.log("Animacion disparada", itemX, itemY);
    const id = Date.now().toString();
    setFlyingItems(prev => [...prev, { id, startX: itemX, startY: itemY }]);

    // Bounce del badge
    setTimeout(() => {
      cartBadgeScale.value = withSpring(1.4, { damping: 5 }, () => {
        cartBadgeScale.value = withSpring(1);
      });
      setConteo(c => c + 1);
    }, 600);
  };

  const badgeAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartBadgeScale.value }],
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>


      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Productos</Text>
          <Text style={styles.subtitulo}>Encuentra lo que necesitas</Text>
        </View>


        <TouchableOpacity
          ref={cartIconViewRef}
          onLayout={handleCartLayout}
          onPress={() => router.push("/(tabs)/carrito")}
          style={styles.cartBtn}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={26} color={palette.actionSecondary} />
          {conteo > 0 && (
            <Animated.View style={[styles.badge, badgeAnimStyle]}>
              <Text style={styles.badgeText}>{conteo > 99 ? "99+" : conteo}</Text>
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>


      <ProductosList onProductoAgregado={handleProductoAgregado} />


      {flyingItems.map(item => (
        <FlyingDot
          key={item.id}
          startX={item.startX}
          startY={item.startY}
          endX={cartPos.current.x + 13}
          endY={cartPos.current.y + 13}
          onDone={() => setFlyingItems(prev => prev.filter(i => i.id !== item.id))}
          
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bgSecondary },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: palette.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderLight,
  },
  titulo: { fontSize: typography.size["2xl"], fontWeight: typography.weight.bold, color: palette.textPrimary },
  subtitulo: { fontSize: typography.size.sm, color: palette.textMuted, marginTop: 2 },
  cartBtn: {
    position: "relative",
    padding: spacing.sm,
    backgroundColor: palette.bgTertiary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.borderLight,
  },
  badge: {
    position: "absolute",
    top: -6, right: -6,
    backgroundColor: palette.accent,
    borderRadius: radius.full,
    minWidth: 20, height: 20,
    alignItems: "center", justifyContent: "center",
    paddingHorizontal: 4,
    ...shadows.orange,
  },
  badgeText: { color: "#fff", fontSize: typography.size.xs, fontWeight: typography.weight.bold },
});