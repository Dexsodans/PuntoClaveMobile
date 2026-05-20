import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useEffect as useAnimatedEffect } from "react";

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    withSpring,
    interpolate,
    Easing,
} from "react-native-reanimated";

const { width: SCREEN_W } = Dimensions.get("window");
const TRACK_W = SCREEN_W - 64;

// Estado del pedido → posición (0 a 1)
const EST_POSICION: Record<number, number> = {
    1: 0,    // pendiente
    2: 0.33, // en camino  (usamos 2 = en camino según tu modelo)
    3: 1,    // entregado
    4: 0,    // cancelado
};

const PASOS = [
    { id: 1, label: "Confirmado", icon: "✅" },
    { id: 2, label: "En camino", icon: "🛵" },
    { id: 3, label: "Entregado", icon: "📦" },
];

interface Props {
    estado: number; // 1 | 2 | 3 | 4
}

function MotoSVG({ bouncing }: { bouncing: boolean }) {
    const bounce = useSharedValue(0);

    useAnimatedEffect(() => {
        if (bouncing) {
            bounce.value = withRepeat(
                withSequence(
                    withTiming(-4, { duration: 180, easing: Easing.out(Easing.sin) }),
                    withTiming(0, { duration: 180, easing: Easing.in(Easing.sin) })
                ),
                -1,
                false
            );
        } else {
            bounce.value = withSpring(0);
        }
    }, [bouncing]);

    const bounceStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: bounce.value }],
    }));

    return (
        <Animated.View style={[styles.motoContainer, bounceStyle]}>
            {/* Humo (solo si en camino) */}
            {bouncing && (
                <View style={styles.humoRow}>
                    {[0, 1, 2].map((i) => (
                        <SmokeParticle key={i} delay={i * 150} />
                    ))}
                </View>
            )}

            {/* Moto emoji grande con sombra */}
            <View style={styles.motoWrapper}>
                <Text style={styles.motoEmoji}>🛵</Text>
                {/* Ruedas girando */}
                {bouncing && (
                    <>
                        <SpinWheel style={styles.ruedaDelantera} />
                        <SpinWheel style={styles.ruedaTrasera} />
                    </>
                )}
            </View>

            {/* Tipito arriba */}
            <Text style={styles.tipitoEmoji}>👤</Text>

            {/* Caja de entrega */}
            <Text style={styles.cajaEmoji}>📦</Text>
        </Animated.View>
    );
}

