import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { palette } from "@/constants/Theme";
import { Card,Text, Button } from "@/components/ui";
import RutasList from "./RutasList";
import BASE_URL from "@/lib/api";

    interface Props {
        idRuta: string;
        idCaja: string;
    }

export default function RutasUbicacionesScreen({ idRuta, idCaja }: Props) {

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
                id_cli: entrega.pedido?.cliente?.id,
                Fecha: entrega.pedido?.FECHA_PEDI,
                Caja: entrega.COD_CAJA,
                total: entrega.pedido?.TOTAL_PEDI,
                pedidoId: entrega.pedido?.id,
                EST_PEDI: entrega.pedido?.EST_PEDI,
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
    const handleIniciarCaja = async () => {
        try {


            const response = await fetch(
                `${BASE_URL}/api/cajas/estado2/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_caja: Number(idCaja),
                    }),
                }
            );

            const data:any = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al iniciar caja");
            }else{
                console.log("Caja iniciada con éxito:", data);
            }

            

            // Aquí puedes recargar la lista o mostrar un mensaje
            // fetchEntregas();

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <RutasList
                idRuta={idRuta}
                onEntregaPress={handleEntregaPress}
            />
                        {/* Hazlo un boton jsjsjs */}
            <Button
                onPress={handleIniciarCaja}
                style={{
                    margin: 16,
                    backgroundColor: palette.accent,
                    borderRadius: 12,
                }}
            >
                <Text
                    style={{
                        color: palette.bgPrimary,
                    }}
                >
                    Iniciar Caja
                </Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.bgSecondary,
    },
});