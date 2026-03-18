import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import { useState } from "react";
import { loginStyles } from "@/assets/styles/auth/loginStyles";

interface Props {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
  }) => void;
  onVolver: () => void;
}

export default function RegisterForm({ onSubmit, onVolver }: Props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (/\d/.test(name)) {
      setError("El nombre no debe contener números");
      return false;
    }

    if (!name.trim()) {
      setError("Por favor ingresa un nombre");
      return false;
    }

    if (!email.endsWith("@gmail.com")) {
      setError("El email debe ser @gmail.com");
      return false;
    }

    if (!password.trim()) {
      setError("Por favor ingresa una contraseña");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ name, email, password });
    }
  };

  return (
    <View style={loginStyles.container}>

      {/* Logo */}
      <Image
        source={require("@/assets/images/puntoClave.png")} 
        style={loginStyles.logo}
        resizeMode="contain"
      />

      {/* Card */}
      <View style={loginStyles.card}>
        <Text style={loginStyles.title}>Crear Cuenta</Text>

        <TextInput
          style={loginStyles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Correo (@gmail.com)"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Error bonito */}
        {error !== "" && (
          <Text style={loginStyles.errorText}>
            {error}
          </Text>
        )}

        {/* Botón register */}
        <TouchableOpacity
          style={loginStyles.button}
          onPress={handleSubmit}
        >
          <Text style={loginStyles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Volver */}
        <TouchableOpacity onPress={onVolver}>
          <Text style={loginStyles.registerText}>
            ← Volver al login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}