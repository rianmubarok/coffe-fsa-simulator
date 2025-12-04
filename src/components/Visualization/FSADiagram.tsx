import React from "react";
import { FSAState } from "../data/types";

interface FSADiagramProps {
  currentState: FSAState;
}

// State labels sesuai referensi
const stateLabels: Record<string, string> = {
  S: "S\n(Start)",
  A: "A\n(Kopi)",
  B: "B\n(Susu)",
  C: "C\n(Coklat)",
  D: "D\n(Kopi Susu)",
  E: "E\n(Kopi Coklat)",
  F: "F\n(Mocca)",
  G: "G\n(Susu Coklat)",
  H: "H\n(Gelas S)",
  I: "I\n(Gelas M)",
  J: "J\n(Gelas L)",
  K: "K\n(Gula)",
  L: "L\n(Kopi)",
  M: "M\n(Susu)",
  N: "N\n(Coklat)",
  O: "O\n(Air)",
  FINAL: "Final\n(Aduk)",
};

// Warna putih dengan border hitam untuk semua state
const getStateStyle = (state: string, currentState: FSAState) => {
  const isActive = state === currentState;
  const isFinal = state === "FINAL";
  const isStart = state === "S";

  // Semua state menggunakan bg putih
  const bgColor = "bg-white";
  const textColor = "text-gray-800";

  // Border hitam untuk semua state
  let borderStyle = "";

  if (isStart || isFinal) {
    // Start dan Final state menggunakan double border
    borderStyle = "border-2 border-black";
  } else {
    // State biasa menggunakan border hitam
    borderStyle = isActive
      ? "border-4 border-black ring-2 ring-blue-500"
      : "border-2 border-black";
  }

  return `${bgColor} ${textColor} ${borderStyle}`;
};

export const FSADiagram: React.FC<FSADiagramProps> = ({ currentState }) => {
  return (
    <div>
      <h3 className="text-black mb-3">Diagram FSA</h3>
      <div className="bg-white p-6 rounded-lg overflow-x-auto">
        <div className="flex flex-col items-center space-y-4 min-w-max">
          {/* Start State - Double Circle */}
          <div
            className={`w-20 h-20 rounded-full ${getStateStyle(
              "S",
              currentState
            )} flex flex-col items-center justify-center font-bold text-sm transition-all duration-300 relative`}
          >
            <div className="absolute inset-0 rounded-full border-4 border-black"></div>
            <div className="absolute inset-2 rounded-full border-2 border-black"></div>
            <div className="relative z-10 text-center leading-tight">
              {stateLabels["S"]}
            </div>
          </div>

          <div className="text-gray-500 text-sm">↓ pilih minuman (a-g)</div>

          {/* Drink States (A-G) */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["A", "B", "C", "D", "E", "F", "G"].map((state) => (
              <div
                key={state}
                className={`w-16 h-16 rounded-full ${getStateStyle(
                  state,
                  currentState
                )} flex flex-col items-center justify-center font-bold text-xs transition-all duration-300`}
              >
                <div className="text-center leading-tight">
                  {stateLabels[state]}
                </div>
              </div>
            ))}
          </div>

          <div className="text-gray-500 text-sm">↓ pilih ukuran (h-j)</div>

          {/* Size States (H, I, J) */}
          <div className="flex gap-4">
            {["H", "I", "J"].map((state) => (
              <div
                key={state}
                className={`w-16 h-16 rounded-full ${getStateStyle(
                  state,
                  currentState
                )} flex flex-col items-center justify-center font-bold text-xs transition-all duration-300`}
              >
                <div className="text-center leading-tight">
                  {stateLabels[state]}
                </div>
              </div>
            ))}
          </div>

          <div className="text-gray-500 text-sm">↓ tambah gula (k)</div>

          {/* Gula State (K) */}
          <div
            className={`w-16 h-16 rounded-full ${getStateStyle(
              "K",
              currentState
            )} flex flex-col items-center justify-center font-bold text-xs transition-all duration-300`}
          >
            <div className="text-center leading-tight">{stateLabels["K"]}</div>
          </div>

          <div className="text-gray-500 text-sm">↓ tambah bahan (l, m, n)</div>

          {/* Ingredient States (L, M, N) */}
          <div className="flex gap-4">
            {["L", "M", "N"].map((state) => (
              <div
                key={state}
                className={`w-16 h-16 rounded-full ${getStateStyle(
                  state,
                  currentState
                )} flex flex-col items-center justify-center font-bold text-xs transition-all duration-300`}
              >
                <div className="text-center leading-tight">
                  {stateLabels[state]}
                </div>
              </div>
            ))}
          </div>

          <div className="text-gray-500 text-sm">↓ tambah air (o)</div>

          {/* Water State (O) */}
          <div
            className={`w-16 h-16 rounded-full ${getStateStyle(
              "O",
              currentState
            )} flex flex-col items-center justify-center font-bold text-xs transition-all duration-300`}
          >
            <div className="text-center leading-tight">{stateLabels["O"]}</div>
          </div>

          <div className="text-gray-500 text-sm">↓ aduk (p)</div>

          {/* Final State - Double Circle */}
          <div
            className={`w-20 h-20 rounded-full ${getStateStyle(
              "FINAL",
              currentState
            )} flex flex-col items-center justify-center font-bold text-sm transition-all duration-300 relative`}
          >
            <div className="absolute inset-0 rounded-full border-4 border-black"></div>
            <div className="absolute inset-2 rounded-full border-2 border-black"></div>
            <div className="relative z-10 text-center leading-tight">
              {stateLabels["FINAL"]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
