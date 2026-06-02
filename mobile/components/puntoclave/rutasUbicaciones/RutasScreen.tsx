import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { palette } from "@/constants/Theme";
import { Card,Text } from "@/components/ui";
import RutasList from "./RutasList";
    interface Props {
        idRuta: string;
    }

export default function RutasUbicacionesScreen({ idRuta }: Props) {

    const router = useRouter();

    

    const handleEntregaPress = (entrega: any) => {
        
        router.push({
            pathname: "/(tabs)/entregas/Validacion",
            params: {
                Latitud: entrega.ubicacion?.LATITUD_UBI,
                Longitud: entrega.ubicacion?.LONGITUD_UBI,
                id_ruta: idRuta,
                Cliente : [entrega.pedido?.cliente?.usuario?.NOM_USU, 
                            entrega.pedido?.cliente?.usuario?.AP_PAT_USU,
                            entrega.pedido?.cliente?.usuario?.AP_MAT_USU,
                            entrega.pedido?.cliente?.usuario?.email].join(" "),
                Fecha: entrega.pedido?.FECHA_PEDI,
                Caja: entrega.COD_CAJA,
                total: entrega.pedido?.TOTAL_PEDI,
                pedidoId: entrega.pedido?.id,
                items: JSON.stringify(
                    entrega.pedido?.productos.map((p: any) => ({
                        NOMBRE_PRO: p.NOM_PRO,
                        CANT_CAR: p.cantidad,
                        SUB_TOTAL_CAR: p.subtotal,
                    }))
                ),
                metodo: 'Pagado',
            },
        });
    };

    return (
        <View style={styles.container}>
            <RutasList
                idRuta={idRuta}
                onEntregaPress={handleEntregaPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.bgSecondary,
    },
});