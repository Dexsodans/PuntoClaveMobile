import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useCompra } from "./CompraContext";
import { palette, spacing, radius, typography, shadows } from "@/constants/Theme";
import BASE_URL from "@/lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  onExito: () => void;
  onAtras: () => void;
}

export default function OcrUploader({ onExito, onAtras }: Props) {
  const { setItemsDesdeOcr, proveedorId, items } = useCompra();
  const [imagen, setImagen] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [cantidadDetectada, setCantidadDetectada] = useState<number | null>(null);

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "Necesitamos acceso a tu galería para subir la factura.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      allowsEditing: true, // permite recortar para mejor calidad OCR
    });
    if (!res.canceled && res.assets[0]) {
      setImagen(res.assets[0].uri);
      setCantidadDetectada(null);
      await procesarOcr(res.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "Necesitamos acceso a la cámara.");
      return;
    }
    const res = await ImagePicker.launchCameraAsync({
      quality: 0.9,
      allowsEditing: true,
    });
    if (!res.canceled && res.assets[0]) {
      setImagen(res.assets[0].uri);
      setCantidadDetectada(null);
      await procesarOcr(res.assets[0].uri);
    }
  };

  const procesarOcr = async (uri: string) => {
    try {
      setProcesando(true);
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();
      formData.append("imagen", {
        uri,
        type: "image/jpeg",
        name: "factura.jpg",
      } as any);

      if (proveedorId) {
        formData.append("id_prov", proveedorId.toString());
      }

      const res = await fetch(`${BASE_URL}/api/ocr/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData as any,
      });

      const data: any = await res.json();

      if (!data.success) {
        Alert.alert("Error", data.error || "No se pudo procesar la imagen.");
        return;
      }

      const productosOcr = data.productos || [];
      setCantidadDetectada(productosOcr.length);

        if (productosOcr.length > 0) {
          setItemsDesdeOcr(
            productosOcr.map((p: any) => {
              const precio = p.PRECIO_VENTA_PRO ?? 0;
              const cantidad = p.cantidad > 0 ? p.cantidad : 1;
              return {
                id: p.id,
                nombre: p.NOM_PRO,
                precio,
                cantidad,
                subtotal: cantidad * precio,
              };
            })
          );
        }
    } catch (e) {
      console.error("Error OCR:", e);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    } finally {
      setProcesando(false);
    }
  };

  const handleContinuar = () => {
    if (cantidadDetectada === 0) {
      Alert.alert(
        "Sin productos detectados",
        "No se reconocieron productos. ¿Deseas continuar y agregarlos manualmente?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Continuar igual", onPress: onExito },
        ]
      );
      return;
    }
    onExito();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Escanear factura</Text>
      <Text style={styles.subtitulo}>
        Sube una foto clara y bien iluminada de la factura
      </Text>

      {/* Botones de carga */}
      {!imagen && (
        <View style={styles.botonesImagen}>
          <TouchableOpacity style={styles.btnImagen} onPress={tomarFoto} activeOpacity={0.8}>
            <Text style={styles.btnImagenIcono}>📷</Text>
            <Text style={styles.btnImagenTexto}>Tomar foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnImagen} onPress={seleccionarImagen} activeOpacity={0.8}>
            <Text style={styles.btnImagenIcono}>🖼️</Text>
            <Text style={styles.btnImagenTexto}>Galería</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Preview */}
      {imagen && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imagen }} style={styles.preview} resizeMode="contain" />
          <TouchableOpacity
            style={styles.btnCambiar}
            onPress={() => { setImagen(null); setCantidadDetectada(null); }}
          >
            <Text style={styles.btnCambiarTexto}>Cambiar imagen</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Procesando */}
      {procesando && (
        <View style={styles.procesando}>
          <ActivityIndicator size="large" color={palette.actionPrimary} />
          <Text style={styles.procesandoTexto}>Analizando factura...</Text>
          <Text style={styles.procesandoSub}>Esto puede tardar unos segundos</Text>
        </View>
      )}

      {/* Resultado */}
      {cantidadDetectada !== null && !procesando && (
        <View style={styles.resultadoContainer}>
          {cantidadDetectada > 0 ? (
            <>
              <View style={styles.resultadoBadge}>
                <Text style={styles.resultadoBadgeText}>
                  ✅ {cantidadDetectada} producto{cantidadDetectada > 1 ? "s" : ""} detectado{cantidadDetectada > 1 ? "s" : ""}
                </Text>
              </View>
              <Text style={styles.resultadoSub}>
                Revisa y edita las cantidades en el siguiente paso
              </Text>
            </>
          ) : (
            <>
              <View style={[styles.resultadoBadge, styles.resultadoWarning]}>
                <Text style={[styles.resultadoBadgeText, { color: palette.warning.dark }]}>
                  ⚠️ No se detectaron productos
                </Text>
              </View>
              <Text style={styles.resultadoSub}>
                Intenta con una foto más nítida o continúa para agregar manualmente
              </Text>
            </>
          )}
        </View>
      )}

      {/* Botones navegación */}
      <View style={styles.botones}>
        <TouchableOpacity style={styles.btnAtras} onPress={onAtras}>
          <Text style={styles.btnAtrasText}>← Atrás</Text>
        </TouchableOpacity>

        {imagen && !procesando && (
          <TouchableOpacity style={styles.btnContinuar} onPress={handleContinuar}>
            <Text style={styles.btnContinuarText}>Ver detalle →</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bgSecondary },
  content: { padding: spacing.base, gap: spacing.lg },
  titulo: {
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    color: palette.textPrimary,
  },
  subtitulo: {
    fontSize: typography.size.base,
    color: palette.textSecondary,
    lineHeight: typography.size.base * 1.5,
  },
  botonesImagen: { flexDirection: "row", gap: spacing.md },
  btnImagen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.bgPrimary,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: palette.borderLight,
    borderStyle: "dashed",
    paddingVertical: spacing.xl,
    gap: spacing.sm,
    ...shadows.sm,
  },
  btnImagenIcono: { fontSize: 36 },
  btnImagenTexto: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: palette.textSecondary,
  },
  previewContainer: { gap: spacing.sm },
  preview: {
    width: "100%",
    height: 280,
    borderRadius: radius.lg,
    backgroundColor: palette.bgTertiary,
  },
  btnCambiar: {
    alignSelf: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: palette.borderMedium,
  },
  btnCambiarTexto: {
    fontSize: typography.size.sm,
    color: palette.textSecondary,
    fontWeight: typography.weight.medium,
  },
  procesando: {
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: palette.bgPrimary,
    borderRadius: radius.lg,
    ...shadows.sm,
  },
  procesandoTexto: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: palette.textPrimary,
  },
  procesandoSub: { fontSize: typography.size.sm, color: palette.textMuted },
  resultadoContainer: { gap: spacing.xs, alignItems: "flex-start" },
  resultadoBadge: {
    backgroundColor: palette.success.light,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    ...shadows.sm,
  },
  resultadoWarning: { backgroundColor: palette.warning.light },
  resultadoBadgeText: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: palette.success.dark,
  },
  resultadoSub: {
    fontSize: typography.size.sm,
    color: palette.textMuted,
    marginLeft: spacing.xs,
  },
  botones: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.md },
  btnAtras: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: palette.borderMedium,
    alignItems: "center",
  },
  btnAtrasText: { color: palette.textSecondary, fontWeight: typography.weight.semibold },
  btnContinuar: {
    flex: 2,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: palette.actionPrimary,
    alignItems: "center",
    ...shadows.sky,
  },
  btnContinuarText: {
    color: "white",
    fontWeight: typography.weight.bold,
    fontSize: typography.size.md,
  },
});