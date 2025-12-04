import React from "react";
import { RotateCcw } from "lucide-react";
import { Size } from "../data/types";
import Image from "next/image";

interface SizeSelectionProps {
  sizes: Size[];
  onSelect: (size: Size) => void;
  onReset?: () => void;
}

// Get scale class based on size
const getSizeScale = (sizeName: string): string => {
  if (sizeName.includes("S")) return "scale-[0.7]"; // 70% - kecil
  if (sizeName.includes("M")) return "scale-100"; // 100% - sedang
  if (sizeName.includes("L")) return "scale-[1.3]"; // 130% - besar
  return "scale-100";
};

export const SizeSelection: React.FC<SizeSelectionProps> = ({
  sizes,
  onSelect,
  onReset,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-black mb-3">Pilih Ukuran Gelas</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onSelect(size)}
            className="bg-amber-100 hover:bg-amber-200 rounded-2xl transition-all text-left cursor-pointer flex items-center gap-2 group pr-4"
          >
            <div className="w-42 h-42 relative flex-shrink-0 overflow-hidden">
              <Image
                src="/img/gelas.png"
                alt={size.name}
                fill
                className={`object-contain transition-all duration-300 translate-y-8 -translate-x-5 transform group-hover:translate-y-2 ${getSizeScale(
                  size.name
                )}`}
              />
            </div>

            <div>
              <div className="text-black text-3xl tracking-tight font-playfair italic">
                {size.name}
              </div>
              <div className="mt-3 text-lg text-amber-600">
                Symbol: {size.symbol}
              </div>
            </div>
          </button>
        ))}
      </div>
      {onReset && (
        <button
          onClick={onReset}
          className="w-full p-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-all transform flex items-center justify-center gap-2 font-semibold cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Reset (0)
        </button>
      )}
    </div>
  );
};
