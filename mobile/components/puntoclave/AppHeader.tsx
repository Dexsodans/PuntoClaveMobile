// components/puntoclave/AppHeader.tsx
import React, { useRef, useState,useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { router } from "expo-router";
import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerTitle, DrawerItem, DrawerSeparator,
} from "@/components/ui/drawer";
import { Text as UIText } from "@/components/ui/text";
import { HomeIcon, ShoppingBagIcon, UserIcon, BellIcon, SettingsIcon } from "lucide-react-native";
import { palette, typography, spacing, radius, shadows } from "@/constants/Theme";
import { useCarrito } from "@/components/puntoclave/carrito/CarritoContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";

interface Props {
  titulo: string;
  subtitulo?: string;
}

export default function AppHeader({ titulo, subtitulo }: Props) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  const loadUser = async () => {
    const data = await AsyncStorage.getItem("user");

    if (data) {
      const parsedUser = JSON.parse(data);
      setUser(parsedUser);
    }
  };

  loadUser();
}, []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { conteo, cartPos, setConteo } = useCarrito(); // 👈
  const cartIconViewRef = useRef<View>(null);           // 👈 local aquí
  const cartBadgeScale = useSharedValue(1);             // 👈 local aquí

  const handleCartLayout = () => {
    (cartIconViewRef.current as any)?.measureInWindow((x: number, y: number) => {
      cartPos.current = { x, y }; // 👈 guarda en context para ProductosScreen
    });
  };

  // Este método lo llama ProductosScreen via context cuando agrega producto
  const badgeAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartBadgeScale.value }],
  }));

  return (
    <View style={styles.header}>
      {/* IZQUIERDA */}
      <View style={styles.left}>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side="left">
          <DrawerTrigger asChild>
            <Pressable style={styles.menuBtn}>
              <Ionicons name="menu-outline" size={26} color={palette.textPrimary} />
            </Pressable>
          </DrawerTrigger>

          <DrawerContent >
            <DrawerHeader>
              <DrawerTitle>
                <UIText variant="h4" style={{ color: palette.accent }}>
                  Menú
                </UIText>
              </DrawerTitle>
            </DrawerHeader>

            <DrawerItem icon={<HomeIcon size={20} color={palette.textPrimary} />}
              onPress={() => { setDrawerOpen(false); router.push("/(tabs)"); }}>
              <UIText>Inicio</UIText>
            </DrawerItem>

            <DrawerItem icon={<ShoppingBagIcon size={20} color={palette.textPrimary} />}
              onPress={() => { setDrawerOpen(false); router.push("/(tabs)/productos"); }}>
              <UIText>Productos</UIText>
            </DrawerItem>

            <DrawerItem
              icon={<Ionicons name="receipt-outline" size={20} color={palette.textPrimary} />}
              onPress={() => { setDrawerOpen(false); router.push("/(tabs)/pedidos"); }}
            >
              <UIText>Pedidos</UIText>
            </DrawerItem>

            {/* <DrawerItem icon={<UserIcon size={20} color={palette.textPrimary} />}
              onPress={() => { setDrawerOpen(false); router.push("/perfil"); }}>
              <UIText>Perfil</UIText>
            </DrawerItem> */}

            {/* <DrawerItem icon={<BellIcon size={20} color={palette.textPrimary} />}
              onPress={() => { setDrawerOpen(false); router.push("/notificaciones"); }}>
              <UIText>Notificaciones</UIText>
            </DrawerItem> */}

            <DrawerSeparator />

            <DrawerItem
              icon={<Ionicons name="log-out-outline" size={20} color={palette.textNegative} />}
              onPress={async () => {
                await AsyncStorage.multiRemove(["token", "user"]);
                setDrawerOpen(false);
                router.replace("/(auth)");
              }}
            >
              <UIText style={{ color: palette.textNegative }}>
                Cerrar Sesion
              </UIText>
            </DrawerItem>
          </DrawerContent>
        </Drawer>

        <View style={styles.titleBlock}>
          <Text style={styles.titulo} numberOfLines={1}>{titulo}</Text>
          {subtitulo && <Text style={styles.subtitulo} numberOfLines={1}>{subtitulo}</Text>}
        </View>
      </View>

      {/* DERECHA */}
      <View style={styles.right}>
        <TouchableOpacity
          ref={cartIconViewRef}
          onLayout={handleCartLayout}         // 👈 guarda posición en cartPos
          onPress={() => router.push("/(tabs)/carrito")}
          style={styles.iconBtn}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={24} color={palette.textInverse} />
          {conteo > 0 && (
            <Animated.View style={[styles.badge, badgeAnimStyle]}>
              <Text style={styles.badgeText}>{conteo > 99 ? "99+" : conteo}</Text>
            </Animated.View>
          )}
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
          <Ionicons name="notifications-outline" size={24} color={palette.textInverse} />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
          {user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
          ) : (
            <Ionicons name="person-outline" size={24} color={palette.textInverse} />
          )}

          <Text style={styles.iconText}>{user?.name || "Usuario"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// styles igual que antes...

const styles = StyleSheet.create({
  avatar: {
  width: 26,
  height: 26,
  borderRadius: 13,
},
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

  // Izquierda
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
    marginRight: 8,
  },
  menuBtn: {
    padding: spacing.xs,
  },
  titleBlock: {
    flexShrink: 1,
  },
  titulo: {
    fontSize: typography.size["xl"],
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
  },
  subtitulo: {
    fontSize: typography.size.sm,
    color: palette.textMuted,
    marginTop: 1,
  },

  // Derecha
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,              // espacio entre icono y texto
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: palette.accent,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.borderLight,
  },
  iconText: {
  color: palette.textInverse,
  fontSize: 14,
},
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: palette.accent,
    borderRadius: radius.full,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    ...shadows.orange,
  },
  badgeText: {
    color: "#fff",
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
  },
});