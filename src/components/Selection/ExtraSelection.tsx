import React from "react";
import { Play, RotateCcw } from "lucide-react";
import { Extra } from "../data/types";
import Image from "next/image";

interface ExtraSelectionProps {
  extraOptions: Extra[];
  extras: Extra[];
  onExtraAdd: (extra: Extra) => void;
  onProcess: () => void;
  isProcessing: boolean;
  onReset?: () => void;
}

// Mapping extra names to image files
const getExtraImage = (extraName: string): string => {
  const imageMap: Record<string, string> = {
    "Tambah Gula": "/img/extra-gula.png",
    "Tambah Kopi": "/img/extra-kopi.png",
    "Tambah Susu": "/img/extra-susu.png",
    "Tambah Coklat": "/img/extra-coklat.png",
  };
  return imageMap[extraName] || "/img/extra-kopi.png";
};

export const ExtraSelection: React.FC<ExtraSelectionProps> = ({
  extraOptions,
  extras,
  onExtraAdd,
  onProcess,
  isProcessing,
  onReset,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-black mb-3">Tambahan Extra (Opsional - Max 3)</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {extraOptions.map((extra) => (
          <button
            key={extra.id}
            onClick={() => onExtraAdd(extra)}
            disabled={extras.length >= 3}
            className="bg-amber-100 hover:bg-amber-200 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-2xl transition-all text-left cursor-pointer flex items-center gap-2 group pr-4"
          >
            <div className="w-42 h-42 relative flex-shrink-0 overflow-hidden">
              <Image
                src={getExtraImage(extra.name)}
                alt={extra.name}
                fill
                className="object-contain transition-all duration-300 translate-y-8 -translate-x-5 transform group-hover:translate-y-2"
              />
            </div>

            <div>
              <div className="text-black text-3xl tracking-tight font-playfair italic">
                {extra.name}
              </div>
              <div className="mt-3 text-lg text-amber-600">
                Symbol: {extra.symbol}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600 mb-4">
        Extra dipilih: {extras.length}/3
      </div>
      <div className="space-y-3">
        <button
          onClick={onProcess}
          disabled={isProcessing}
          className="w-full p-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform disabled:opacity-50 cursor-pointer"
        >
          <Play className="w-5 h-5" />
          PROSES MINUMAN
        </button>
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
    </div>
  );
};