function SpinWheel({ style }: { style: any }) {
    const rot = useSharedValue(0);
    useAnimatedEffect(() => {
        rot.value = withRepeat(withTiming(360, { duration: 400, easing: Easing.linear }), -1, false);
    }, []);
    const animStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rot.value}deg` }],
    }));
    return <Animated.View style={[styles.rueda, style, animStyle]} />;
}

function SmokeParticle({ delay }: { delay: number }) {
    const opacity = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(0.5);

    useAnimatedEffect(() => {
        const loop = () => {
            opacity.value = withSequence(
                withTiming(0.6, { duration: 200 }),
                withTiming(0, { duration: 400 }),
            );
            translateX.value = withTiming(-16 - delay * 4, { duration: 600 });
            translateY.value = withSequence(
                withTiming(-8, { duration: 300 }),
                withTiming(-14, { duration: 300 }),
            );
            scale.value = withTiming(1.4, { duration: 600 });

            setTimeout(() => {
                translateX.value = 0;
                translateY.value = 0;
                scale.value = 0.5;
                loop();
            }, 600 + delay);
        };
        setTimeout(loop, delay);
    }, []);

    const smokeStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    return <Animated.View style={[styles.humo, smokeStyle]} />;
}

export default function LineaTiempoMoto({ estado }: Props) {
    const progreso = useSharedValue(EST_POSICION[estado] ?? 0);
    const cancelado = estado === 4;

    useAnimatedEffect(() => {
        const target = EST_POSICION[estado] ?? 0;
        progreso.value = withTiming(target, { duration: 900, easing: Easing.out(Easing.quad) });
    }, [estado]);

    const motoStyle = useAnimatedStyle(() => ({
        left: interpolate(progreso.value, [0, 1], [0, TRACK_W - 60]),
    }));

    const trailStyle = useAnimatedStyle(() => ({
        width: interpolate(progreso.value, [0, 1], [0, TRACK_W]),
    }));

    const enMovimiento = estado === 2;

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Estado del repartidor</Text>

            {cancelado ? (
                <View style={styles.canceladoBox}>
                    <Text style={styles.canceladoEmoji}>😕</Text>
                    <Text style={styles.canceladoText}>Pedido cancelado</Text>
                </View>
            ) : (
                <>
                    {/* PISTA */}
                    <View style={styles.pista}>
                        {/* Línea base */}
                        <View style={styles.lineaBase} />

                        {/* Progreso coloreado */}
                        <Animated.View style={[styles.lineaProgreso, trailStyle]} />

                        {/* Puntos de estado */}
                        {PASOS.map((paso, i) => {
                            const px = i === 0 ? 0 : i === 1 ? TRACK_W / 2 - 12 : TRACK_W - 24;
                            const alcanzado = EST_POSICION[estado] >= (i / (PASOS.length - 1));
                            return (
                                <View
                                    key={paso.id}
                                    style={[
                                        styles.punto,
                                        { left: px },
                                        alcanzado && styles.puntoAlcanzado,
                                    ]}
                                >
                                    <Text style={styles.puntoEmoji}>{paso.icon}</Text>
                                </View>
                            );
                        })}

                        {/* MOTO */}
                        <Animated.View style={[styles.motoAbsolute, motoStyle]}>
                            <MotoSVG bouncing={enMovimiento} />
                        </Animated.View>
                    </View>

                    {/* Etiquetas */}
                    <View style={styles.etiquetasRow}>
                        {PASOS.map((paso) => (
                            <Text
                                key={paso.id}
                                style={[
                                    styles.etiqueta,
                                    estado >= paso.id && styles.etiquetaActiva,
                                ]}
                            >
                                {paso.label}
                            </Text>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#1E40AF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    titulo: { fontSize: 15, fontWeight: "700", color: "#1E40AF", marginBottom: 24 },

    pista: {
        height: 80,
        position: "relative",
        marginHorizontal: 4,
    },
    lineaBase: {
        position: "absolute",
        bottom: 14,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: "#E2E8F0",
        borderRadius: 2,
    },
    lineaProgreso: {
        position: "absolute",
        bottom: 14,
        left: 0,
        height: 4,
        backgroundColor: "#F97316",
        borderRadius: 2,
    },
    punto: {
        position: "absolute",
        bottom: 6,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
    },
    puntoAlcanzado: { backgroundColor: "#FFF7ED" },
    puntoEmoji: { fontSize: 14 },

    motoAbsolute: {
        position: "absolute",
        bottom: 18,
    },
    motoContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
        width: 60,
        height: 50,
    },
    motoWrapper: { position: "relative" },
    motoEmoji: { fontSize: 28 },
    tipitoEmoji: {
        position: "absolute",
        fontSize: 14,
        top: -2,
        left: 18,
    },
    cajaEmoji: {
        position: "absolute",
        fontSize: 12,
        top: 2,
        right: 2,
    },
    rueda: {
        position: "absolute",
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#1E40AF",
        borderTopColor: "transparent",
    },
    ruedaDelantera: { bottom: -2, right: 4 },
    ruedaTrasera: { bottom: -2, left: 6 },
    humoRow: {
        position: "absolute",
        bottom: 8,
        left: -8,
        flexDirection: "row",
        gap: 2,
    },
    humo: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#94A3B8",
    },

    etiquetasRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        paddingHorizontal: 4,
    },
    etiqueta: { fontSize: 11, color: "#94A3B8", textAlign: "center", flex: 1 },
    etiquetaActiva: { color: "#F97316", fontWeight: "700" },

    canceladoBox: { alignItems: "center", padding: 20, gap: 8 },
    canceladoEmoji: { fontSize: 40 },
    canceladoText: { fontSize: 16, fontWeight: "700", color: "#EF4444" },
});