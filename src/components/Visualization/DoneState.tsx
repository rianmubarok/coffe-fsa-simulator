import React from "react";
import { RotateCcw } from "lucide-react";
import { Drink, Size, Extra } from "../data/types";
import Image from "next/image";

interface DoneStateProps {
  selectedDrink: Drink | null;
  selectedSize: Size | null;
  extras: Extra[];
  onReset: () => void;
}

export const DoneState: React.FC<DoneStateProps> = ({
  selectedDrink,
  selectedSize,
  extras,
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
      <h3 className="text-3xl text-black mb-4 font-playfair italic">Minuman Selesai!</h3>
      <p className="text-gray-700 mb-4">
        {selectedDrink?.name} {selectedSize?.name}
        {extras && extras.length > 0 && (
          <span>
            {" "}
            dengan extra{" "}
            {Object.entries(
              extras.reduce((acc, extra) => {
                const name = extra.name.replace("Tambah ", "");
                acc[name] = (acc[name] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            )
              .map(([name, count]) => (count > 1 ? `${name} ${count}x` : name))
              .join(", ")}
          </span>
        )}
        {" "}siap dinikmati
      </p>
      <button
        onClick={onReset}
        className="w-full p-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-all transform flex items-center justify-center gap-2 font-semibold cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Reset (0)
      </button>
    </div>
  );
};
