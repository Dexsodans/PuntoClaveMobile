import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import BASE_URL from "@/lib/api";
import { useRouter } from "expo-router";
import { palette, typography, radius, shadows, spacing } from "@/constants/Theme";

interface Props { 
    pedidoId: string;
    onVolver: () => void;
    }

export default function PasoCodigo({ pedidoId, onVolver }: Props) {
    const [codigo, setCodigo] = useState("");
    const router = useRouter();

    const handleValidar = async () => {
        const response = await fetch(`${BASE_URL}/api/pedidos/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                id_pedi: pedidoId, 
                COD_VALIDACION: codigo }),
        });
        console.log("Respuesta del servidor:", response);
        const data: any = await response.json();
        
        if (data.success) {
            Alert.alert("Éxito", "Validación exitosa, obtuviste puntos por esta compra");
            router.back();
        } else {
            Alert.alert("Error", "Código incorrecto, intenta de nuevo");
        }
    };

    const confirmar = () => {
        Alert.alert("Confirmar entrega", "¿Deseas validar este código?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Aceptar", onPress: handleValidar },
        ]);
    };

    return (
        
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={onVolver}>
            <Feather name="arrow-left" size={20} color={palette.textPrimary} />
            <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>
        <View style={styles.iconWrap}>
            <Feather name="shield" 
                    size={32} 
                    color={palette.sky[700]} />
        </View>

        <Text style={styles.titulo}>
            Código de validación
        </Text>
        <Text style={styles.subtitulo}>
            Ingresa el código que te dicte el cliente para confirmar la entrega
        </Text>

        <View style={styles.inputWrap}>
            <Feather name="lock" 
                size={18} 
                color={palette.textMuted} 
                style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="• • • • • •"
                        placeholderTextColor={palette.textMuted}
                        value={codigo}
                        onChangeText={setCodigo}/>
        </View>

        <View style={styles.hint}>
            <Feather name="info" 
                    size={12} 
                    color={palette.textMuted} />
                <Text style={styles.hintText}>
                    El cliente recibió este código en su app
                </Text>
        </View>

            <TouchableOpacity style={styles.boton} 
                    onPress={confirmar} 
                    activeOpacity={0.8}>
                <Feather name="check-circle" 
                        size={18} 
                        color="white" />
                    <Text style={styles.botonText}>
                        Validar entrega
                    </Text>
            </TouchableOpacity>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.xl,
        justifyContent: "center",
        alignItems: "center",
        gap: spacing.md,
    },
    iconWrap: {
        width: 72,
        height: 72,
        borderRadius: radius.full,
        backgroundColor: palette.sky[100],
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.sm,
    },
    titulo: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.semibold,
        color: palette.textPrimary,
        textAlign: "center",
    },
    subtitulo: {
        fontSize: typography.size.sm,
        color: palette.textSecondary,
        textAlign: "center",
        lineHeight: typography.size.sm * typography.leading.normal,
        marginBottom: spacing.sm,
    },
    inputWrap: {
        width: "100%",
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
    },
    inputIcon: {
        position: "absolute",
        left: 14,
        zIndex: 1,
    },
    input: {
        width: "100%",
        borderWidth: 1.5,
        borderColor: palette.borderMedium,
        borderRadius: radius.md,
        padding: spacing.base,
        paddingLeft: 44,
        fontSize: typography.size["2xl"],
        fontWeight: typography.weight.medium,
        letterSpacing: 8,
        color: palette.textPrimary,
        textAlign: "center",
        backgroundColor: palette.bgPrimary,
    },
    hint: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    hintText: {
        fontSize: typography.size.xs,
        color: palette.textMuted,
    },
    boton: {
        width: "100%",
        backgroundColor: palette.actionPrimary,
        padding: spacing.base,
        borderRadius: radius.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        marginTop: spacing.sm,
        ...shadows.sky,
    },
    botonText: {
        color: palette.textInverse,
        fontWeight: typography.weight.semibold,
        fontSize: typography.size.base,
    },
    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        alignSelf: "flex-start",
        marginBottom: spacing.xl,
    },
    backText: {
        fontSize: typography.size.base,
        color: palette.textPrimary,
    },
    });