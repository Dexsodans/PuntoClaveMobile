import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // ── LOGIN: sección superior (70%) ──
  topSection: {
    flex: 7,
    overflow: "hidden",
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 140,
    height: 140,
  },

  // ── LOGIN: sección inferior (30%) ──
  bottomSection: {
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  card: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1e293b",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.3)",
  },

  input: {
    flex: 1,
    padding: 12,
    color: "#0f172a",
    fontSize: 15,
  },

  button: {
    backgroundColor: "#0ea5e9",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
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
    fontSize: 14,
  },

  // ── REGISTER ──
  registerBackground: {
    flex: 1,
    overflow: "hidden",
  },

  registerOverlay: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    // Sin backgroundColor oscuro — los orbes son el fondo
  },

  logoCorner: {
    position: "absolute",
    top: 52,
    left: 24,
    width: 80,
    height: 80,
  },

  registerCard: {
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
    // glassmorphism
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },

  registerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1e293b",
  },

  registerInput: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 12,
    padding: 13,
    marginBottom: 13,
    color: "#0f172a",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.3)",
  },

  errorText: {
    color: "#e11d48",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 13,
  },
});