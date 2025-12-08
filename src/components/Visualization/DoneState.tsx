import React from "react";
import { RotateCcw } from "lucide-react";
import { Drink, Size, Extra } from "../data/types";
import Image from "next/image";

interface DoneStateProps {
  selectedDrink: Drink | null;
  selectedSize: Size | null;
  extras: Extra[];
  selectedWater: "k" | "l" | null;
  finalDrinkName: string;
  onReset: () => void;
}

export const DoneState: React.FC<DoneStateProps> = ({
  selectedDrink,
  selectedSize,
  extras,
  selectedWater,
  finalDrinkName,
  onReset,
}) => {
  return (
    <div className="text-center mb-6">
      <div className="w-48 h-48 relative mx-auto mb-4">
        <Image
          src="/img/gelas.png"
          alt="Gelas minuman siap"
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-3xl text-black mb-4 font-playfair italic">
        Minuman Selesai!
      </h3>
      <p className="text-gray-700 mb-4 text-xl">
        {finalDrinkName || `${selectedDrink?.name} - Gelas ${selectedSize?.name}`}
      </p>
      <button
        onClick={onReset}
        className="w-full p-3 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-all transform flex items-center justify-center gap-2 font-semibold cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Buat Minuman Lagi
      </button>
    </div>
  );
};
