import React, { createContext, useContext, useRef, useState } from "react";
import { View } from "react-native";

interface CarritoContextType {
  cartIconRef: React.RefObject<View>;
  cartPos: React.MutableRefObject<{ x: number; y: number }>; // 👈
  conteo: number;
  setConteo: React.Dispatch<React.SetStateAction<number>>;
}

const CarritoContext = createContext<CarritoContextType>({} as CarritoContextType);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const cartIconRef = useRef<View>(null);
  const cartPos = useRef({ x: 0, y: 0 }); // 👈
  const [conteo, setConteo] = useState<number>(0);

  return (
    <CarritoContext.Provider value={{ cartIconRef, cartPos, conteo, setConteo }}>
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);