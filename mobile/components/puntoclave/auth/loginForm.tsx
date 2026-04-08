import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { loginStyles } from "@/assets/styles/auth/loginStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import AnimatedBackground from "@/components/puntoclave/auth/AnimatedBackground"; // ajusta el path


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

        {/* 🔝 70% — Orbes animados + Logo */}
        <View style={loginStyles.topSection}>
          <AnimatedBackground style={{ flex: 1 }}>
            <View style={loginStyles.overlay}>
              <Image
                source={require("@/assets/images/puntoClave.png")}
                style={loginStyles.logo}
                resizeMode="contain"
              />
            </View>
          </AnimatedBackground>
        </View>

        {/* 🔽 30% — Formulario */}
        <LinearGradient
          colors={["#f0f9ff", "#bae6fd", "#38bdf8"]}
          style={loginStyles.bottomSection}
        >
          <Animated.View
            entering={FadeInDown.duration(600).springify()}
            style={loginStyles.card}
          >
            <Text style={loginStyles.title}>Inicia Sesión</Text>

            <View style={loginStyles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#64748b" />
              <TextInput
                style={loginStyles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

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

            <TouchableOpacity
              style={loginStyles.button}
              onPress={() => onSubmit(email, password)}
              activeOpacity={0.85}
            >
              <Text style={loginStyles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onRegister}>
              <Text style={loginStyles.registerText}>
                ¿No tienes cuenta? Regístrate
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>

      </View>
    </KeyboardAvoidingView>
  );
}