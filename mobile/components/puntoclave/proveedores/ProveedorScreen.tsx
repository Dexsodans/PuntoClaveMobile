import { View, Button, Alert, ScrollView, KeyboardAvoidingView} from "react-native";
import { useEffect, useState } from "react";
import ProveedorForm from "./ProveedorForm";
import ProveedorList from "./ProveedorList";
import BASE_URL from "@/lib/api";
import { SafeAreaView } from "react-native-safe-area-context";

const API = `${BASE_URL}/api/proveedores/`;

export default function ProveedorScreen() {

  const [proveedores, setProveedores] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  // 🟢 GET
  const getProveedores = async () => {
    try {
      const res = await fetch(API);
      const data:any = await res.json();
      setProveedores(data);
    } catch {
      Alert.alert("Error", "No se pudo cargar");
    }
  };

  useEffect(() => {
    getProveedores();
  }, []);

  // 🔵 CREATE
  const createProveedor = async (data: any) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        getProveedores();
        setShowForm(false);
      } else {
        const error: any = await res.json();
        Alert.alert("Error", error.error);
      }
    } catch {
      Alert.alert("Error", "No se pudo crear");
    }
  };

  // 🟡 UPDATE
  const updateProveedor = async (data: any) => {
    try {
      const res = await fetch(`${API}${selected.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        getProveedores();
        setShowForm(false);
      } else {
        const error: any = await res.json();
        Alert.alert("Error", error.error);
      }
    } catch {
      Alert.alert("Error", "No se pudo actualizar");
    }
  };

  // 🔴 DELETE
  const deleteProveedor = async (id: number) => {
    Alert.alert("Confirmar", "¿Eliminar proveedor?", [
      {
        text: "Sí",
        onPress: async () => {
          await fetch(`${API}${id}/`, { method: "DELETE" });
          getProveedores();
        },
      },
      { text: "No" },
    ]);
  };

  // UI control
  const handleCreate = () => {
    setSelected(null);
    setShowForm(true);
  };

  const handleEdit = (prov: any) => {
    setSelected(prov);
    setShowForm(true);
  };
  

  return (
        <SafeAreaView edges={["top"]} className="flex-1">
    <ScrollView style={{ padding: 20 }}>
      
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>
        <Button title="Nuevo Proveedor" onPress={handleCreate} />
      </View>
      <ProveedorList
        data={proveedores}
        onEdit={handleEdit}
        onDelete={deleteProveedor}
      />

      {showForm && (
        <ProveedorForm
          proveedor={selected}
          onSubmit={selected ? updateProveedor : createProveedor}
          onCancel={() => setShowForm(false)}
        />
      )}
    </ScrollView>
    </SafeAreaView>
  );
}