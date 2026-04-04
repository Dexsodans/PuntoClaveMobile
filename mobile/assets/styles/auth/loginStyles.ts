import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // 🔝 Parte superior (70%)
  topSection: {
    flex: 7,
  },

  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    /* Ayudame a aumentarle el tamaño */
    width: "100%",
    height: "100%",
  },

overlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)", // 🔥 oscurece la imagen
  padding: 20,
  justifyContent: "center",
},


  logo: {
    justifyContent: "center",
    width: 140,
    height: 140,
  },

  // 🔽 Parte inferior (30%)
  bottomSection: {
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  // Card
  card: {
    flex: 1, // 🔥 clave
  justifyContent: "center",
  padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#ffffff",
  },

  // Inputs con iconos
 inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.8)", // 🔥 semi transparente
  borderRadius: 12,
  paddingHorizontal: 10,
  marginBottom: 15,
},

  input: {
    flex: 1,
    padding: 12,
    color: "#0f172a",
  },

  // Botón
  button: {
    backgroundColor: "#0ea5e9",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  registerText: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 15,
  },
  background: {
  flex: 1,
},


logoCorner: {
  position: "absolute",
  top: 40,
  left: 20,
  width: 80,
  height: 80,
},

registerCard: {
  backgroundColor: "rgba(255,255,255,0.9)", // 🔥 vidrio moderno
  borderRadius: 20,
  padding: 20,
},

errorText: {
  color: "#f87171",
  marginBottom: 10,
  textAlign: "center",
  fontWeight: "500",
},
});
