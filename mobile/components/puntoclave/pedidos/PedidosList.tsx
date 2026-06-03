import { FlatList, ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
import PedidoItem from "./PedidosItem";
import BASE_URL from "@/lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
    onPedidoPress: (pedido: any) => void;
}

export default function PedidosList({ onPedidoPress }: Props) {

    const [pedidos, setPedidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPedidos = async () => {

        try {

            const token = await AsyncStorage.getItem("token");
            const userData = await AsyncStorage.getItem("user");
            const user = JSON.parse(userData || "{}");

            const response = await fetch(
                `${BASE_URL}/api/pedidos/?user_id=${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            
            const data: any = await response.json();
            console.log("Respuesta del servidor:", data);
            setPedidos(data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    if (loading) {
        return (
            <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        );
    }

    return (
        <FlatList
            data={pedidos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
                <PedidoItem
                    pedido={item}
                    index={index}
                    onPress={() => onPedidoPress(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
        />
    );
}