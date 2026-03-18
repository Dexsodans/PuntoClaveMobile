import { View, TextInput, Button, Text } from "react-native";
import { useState, useEffect } from "react";

export default function ProveedorForm({ proveedor, onSubmit, onCancel }: any) {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nit, setNit] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (proveedor) {
      setNombre(proveedor.NOM_PROV);
      setEmail(proveedor.EMAIL_PROV);
      setTelefono(proveedor.TEL_PROV || "");
      setNit(proveedor.NIT_PROV || "");
    }
  }, [proveedor]);

  const validate = () => {

    if (!nombre) {
      setError("El nombre es obligatorio");
      return false;
    }

    if (!email.endsWith("@gmail.com")) {
      setError("El email debe ser @gmail.com");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      NOM_PROV: nombre,
      EMAIL_PROV: email,
      TEL_PROV: telefono,
      NIT_PROV: nit,
    });
  };

  return (
    <View style={{ marginTop: 20 }}>

      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} />
      <TextInput placeholder="NIT" value={nit} onChangeText={setNit} />

      {error !== "" && (
        <Text style={{ color: "orange" }}>{error}</Text>
      )}

      <Button title="Guardar" onPress={handleSubmit} />
      <Button title="Cancelar" onPress={onCancel} />

    </View>
  );
}