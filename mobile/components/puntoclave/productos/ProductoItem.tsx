import { View, Image } from "react-native";
import { Text } from "react-native";
import { Card, CardContent } from "@/components/ui";
export default function ProductoItem({ producto }: any) {
  return (
    <Card style={{ marginBottom: 10, borderRadius: 12 }}>
      <CardContent style={{ flexDirection: "row", alignItems: "center" }}>
        
        {/* Imagen */}
        <Image
          source={{ uri: producto.IMAGEN_PRO }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 10,
            marginRight: 10,
          }}
        />

        {/* Info */}
        <View style={{ flex: 1 }}>
          <Text >{producto.NOM_PRO}</Text>
          <Text >{producto.DESC_PRO}</Text>
          <Text style={{ marginTop: 5 }}>
            Bs. {producto.PRECIO_VENTA_PRO}
          </Text>
        </View>

      </CardContent>
    </Card>
  );
}