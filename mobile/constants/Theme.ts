// constants/theme.ts

export const colors = {
  // ── Primarios ──
  primary: {
    50:  "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",   // azul principal
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },

  // ── Celeste / Sky ──
  sky: {
    50:  "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",   // celeste principal (ya lo usas en login)
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },

  // ── Naranja / Accent ──
  orange: {
    50:  "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",   // naranja principal
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
  },

  // ── Neutros ──
  neutral: {
    0:   "#ffffff",
    50:  "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // ── Semánticos ──
  success: {
    light: "#dcfce7",
    main:  "#22c55e",
    dark:  "#15803d",
  },
  error: {
    light: "#fee2e2",
    main:  "#ef4444",
    dark:  "#b91c1c",
  },
  warning: {
    light: "#fef9c3",
    main:  "#eab308",
    dark:  "#a16207",
  },
  info: {
    light: "#dbeafe",
    main:  "#3b82f6",
    dark:  "#1d4ed8",
  },
} as const;

// ── Alias semánticos (los que usas día a día) ──
export const palette = {
  // Backgrounds
  bgPrimary:    colors.neutral[0],      // blanco puro
  bgSecondary:  colors.neutral[50],     // gris muy claro (pantallas)
  bgTertiary:   colors.neutral[100],    // gris claro (cards, inputs)

  // Texto
  textPrimary:   colors.neutral[900],   // casi negro
  textSecondary: colors.neutral[500],   // gris medio
  textMuted:     colors.neutral[400],   // gris claro
  textInverse:   colors.neutral[0],     // blanco (sobre fondos oscuros)
  textNegative:  colors.error.main,      // rojo (para errores)

  // Acción principal
  actionPrimary:       colors.sky[400],     // celeste — botones principales
  actionPrimaryHover:  colors.sky[500],
  actionPrimaryText:   colors.neutral[0],

  // Acción secundaria
  actionSecondary:     colors.primary[500], // azul — botones secundarios
  actionSecondaryText: colors.neutral[0],

  // Accent
  accent:      colors.orange[500],      // naranja — badges, ofertas, destacados
  accentLight: colors.orange[100],
  accentText:  colors.orange[700],

  // Bordes
  borderLight:  colors.neutral[200],
  borderMedium: colors.neutral[300],

  // Carrito / ecommerce
  cartBadge:    colors.orange[500],     // badge con número de items
  pricePrimary: colors.primary[700],    // precio principal
  priceOffer:   colors.orange[500],     // precio en oferta
  priceStrike:  colors.neutral[400],    // precio tachado
  stockLow:     colors.warning.main,    // poco stock
  stockOut:     colors.error.main,      // sin stock
  sky: colors.sky,

  // Estados
  success: {
    light: colors.success.light,
    main: colors.success.main,
    dark: colors.success.dark,
  },
  error: {
    light: colors.error.light,
    main: colors.error.main,
    dark: colors.error.dark,
  },
  warning: {
    light: colors.warning.light,
    main: colors.warning.main,
    dark: colors.warning.dark,
  },
  info: {
    light: colors.info.light,
    main: colors.info.main,
    dark: colors.info.dark,
  },
} as const;

// ── Tipografía ──
export const typography = {
  // Tamaños
  size: {
    xs:   10,
    sm:   12,
    base: 14,
    md:   16,
    lg:   18,
    xl:   20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
  },

  // Pesos
  weight: {
    regular:  "400" as const,
    medium:   "500" as const,
    semibold: "600" as const,
    bold:     "700" as const,
  },

  // Altura de línea
  leading: {
    tight:  1.2,
    normal: 1.5,
    loose:  1.8,
  },
} as const;

// ── Espaciado ──
export const spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  base: 16,
  lg:   20,
  xl:   24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
} as const;

// ── Bordes ──
export const radius = {
  sm:   6,
  md:   10,
  lg:   14,
  xl:   20,
  full: 9999,
} as const;

// ── Sombras ──
export const shadows = {
  sm: {
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 5,
  },
  lg: {
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 10,
  },
  // Sombra con color (para botones)
  sky: {
    shadowColor: colors.sky[400],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  orange: {
    shadowColor: colors.orange[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
} as const;