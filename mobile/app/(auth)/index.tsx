import { useRouter } from "expo-router";
import { Alert } from "react-native";
import LoginForm from "@/components/puntoclave/auth/loginForm";
import BASE_URL from "@/lib/api";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {

  const router = useRouter();

    const handleLogin = async (email: string, password: string) => {

  try {
    const response = await fetch(`${BASE_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data: any = await response.json(); // 👈 aquí el fix rápido

    if (response.ok) {
      // Guardar el token y la información del usuario en AsyncStorage
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
      console.log("Login exitoso", data);
      router.replace("/(tabs)");
    } else {
      console.log("Error:", data);
      Alert.alert("Error", data.error || "Error al iniciar sesión");
    }

  } catch (error) {
    console.log("Error conexión:", error);
    Alert.alert("Error", "No se pudo conectar al servidor");
  }
};

  const goToRegister = () => {
    router.push("/register"); 
  };

  return (
    <SafeAreaProvider>
      <LoginForm onSubmit={handleLogin} onRegister={goToRegister} />
    </SafeAreaProvider>
  );
}