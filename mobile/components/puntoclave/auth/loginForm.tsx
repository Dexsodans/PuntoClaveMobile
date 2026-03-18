import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { loginStyles } from "@/assets/styles/auth/loginStyles";

interface Props {
  onSubmit: (email: string, password: string) => void;
  onRegister: () => void;
}

export default function LoginForm({ onSubmit, onRegister }: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={loginStyles.container}>

      {/* Logo */}
      <Image
        source={require("@/assets/images/puntoClave.png")} // cambia por tu logo
        style={loginStyles.logo}
        resizeMode="contain"
      />

      {/* Card */}
      <View style={loginStyles.card}>
        <Text style={loginStyles.title}>Bienvenido a PuntoClave</Text>

        <TextInput
          style={loginStyles.input}
          placeholder="Correo o usuario"
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

        {/* Botón login */}
        <TouchableOpacity
          style={loginStyles.button}
          onPress={() => onSubmit(email, password)}
        >
          <Text style={loginStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Botón register */}
        <TouchableOpacity onPress={onRegister}>
          <Text style={loginStyles.registerText}>
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}