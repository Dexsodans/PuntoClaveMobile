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
import Animated, { FadeInDown } from "react-native-reanimated";
import AnimatedBackground from "@/components/puntoclave/auth/AnimatedBackground"; // ajusta el path

interface Props {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
  onVolver: () => void;
}

export default function RegisterForm({ onSubmit, onVolver }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) {
      setError("Por favor ingresa un nombre");
      return false;
    }
    if (/\d/.test(name)) {
      setError("El nombre no debe contener números");
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
    if (validate()) onSubmit({ name, email, password });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AnimatedBackground style={loginStyles.registerBackground}>

        {/* Logo esquina */}
        <Image
          source={require("@/assets/images/puntoClave.png")}
          style={loginStyles.logoCorner}
          resizeMode="contain"
        />

        {/* Card con entrada animada */}
        <Animated.View
          entering={FadeInDown.duration(600).springify()}
          style={loginStyles.registerOverlay}
        >
          <View style={loginStyles.registerCard}>
            <Text style={loginStyles.registerTitle}>Crear Cuenta</Text>

            <TextInput
              style={loginStyles.registerInput}
              placeholder="Nombre completo"
              placeholderTextColor="#94a3b8"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={loginStyles.registerInput}
              placeholder="Correo (@gmail.com)"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={loginStyles.registerInput}
              placeholder="Contraseña"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {error !== "" && (
              <Text style={loginStyles.errorText}>{error}</Text>
            )}

            <TouchableOpacity
              style={loginStyles.button}
              onPress={handleSubmit}
              activeOpacity={0.85}
            >
              <Text style={loginStyles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onVolver}>
              <Text style={loginStyles.registerText}>← Volver al login</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

      </AnimatedBackground>
    </KeyboardAvoidingView>
  );
}