import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Drink } from '../data/types';

interface DrinkSelectionProps {
    drinks: Drink[];
    onSelect: (drink: Drink) => void;
    onReset?: () => void;
}

export const DrinkSelection: React.FC<DrinkSelectionProps> = ({ drinks, onSelect, onReset }) => {
    return (
        <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">1. Pilih Jenis Minuman</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                {drinks.map(drink => (
                    <button
                        key={drink.id}
                        onClick={() => onSelect(drink)}
                        className="p-4 bg-amber-100 hover:bg-amber-200 rounded-lg transition-all transform text-left cursor-pointer flex items-center gap-3"
                    >
                        <div className="text-3xl">{drink.icon}</div>
                        <div>
                            <div className="font-semibold text-amber-900">{drink.name}</div>
                            <div className="text-xs text-amber-600">Symbol: {drink.symbol}</div>
                        </div>
                    </button>
                ))}
            </div>
            {onReset && (
                <button
                    onClick={onReset}
                    className="w-full p-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-all transform flex items-center justify-center gap-2 font-semibold"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset (0)
                </button>
            )}
        </div>
    );
};
