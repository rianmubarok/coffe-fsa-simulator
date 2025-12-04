import React from "react";
import { RotateCcw } from "lucide-react";
import { Drink } from "../data/types";
import Image from "next/image";

interface DrinkSelectionProps {
  drinks: Drink[];
  onSelect: (drink: Drink) => void;
  onReset?: () => void;
}

// Mapping drink names to image files
const getDrinkImage = (drinkName: string): string => {
  const imageMap: Record<string, string> = {
    Kopi: "/img/kopi.png",
    Susu: "/img/susu.png",
    Coklat: "/img/coklat.png",
    "Kopi Susu": "/img/kopi-susu.png",
    "Kopi Coklat": "/img/kopi-coklat.png",
    Mocca: "/img/mocca.png",
    "Susu Coklat": "/img/susu-coklat.png",
  };
  return imageMap[drinkName] || "/img/kopi.png";
};

export const DrinkSelection: React.FC<DrinkSelectionProps> = ({
  drinks,
  onSelect,
  onReset,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-black mb-3">Pilih Jenis Minuman</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {drinks.map((drink) => (
          <button
            key={drink.id}
            onClick={() => onSelect(drink)}
            className="bg-amber-100 hover:bg-amber-200 rounded-2xl transition-all text-left cursor-pointer flex items-center gap-2 group pr-4"
          >
            <div className="w-42 h-42 relative flex-shrink-0 overflow-hidden">
              <Image
                src={getDrinkImage(drink.name)}
                alt={drink.name}
                fill
                className="object-contain transition-all duration-300 translate-y-8 -translate-x-5 transform group-hover:translate-y-2"
              />
            </div>

            <div>
              <div className="text-black text-3xl tracking-tight">
                {drink.name}
              </div>
              <div className="text-lg text-amber-600">
                Symbol: {drink.symbol}
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
