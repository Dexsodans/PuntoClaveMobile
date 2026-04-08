import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { palette, radius, spacing } from "@/constants/Theme";
import  { styles } from "@/assets/styles/tabs/productosStyles";

function SkeletonBox({ width, height, style }: {
  width: number | string;
  height: number;
  style?: object;
}) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 800 }),
        withTiming(1,   { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: palette.bgTertiary,
          borderRadius: radius.sm,
        },
        style,
        animStyle,
      ]}
    />
  );
}

export default function ProductoSkeleton() {
  return (
    <View style={styles.card}>
      {/* Imagen placeholder */}
      <SkeletonBox width={80} height={80} style={{ borderRadius: radius.md, marginRight: spacing.md }} />

      {/* Info placeholder */}
      <View style={styles.info}>
        <SkeletonBox width={60}  height={10} />
        <SkeletonBox width={140} height={14} style={{ marginTop: 6 }} />
        <SkeletonBox width={100} height={12} style={{ marginTop: 4 }} />
        <SkeletonBox width={80}  height={16} style={{ marginTop: 8 }} />
      </View>
    </View>
  );
}
