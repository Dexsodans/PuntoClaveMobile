    import React, { useState } from "react";
    import { View, Pressable } from "react-native";
    import { Text } from "@/components/ui/text";
    import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerItem,
    DrawerSeparator,
    } from "@/components/ui/drawer";

    import {
    MenuIcon,
    HomeIcon,
    UserIcon,
    BellIcon,
    SettingsIcon,
    } from "lucide-react-native";

    import { useRouter } from "expo-router";

    export default function HeaderMenu({ title = "Menu" }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const position = "left";

    return (
        <View className="flex-row items-center justify-between p-4 border-b border-border bg-background">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side={position}>
            
            <DrawerTrigger asChild>
            <Pressable className="p-2">
                <MenuIcon className="h-6 w-6 text-foreground" />
            </Pressable>
            </DrawerTrigger>

            <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>
                <Text variant="h4">Navigation Menu</Text>
                </DrawerTitle>
            </DrawerHeader>

            <DrawerItem
                icon={<HomeIcon className="h-5 w-5 text-foreground" />}
                onPress={() => router.push("/")}
            >
                <Text>Home</Text>
            </DrawerItem>

            <DrawerItem
                icon={<UserIcon className="h-5 w-5 text-foreground" />}
                onPress={() => router.push("/profile")}
            >
                <Text>Profile</Text>
            </DrawerItem>

            <DrawerItem
                icon={<BellIcon className="h-5 w-5 text-foreground" />}
                onPress={() => router.push("/notifications")}
            >
                <Text>Notifications</Text>
            </DrawerItem>

            <DrawerSeparator />

            <DrawerItem
                icon={<SettingsIcon className="h-5 w-5 text-foreground" />}
                onPress={() => router.push("/settings")}
            >
                <Text>Settings</Text>
            </DrawerItem>
            </DrawerContent>
        </Drawer>

        <Text variant="h6" className="font-semibold">
            {title}
        </Text>

        {/* Spacer para balancear */}
        <View className="w-10" />
        </View>
    );
    }