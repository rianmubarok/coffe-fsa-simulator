import React from "react";
import { FSAState } from "../data/types";

interface FSADiagramProps {
  currentState: FSAState;
}

// State labels sesuai spesifikasi FSA
const stateLabels: Record<string, string> = {
  S: "S\n(Start)",
  A: "A\n(Kopi)",
  B: "B\n(Susu)",
  C: "C\n(Coklat)",
  D: "D\n(Small)",
  E: "E\n(Medium)",
  F: "F\n(Large)",
  G: "G\n(+Gula)",
  H: "H\n(+Kopi)",
  I: "I\n(+Susu)",
  J: "J\n(+Coklat)",
  K: "K\n(Air Panas)",
  L: "L\n(Air Dingin)",
  Final: "Final",
};

// Warna putih dengan border hitam untuk semua state
const getStateStyle = (state: string, currentState: FSAState) => {
  const isActive = state === currentState;
  const isFinal = state === "Final";

  // Semua state menggunakan bg putih
  const bgColor = "bg-white";
  const textColor = "text-gray-800";

  // Border hitam untuk semua state
  let borderStyle = "";

  if (isFinal) {
    // Final state menggunakan double border
    borderStyle = "border-2 border-black";
  } else {
    // State biasa (termasuk start) menggunakan border hitam
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
          {/* Start State */}
          <div className="flex flex-col items-center">
            <div className="text-gray-500 text-xs mb-1">Start</div>
            <div
              className={`w-16 h-16 rounded-full ${getStateStyle(
                "S",
                currentState
              )} flex flex-col items-center justify-center font-bold text-xs transition-all duration-300`}
            >
              <div className="text-center leading-tight">
                {stateLabels["S"]}
              </div>
            </div>
          </div>

          <div className="text-gray-500 text-sm">↓ pilih minuman (a, b, c)</div>

          {/* Drink States (A, B, C) */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["A", "B", "C"].map((state) => (
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

          <div className="text-gray-500 text-sm">↓ pilih ukuran (d, e, f)</div>

          {/* Size States (D, E, F) */}
          <div className="flex gap-4">
            {["D", "E", "F"].map((state) => (
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

          <div className="text-gray-500 text-sm">
            ↓ tambah extra (g, h, i, j) atau air (k, l)
          </div>

          {/* Extra States (G, H, I, J) - dengan self-loop */}
          <div className="flex gap-4">
            {["G", "H", "I", "J"].map((state) => (
              <div
                key={state}
                className={`w-16 h-16 rounded-full ${getStateStyle(
                  state,
                  currentState
                )} flex flex-col items-center justify-center font-bold text-xs transition-all duration-300 relative`}
              >
                {/* Self-loop indicator */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-200 rounded-full border border-blue-400 flex items-center justify-center text-[8px]">
                  ↻
                </div>
                <div className="text-center leading-tight">
                  {stateLabels[state]}
                </div>
              </div>
            ))}
          </div>

          <div className="text-gray-500 text-sm">↓ pilih air (k, l)</div>

          {/* Water States (K, L) */}
          <div className="flex gap-4">
            {["K", "L"].map((state) => (
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

          <div className="text-gray-500 text-sm">↓ buat minuman (m)</div>

          {/* Final State - Double Circle */}
          <div
            className={`w-20 h-20 rounded-full ${getStateStyle(
              "Final",
              currentState
            )} flex flex-col items-center justify-center font-bold text-sm transition-all duration-300 relative`}
          >
            <div className="absolute inset-0 rounded-full border-4 border-black"></div>
            <div className="absolute inset-2 rounded-full border-2 border-black"></div>
            <div className="relative z-10 text-center leading-tight">
              {stateLabels["Final"]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
