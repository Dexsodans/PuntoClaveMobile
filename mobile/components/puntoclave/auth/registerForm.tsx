import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
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
    <ImageBackground
      source={require("@/assets/images/fondoBonito.png")} // 🔥 tu imagen
      style={loginStyles.backgroundImage}
      resizeMode="cover"
    >

      {/* 🔹 Overlay oscuro para que se vea el texto */}
      <View style={loginStyles.overlay}>

        {/* 🔹 Logo en esquina */}
        <Image
          source={require("@/assets/images/puntoClave.png")}
          style={loginStyles.logoCorner}
          resizeMode="contain"
        />

        {/* 🔹 Formulario */}
        <View style={loginStyles.registerCard}>
          <Text style={loginStyles.title}>Crear Cuenta</Text>

          <TextInput
            style={loginStyles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={loginStyles.input}
            placeholder="Correo (@gmail.com)"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={loginStyles.input}
            placeholder="Contraseña"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Error */}
          {error !== "" && (
            <Text style={loginStyles.errorText}>
              {error}
            </Text>
          )}

          {/* Botón */}
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
    </ImageBackground>
  );
}