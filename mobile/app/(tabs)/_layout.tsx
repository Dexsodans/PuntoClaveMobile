import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { palette } from "@/constants/Theme"; // ← reemplaza Colors
import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {
  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.actionPrimary,     // celeste activo
        tabBarInactiveTintColor: palette.textMuted,       // gris inactivo
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            borderTopColor: palette.borderLight,
          },
          default: {
            backgroundColor: palette.bgPrimary,
            borderTopColor: palette.borderLight,
            borderTopWidth: 1,
          },
        }),
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}
    >
      <Tabs.Screen
        name="productos"
        options={{
          title: "Productos",
          tabBarIcon: ({ color }) => (
            <Ionicons name="storefront-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="house.fill" color={color} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="menu-demo"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="menucard" color={color} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="permissions-demo"
        options={{
          title: "Permissions",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="checkmark.shield.fill" color={color} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="error-demo"
        options={{
          title: "Errors",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="exclamationmark.triangle.fill" color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="carrito"
        options={{
          title: "Carrito",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ConfirmarPedido"
        options={{
          title: "Pedido",
          tabBarIcon: ({ color }) => (
            <Ionicons name="navigate-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>

  );
}