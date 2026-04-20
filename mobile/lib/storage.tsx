import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKENS_KEY = '@PuntoClave_tokens';
const USER_KEY = '@PuntoClave_user';

export interface StoredTokens {
  access: string;
  refresh: string;
}

export interface StoredUser {
  id: number;
  name: string;
  email: string;
}

// Función auxiliar para usar localStorage directamente en web
const useLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return true;
  }
  return false;
};

// Guardar tokens
export const saveTokens = async (tokens: StoredTokens) => {
  try {
    if (!tokens.access || !tokens.refresh) {
      throw new Error('Tokens inválidos: falta access o refresh');
    }
    
    const serialized = JSON.stringify(tokens);
    console.log(`💾 [Storage] Intentando guardar tokens...`);
    console.log(`   - Access token: ${tokens.access.substring(0, 20)}...`);
    console.log(`   - Refresh token: ${tokens.refresh.substring(0, 20)}...`);
    console.log(`   - Tamaño: ${serialized.length} bytes`);
    console.log(`   - En web: ${useLocalStorage()}`);
    
    // Intentar guardar con AsyncStorage primero
    try {
      await AsyncStorage.setItem(TOKENS_KEY, serialized);
      console.log(`✅ [Storage] AsyncStorage - Guardado exitoso`);
    } catch (asyncError) {
      console.warn(`⚠️ [Storage] AsyncStorage falló, intentando localStorage...`, asyncError);
      // Fallback a localStorage si estamos en web
      if (useLocalStorage()) {
        window.localStorage.setItem(TOKENS_KEY, serialized);
        console.log(`✅ [Storage] localStorage - Guardado exitoso`);
      } else {
        throw asyncError;
      }
    }
    
    // Verificar inmediatamente
    let saved: string | null = null;
    try {
      saved = await AsyncStorage.getItem(TOKENS_KEY);
    } catch {
      if (useLocalStorage()) {
        saved = window.localStorage.getItem(TOKENS_KEY);
      }
    }
    
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log(`✅ [Storage] ✓ Verificación exitosa: tokens guardados`);
      console.log(`   - Access en storage: ${parsed.access.substring(0, 20)}...`);
      return true;
    } else {
      throw new Error('❌ Verificación fallida: no se encontraron los tokens');
    }
  } catch (error) {
    console.error('❌ [Storage] ERROR CRÍTICO al guardar tokens:', error);
    throw error;
  }
};

// Obtener tokens
export const getTokens = async (): Promise<StoredTokens | null> => {
  try {
    console.log(`🔓 [Storage] Obteniendo tokens...`);
    let tokens: string | null = null;
    
    try {
      tokens = await AsyncStorage.getItem(TOKENS_KEY);
    } catch {
      if (useLocalStorage()) {
        tokens = window.localStorage.getItem(TOKENS_KEY);
      }
    }
    
    if (tokens) {
      const parsed = JSON.parse(tokens);
      console.log(`✅ [Storage] Tokens obtenidos`);
      return parsed;
    }
    console.warn(`⚠️ [Storage] No hay tokens guardados`);
    return null;
  } catch (error) {
    console.error('❌ [Storage] Error getting tokens:', error);
    return null;
  }
};

// Guardar usuario
export const saveUser = async (user: StoredUser) => {
  try {
    if (!user.id || !user.email) {
      throw new Error('Usuario inválido: falta id o email');
    }
    
    const serialized = JSON.stringify(user);
    console.log(`💾 [Storage] Intentando guardar usuario...`);
    console.log(`   - ID: ${user.id}`);
    console.log(`   - Email: ${user.email}`);
    console.log(`   - En web: ${useLocalStorage()}`);
    
    // Intentar guardar con AsyncStorage primero
    try {
      await AsyncStorage.setItem(USER_KEY, serialized);
      console.log(`✅ [Storage] AsyncStorage - Usuario guardado exitoso`);
    } catch (asyncError) {
      console.warn(`⚠️ [Storage] AsyncStorage falló, intentando localStorage...`, asyncError);
      // Fallback a localStorage si estamos en web
      if (useLocalStorage()) {
        window.localStorage.setItem(USER_KEY, serialized);
        console.log(`✅ [Storage] localStorage - Usuario guardado exitoso`);
      } else {
        throw asyncError;
      }
    }
    
    // Verificar inmediatamente
    let saved: string | null = null;
    try {
      saved = await AsyncStorage.getItem(USER_KEY);
    } catch {
      if (useLocalStorage()) {
        saved = window.localStorage.getItem(USER_KEY);
      }
    }
    
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log(`✅ [Storage] ✓ Verificación exitosa: usuario guardado`);
      console.log(`   - Usuario en storage: ${parsed.email}`);
      return true;
    } else {
      throw new Error('❌ Verificación fallida: no se encontró el usuario');
    }
  } catch (error) {
    console.error('❌ [Storage] ERROR CRÍTICO al guardar usuario:', error);
    throw error;
  }
};

// Obtener usuario
export const getUser = async (): Promise<StoredUser | null> => {
  try {
    console.log(`👤 [Storage] Obteniendo usuario...`);
    let user: string | null = null;
    
    try {
      user = await AsyncStorage.getItem(USER_KEY);
    } catch {
      if (useLocalStorage()) {
        user = window.localStorage.getItem(USER_KEY);
      }
    }
    
    if (user) {
      const parsed = JSON.parse(user);
      console.log(`✅ [Storage] Usuario obtenido: ${parsed.email}`);
      return parsed;
    }
    console.warn(`⚠️ [Storage] No hay usuario guardado`);
    return null;
  } catch (error) {
    console.error('❌ [Storage] Error getting user:', error);
    return null;
  }
};

// Limpiar todo (logout)
export const clearAuth = async () => {
  try {
    console.log(`🧹 [Storage] Limpiando auth...`);
    
    try {
      await AsyncStorage.multiRemove([TOKENS_KEY, USER_KEY]);
      console.log(`✅ [Storage] AsyncStorage - Auth limpiado`);
    } catch {
      if (useLocalStorage()) {
        window.localStorage.removeItem(TOKENS_KEY);
        window.localStorage.removeItem(USER_KEY);
        console.log(`✅ [Storage] localStorage - Auth limpiado`);
      }
    }
  } catch (error) {
    console.error('❌ [Storage] Error clearing auth:', error);
  }
};

// Actualizar access token
export const updateAccessToken = async (newAccessToken: string) => {
  try {
    const tokens = await getTokens();
    if (tokens) {
      tokens.access = newAccessToken;
      await saveTokens(tokens);
      console.log(`🔄 [Storage] Access token actualizado`);
    }
  } catch (error) {
    console.error('❌ [Storage] Error updating access token:', error);
  }
};
