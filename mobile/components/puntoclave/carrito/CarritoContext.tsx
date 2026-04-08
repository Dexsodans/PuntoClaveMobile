import React, { createContext, useContext, useRef, useState } from "react";
import { View } from "react-native";

interface CartPosition {
  x: number;
  y: number;
}

interface CarritoContextType {
  cartIconRef: React.RefObject<View>;
  conteo: number;
  setConteo: React.Dispatch<React.SetStateAction<number>>;
}

const CarritoContext = createContext<CarritoContextType>({} as CarritoContextType);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const cartIconRef:any = useRef<View>(null);
  const [conteo, setConteo] = useState<number>(0);

  return (
    <CarritoContext.Provider value={{ cartIconRef, conteo, setConteo }}>
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);