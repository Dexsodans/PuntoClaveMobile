import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef, useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import ProductosList from "@/components/puntoclave/productos/ProductosList";
import { useCarrito } from "@/components/puntoclave/carrito/CarritoContext";
import { palette } from "@/constants/Theme";

interface FlyingItem {
  id: string;
  startX: number;
  startY: number;
}

function FlyingDot({ startX, startY, endX, endY, onDone }: {
  startX: number; startY: number;
  endX: number;   endY: number;
  onDone: () => void;
}) {
  const x = useSharedValue(startX);
  const y = useSharedValue(startY);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    x.value = withTiming(endX, { duration: 600, easing: Easing.out(Easing.quad) });
    y.value = withTiming(endY - 40, { duration: 250, easing: Easing.out(Easing.quad) });

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
  const { cartPos, setConteo } = useCarrito(); // 👈 cartPos viene del context
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);

  const handleProductoAgregado = (itemX: number, itemY: number) => {
    const id = Date.now().toString();
    setFlyingItems(prev => [...prev, { id, startX: itemX, startY: itemY }]);

    setTimeout(() => {
      setConteo(c => c + 1);
    }, 600);
  };

  return (
    <View style={styles.container}>
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
});