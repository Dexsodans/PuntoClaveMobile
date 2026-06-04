import { View, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { palette } from "@/constants/Theme";
import { Card,Text, Button } from "@/components/ui";
import RutasList from "./RutasList";
import BASE_URL from "@/lib/api";

    interface Props {
        idRuta: string;
        idCaja: string;
        estadoCaja: string;
    }

export default function RutasUbicacionesScreen({ idRuta, idCaja, estadoCaja }: Props) {

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

            const data: any = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al iniciar caja");
            }

            console.log("Caja iniciada con éxito:", data);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCerrarCaja = () => {
        console.log("Presionó Cerrar Caja");
    };

    const handleObservarCaja = () => {
        console.log("Presionó Observar Caja");
    };
        const confirmar = () => {
            Alert.alert("Iniciar Caja", "¿Deseas iniciar la jornada de esta caja?", [
                { text: "Cancelar", style: "cancel" },
                { text: "Aceptar", onPress: handleIniciarCaja },
            ]);
        };

    const estado = Number(estadoCaja);

    const textoBoton =
        estado === 1
            ? "Observar Caja"
            : estado === 2
            ? "Cerrar Caja"
            : "Iniciar Caja";

    const colorBoton =
        estado === 1
            ? "#16a34a" // verde
            : estado === 2
            ? "#dc2626" // rojo
            : "#2563eb"; // azul

    const accionBoton =
        estado === 1
            ? handleObservarCaja
            : estado === 2
            ? handleCerrarCaja
            : confirmar;

    return (
        <View style={styles.container}>
            <RutasList
                idRuta={idRuta}
                onEntregaPress={handleEntregaPress}
            />
                        {/* Hazlo un boton jsjsjs */}
            <Button
                onPress={accionBoton}
                style={{
                    margin: 16,
                    backgroundColor: colorBoton,
                    borderRadius: 12,
                }}
            >
                <Text
                    style={{
                        color: palette.bgPrimary,
                    }}
                >
                    {textoBoton}
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