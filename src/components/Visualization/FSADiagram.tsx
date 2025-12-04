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

// Warna sesuai referensi
const getStateStyle = (state: string, currentState: FSAState) => {
  const isActive = state === currentState;
  const isFinal = state === "FINAL";
  const isStart = state === "S";

  // Base colors sesuai referensi
  let bgColor = "";
  let textColor = "text-gray-800";
  let borderStyle = "";

  if (isStart) {
    bgColor = isActive ? "bg-green-400" : "bg-green-200";
    borderStyle = "border-4 border-green-600";
  } else if (isFinal) {
    bgColor = isActive ? "bg-yellow-400" : "bg-yellow-200";
    borderStyle = "border-4 border-yellow-600";
  } else if (["A", "B", "C", "D", "E", "F", "G"].includes(state)) {
    bgColor = isActive ? "bg-yellow-300" : "bg-yellow-100";
  } else if (["H", "I", "J"].includes(state)) {
    bgColor = isActive ? "bg-cyan-300" : "bg-cyan-100";
  } else if (state === "K") {
    bgColor = isActive ? "bg-pink-300" : "bg-pink-100";
  } else if (state === "L") {
    bgColor = isActive ? "bg-amber-800" : "bg-amber-600";
    textColor = "text-white";
  } else if (state === "M") {
    bgColor = isActive ? "bg-amber-100" : "bg-amber-50";
  } else if (state === "N") {
    bgColor = isActive ? "bg-amber-900" : "bg-amber-700";
    textColor = "text-white";
  } else if (state === "O") {
    bgColor = isActive ? "bg-blue-300" : "bg-blue-100";
  }

  // Highlight active state
  if (isActive && !isStart && !isFinal) {
    borderStyle = "ring-4 ring-blue-400";
  }

  return `${bgColor} ${textColor} ${borderStyle}`;
};

export const FSADiagram: React.FC<FSADiagramProps> = ({ currentState }) => {
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Diagram FSA</h2>
      <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto">
        <div className="flex flex-col items-center space-y-4 min-w-max">
          {/* Start State - Double Circle */}
          <div
            className={`w-20 h-20 rounded-full ${getStateStyle(
              "S",
              currentState
            )} flex flex-col items-center justify-center font-bold text-sm transition-all duration-300 relative`}
          >
            <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
            <div className="absolute inset-2 rounded-full border-2 border-gray-800"></div>
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
            <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
            <div className="absolute inset-2 rounded-full border-2 border-gray-800"></div>
            <div className="relative z-10 text-center leading-tight">
              {stateLabels["FINAL"]}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-600 bg-blue-50 p-3 rounded">
        <strong>Keterangan:</strong> State hijau = Start, State kuning = Final,
        State kuning muda = Minuman, State cyan = Ukuran, State pink = Gula,
        State coklat = Kopi, State krem = Susu, State coklat tua = Coklat, State
        biru = Air. State yang aktif memiliki ring biru.
      </div>
    </div>
  );
};
