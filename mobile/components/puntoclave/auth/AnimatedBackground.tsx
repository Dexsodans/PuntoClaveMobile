import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface OrbConfig {
  size: number;
  color: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  duration: number;
}

interface FloatingOrbProps extends OrbConfig {
  style?: ViewStyle;
}

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const ORBS: OrbConfig[] = [
  { size: 220, color: "#c4b5fd", top: -60,   left: -60,   duration: 8000  },
  { size: 170, color: "#bfdbfe", top: 80,    right: -50,  duration: 10000 },
  { size: 140, color: "#fbcfe8", top: 200,   left: -40,   duration: 9000  },
  { size: 130, color: "#a7f3d0", bottom: 80, right: -30,  duration: 7500  },
  { size: 100, color: "#fde68a", bottom: 20, left: 120,   duration: 11000 },
  { size: 90,  color: "#e9d5ff", top: 300,   left: 180,   duration: 8500  },
];

function FloatingOrb({ size, color, duration, style }: FloatingOrbProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const rx = Math.random() * 30 + 10;
    const ry = Math.random() * 40 + 15;

    translateX.value = withRepeat(
      withSequence(
        withTiming(rx,  { duration: duration * 0.4, easing: Easing.inOut(Easing.sin) }),
        withTiming(-rx, { duration: duration * 0.6, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    translateY.value = withRepeat(
      withSequence(
        withTiming(-ry, { duration: duration * 0.5, easing: Easing.inOut(Easing.sin) }),
        withTiming(ry,  { duration: duration * 0.5, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: duration * 0.5 }),
        withTiming(0.94, { duration: duration * 0.5 })
      ),
      -1,
      true
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity: 0.5,
        },
        style,
        animStyle,
      ]}
    />
  );
}

export default function AnimatedBackground({ children, style }: AnimatedBackgroundProps) {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={["#f5f3ff", "#eff6ff", "#fdf2f8"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {ORBS.map((orb, i) => (
        <FloatingOrb
          key={i}
          {...orb}
          style={{
            top: orb.top as number | undefined,
            left: orb.left as number | undefined,
            right: orb.right as number | undefined,
            bottom: orb.bottom as number | undefined,
          }}
        />
      ))}

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});