import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { loginStyles } from "@/assets/styles/auth/loginStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

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

        {/* 🔝 70% Imagen + Logo */}
        <View style={loginStyles.topSection}>
          <ImageBackground
            source={require("@/assets/images/fondoBonito.png")} // cambia por tu imagen
            style={loginStyles.backgroundImage}
          >
            <View style={loginStyles.overlay}>
              <Image
                source={require("@/assets/images/puntoClave.png")}
                style={loginStyles.logo}
              />
            </View>
          </ImageBackground>
        </View>

        {/* 🔽 30% Formulario */}
        <LinearGradient
          colors={["#ffffff", "#38bdf8"]}
          style={loginStyles.bottomSection}
        >
          <View style={loginStyles.card}>
            <Text style={loginStyles.title}>Inicia Sesion Porfavor</Text>
            {/* Email */}
            <View style={loginStyles.inputContainer}>

              <Ionicons name="mail-outline" size={20} color="#64748b" />
              <TextInput
                style={loginStyles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={loginStyles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
              <TextInput
                style={loginStyles.input}
                placeholder="Contraseña"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Botón login */}
            <TouchableOpacity
              style={loginStyles.button}
              onPress={() => onSubmit(email, password)}
            >
              <Text style={loginStyles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {/* Registro */}
            <TouchableOpacity onPress={onRegister}>
              <Text style={loginStyles.registerText}>
                ¿No tienes cuenta? Regístrate
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
}