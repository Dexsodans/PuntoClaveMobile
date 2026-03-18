import { View, Text } from "react-native";
import { Button } from "react-native";
import { DataTable, Badge, ScrollView,KeyboardAvoidingView} from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function ProveedorList({ data, onEdit, onDelete }: any) {

  // 🔥 Transformamos data correctamente
  const rows = data.map((item: any) => ({
    id: item.id,
    name: item.NOM_PROV,
    email: item.EMAIL_PROV,
    status: item.EST_PROV ? "Activo" : "Inactivo",
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      sortable: true,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Estado",
      width: 100,
      renderCell: ({ value }: any) => (
        <Badge>
          <Text>{value}</Text>
        </Badge>
      ),
    },

    {
      field: "acciones",
      headerName: "Acciones",
      width: 160,
      renderCell: ({ row }: any) => (
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Button title="Editar" onPress={() => onEdit(row)} />
          <Button title="Eliminar" onPress={() => onDelete(row.id)} />
        </View>
      ),
    },
  ];
  const [refreshing, setRefreshing] = React.useState(false);
  const handleRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 2000);
    }, []);

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4"
        refreshing={refreshing}
        onRefresh={handleRefresh}
      >
        <KeyboardAvoidingView className="flex-1">
          <Text>HolA</Text>
            <View style={{ marginTop: 20 }}>
              <DataTable
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 25]}
                selectable
                onRowClick={(row: any) => console.log(row)}
              />
            </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
    
  );
}