import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "@/lib/api";

export type ModoRegistro = "manual" | "ocr" | null;

export interface ItemCompra {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

interface CompraContextType {
  // Paso 1 - Proveedor
  proveedorId: number | null;
  proveedorNombre: string;
  setProveedor: (id: number, nombre: string) => void;

  // Paso 2 - Modo
  modo: ModoRegistro;
  setModo: (modo: ModoRegistro) => void;

  // Paso 3/4 - Items
  items: ItemCompra[];
  agregarItem: (producto: any) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  actualizarPrecio: (id: number, precio: number) => void;
  eliminarItem: (id: number) => void;
  setItemsDesdeOcr: (items: ItemCompra[]) => void;
  total: number;

  // Paso 5 - Confirmar
  confirmarCompra: (facturaNumero: string, fecha: string) => Promise<{ success: boolean; error?: string }>;
  cargandoConfirmar: boolean;

  // Navegación entre pasos
  paso: number;
  irAPaso: (n: number) => void;
  resetear: () => void;
}

const CompraContext = createContext<CompraContextType | null>(null);

export function CompraProvider({ children }: any) {
  const [proveedorId, setProveedorId] = useState<number | null>(null);
  const [proveedorNombre, setProveedorNombre] = useState("");
  const [modo, setModo] = useState<ModoRegistro>(null);
  const [items, setItems] = useState<ItemCompra[]>([]);
  const [paso, setPaso] = useState(1);
  const [cargandoConfirmar, setCargandoConfirmar] = useState(false);

  const setProveedor = (id: number, nombre: string) => {
    setProveedorId(id);
    setProveedorNombre(nombre);
  };

  const agregarItem = (producto: any) => {
    setItems(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1, subtotal: (p.cantidad + 1) * p.precio }
            : p
        );
      }
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.NOM_PRO,
          precio: producto.PRECIO_COMPRA_PRO,
          cantidad: 1,
          subtotal: producto.PRECIO_COMPRA_PRO,
        },
      ];
    });
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad < 1) return;
    setItems(prev =>
      prev.map(p =>
        p.id === id ? { ...p, cantidad, subtotal: cantidad * p.precio } : p
      )
    );
  };

  const actualizarPrecio = (id: number, precio: number) => {
    setItems(prev =>
      prev.map(p =>
        p.id === id ? { ...p, precio, subtotal: p.cantidad * precio } : p
      )
    );
  };

  const eliminarItem = (id: number) => {
    setItems(prev => prev.filter(p => p.id !== id));
  };

  const setItemsDesdeOcr = (nuevosItems: ItemCompra[]) => {
    setItems(nuevosItems);
  };

  const total = items.reduce((sum, i) => sum + i.subtotal, 0);

  const irAPaso = (n: number) => setPaso(n);

  const resetear = () => {
    setProveedorId(null);
    setProveedorNombre("");
    setModo(null);
    setItems([]);
    setPaso(1);
  };

  const confirmarCompra = async (facturaNumero: string, fecha: string) => {
    try {
      setCargandoConfirmar(true);
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;

      // 1. Crear cabecera de compra
      const resCompra = await fetch(`${BASE_URL}/api/compras/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_usu: user?.id,
          FACTURA_COMPRA: facturaNumero,
          TOTAL_COM: total,
          FECHA_COM: fecha,
        }),
      });

      if (!resCompra.ok) {
        const err:any = await resCompra.json();
        return { success: false, error: err.message || "Error al crear la compra" };
      }

      const compraData:any = await resCompra.json();
      const id_com = compraData["compra creada"].id;

      // 2. Crear detalle por cada item
      for (const item of items) {
        const resDetalle = await fetch(`${BASE_URL}/api/detalle_compras/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_com,
            id_pro: item.id,
            CANT_DET_COMPRA: item.cantidad,
            SUB_TOTAL_DET_COMPRA: item.subtotal,
          }),
        });

        if (!resDetalle.ok) {
          return { success: false, error: `Error en detalle de ${item.nombre}` };
        }
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "Error de red" };
    } finally {
      setCargandoConfirmar(false);
    }
  };

  return (
    <CompraContext.Provider
      value={{
        proveedorId,
        proveedorNombre,
        setProveedor,
        modo,
        setModo,
        items,
        agregarItem,
        actualizarCantidad,
        actualizarPrecio,
        eliminarItem,
        setItemsDesdeOcr,
        total,
        confirmarCompra,
        cargandoConfirmar,
        paso,
        irAPaso,
        resetear,
      }}
    >
      {children}
    </CompraContext.Provider>
  );
}

export function useCompra() {
  return useContext(CompraContext)!;
}