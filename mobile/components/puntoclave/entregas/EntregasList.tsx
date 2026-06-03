import { FlatList, ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
import EntregasItem from "./EntregasItem";
import BASE_URL from "@/lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

interface Props {
    onEntregaPress: (entrega: any) => void;
}

export default function EntregasList({ onEntregaPress }: Props) {

    const [entregas, setEntregas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEntregas = async () => {

        try {

            const token = await AsyncStorage.getItem("token");
            const userData = await AsyncStorage.getItem("user");
            const user = JSON.parse(userData || "{}");

            const response = await fetch(
                `${BASE_URL}/api/cajas/?user_id=${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            
            const data: any = await response.json();
            setEntregas(data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchEntregas();
        }, [])
    );

    if (loading) {
        return (
            <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        );
    }

    return (
        <FlatList
            data={entregas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
                <EntregasItem
                    entrega={item}
                    index={index}
                    onPress={() => onEntregaPress(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
        />
    );
}