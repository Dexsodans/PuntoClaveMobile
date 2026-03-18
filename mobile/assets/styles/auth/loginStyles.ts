import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#334155",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    color: "#fff",
  },

  button: {
    backgroundColor: "#3b82f6",
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
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 15,
  },
  errorText: {
  color: "#f87171",
  marginBottom: 10,
  textAlign: "center",
  fontWeight: "500",
},
});