import { FlatList, ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
import RutasItem from "./RutasItem";
import BASE_URL from "@/lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

interface Props {
    idRuta: string;
    onEntregaPress: (entrega: any) => void;
}

export default function EntregasList({ onEntregaPress, idRuta }: Props) {

    const [entregas, setEntregas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEntregas = async () => {

        try {

            const token = await AsyncStorage.getItem("token");
            const userData = await AsyncStorage.getItem("user");
            const user = JSON.parse(userData || "{}");
            console.log("Ruta ID en fetchEntregas:", idRuta);
            const response = await fetch(
                `${BASE_URL}/api/ruta_pedidos/?id_ruta=${idRuta}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            
            const data: any = await response.json();
            setEntregas(data.data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchEntregas();
        }, [idRuta])
    );

    if (loading) {
        return (
            <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        );
    }

    return (
        <FlatList
            data={entregas}
            keyExtractor={(item) => item.id_ruta_ubi.toString()}
            renderItem={({ item, index }) => (
                <RutasItem
                    ruta={item}
                    index={index}
                    onPress={() => onEntregaPress(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
        />
    );
}