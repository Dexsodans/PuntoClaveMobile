import { useRouter } from "expo-router";
import RegisterForm from "@/components/puntoclave/auth/registerForm";
import { Alert } from "react-native";
import BASE_URL from "@/lib/api";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Register() {

  const router = useRouter();

  const handleRegister = async (formData: any) => {

    try {
      const response = await fetch(`${BASE_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: any = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Usuario registrado");
        router.replace("/(auth)");
      } else {
        Alert.alert("Error", data.error);
      }

    } catch (error) {
      Alert.alert("Error", "No se pudo conectar");
    }
  };
  const goToLogin = () => {
    router.push("/(auth)"); 
  };

  return <RegisterForm onSubmit={handleRegister} onVolver={goToLogin} />

}