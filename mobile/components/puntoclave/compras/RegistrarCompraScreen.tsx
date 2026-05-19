import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useCompra } from "./CompraContext";
import ProveedorSelector from "./ProveedorSelector";
import ModoSelector from "./ModoSelector";
import ListaProductosCompra from "./ListaProductosCompra";
import OcrUploader from "./OcrUploader";
import DetalleCompraTab from "./DetalleCompraTab";
import ResumenCompraTab from "./ResumenCompraTab";
import { palette, spacing, radius, typography, shadows } from "@/constants/Theme";

const PASOS = [
  { numero: 1, etiqueta: "Proveedor" },
  { numero: 2, etiqueta: "Modo" },
  { numero: 3, etiqueta: "Productos" },
  { numero: 4, etiqueta: "Detalle" },
  { numero: 5, etiqueta: "Resumen" },
];

export default function RegistrarCompraScreen() {
  const {
    paso,
    irAPaso,
    proveedorId,
    proveedorNombre,
    setProveedor,
    modo,
    setModo,
    resetear,
  } = useCompra();

  // ── Handlers de navegación ──────────────────────────────
  const handleProveedorSeleccionado = (id: number, nombre: string) => {
    setProveedor(id, nombre);
    irAPaso(2);
  };

  const handleModoSeleccionado = (m: "manual" | "ocr") => {
    setModo(m);
    irAPaso(3);
  };

  const handleProductosListos = () => irAPaso(4);
  const handleOcrExito = () => irAPaso(4);
  const handleDetalleOk = () => irAPaso(5);
  const handleCompraExito = () => {
    // ya resetea dentro del ResumenCompraTab, volvemos al paso 1
  };

  // ── Renderizado del paso actual ─────────────────────────
  const renderPaso = () => {
    switch (paso) {
      case 1:
        return (
          <View style={styles.pasoContainer}>
            <Text style={styles.pasoTitulo}>Nueva compra</Text>
            <Text style={styles.pasoSubtitulo}>Selecciona el proveedor</Text>
            <ProveedorSelector
              proveedorIdSeleccionado={proveedorId}
              onProveedorSeleccionado={handleProveedorSeleccionado}
            />
          </View>
        );

      case 2:
        return (
          <ModoSelector onSeleccionar={handleModoSeleccionado} />
        );

      case 3:
        if (modo === "ocr") {
          return (
            <OcrUploader
              onExito={handleOcrExito}
              onAtras={() => irAPaso(2)}
            />
          );
        }
        return (
          <ListaProductosCompra
            proveedorId={proveedorId!}
            onIrADetalle={handleProductosListos}
          />
        );

      case 4:
        return (
          <DetalleCompraTab
            onSiguiente={handleDetalleOk}
            onAtras={() => irAPaso(modo === "ocr" ? 3 : 3)}
          />
        );

      case 5:
        return (
          <ResumenCompraTab
            onAtras={() => irAPaso(4)}
            onExito={handleCompraExito}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Barra de progreso */}
      <View style={styles.progreso}>
        {PASOS.map((p, idx) => {
          const activo = paso === p.numero;
          const completado = paso > p.numero;
          return (
            <View key={p.numero} style={styles.pasoWrapper}>
              {/* Línea conectora */}
              {idx > 0 && (
                <View
                  style={[
                    styles.lineaConector,
                    completado && styles.lineaConectorActiva,
                  ]}
                />
              )}

              <View
                style={[
                  styles.pasoBurbuja,
                  activo && styles.pasoBurbujaActiva,
                  completado && styles.pasoBurbujaCompletada,
                ]}
              >
                <Text
                  style={[
                    styles.pasoBurbujaTexto,
                    (activo || completado) && styles.pasoBurbujaTextoActivo,
                  ]}
                >
                  {completado ? "✓" : p.numero}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Etiqueta del paso */}
      <View style={styles.etiquetaContainer}>
        <Text style={styles.etiquetaPaso}>
          Paso {paso} de {PASOS.length}
        </Text>
        <Text style={styles.etiquetaNombre}>
          {PASOS[paso - 1]?.etiqueta}
          {paso > 1 && proveedorNombre ? ` · ${proveedorNombre}` : ""}
        </Text>
      </View>

      {/* Contenido del paso */}
      <View style={styles.contenido}>
        {renderPaso()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.bgSecondary,
  },
  progreso: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    backgroundColor: palette.bgPrimary,
    borderBottomWidth: 1,
    borderColor: palette.borderLight,
    gap: 0,
  },
  pasoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  lineaConector: {
    width: 28,
    height: 2,
    backgroundColor: palette.borderLight,
  },
  lineaConectorActiva: {
    backgroundColor: palette.actionPrimary,
  },
  pasoBurbuja: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.bgTertiary,
    borderWidth: 2,
    borderColor: palette.borderMedium,
    alignItems: "center",
    justifyContent: "center",
  },
  pasoBurbujaActiva: {
    backgroundColor: palette.actionPrimary,
    borderColor: palette.actionPrimary,
    ...shadows.sky,
  },
  pasoBurbujaCompletada: {
    backgroundColor: palette.success.main,
    borderColor: palette.success.main,
  },
  pasoBurbujaTexto: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    color: palette.textMuted,
  },
  pasoBurbujaTextoActivo: {
    color: "white",
  },
  etiquetaContainer: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    backgroundColor: palette.bgPrimary,
    borderBottomWidth: 1,
    borderColor: palette.borderLight,
  },
  etiquetaPaso: {
    fontSize: typography.size.xs,
    color: palette.textMuted,
    fontWeight: typography.weight.medium,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  etiquetaNombre: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    color: palette.textPrimary,
  },
  contenido: {
    flex: 1,
  },
  pasoContainer: {
  flex: 1,
  padding: spacing.base,
},

pasoTitulo: {
  fontSize: typography.size.lg,
  fontWeight: typography.weight.bold,
  color: palette.textPrimary,
  marginBottom: spacing.xs,
},

pasoSubtitulo: {
  fontSize: typography.size.sm,
  color: palette.textMuted,
  marginBottom: spacing.md,
},
});