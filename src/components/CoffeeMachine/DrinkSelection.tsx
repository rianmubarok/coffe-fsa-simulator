import React from 'react';
import { Drink } from './types';

interface DrinkSelectionProps {
    drinks: Drink[];
    onSelect: (drink: Drink) => void;
}

export const DrinkSelection: React.FC<DrinkSelectionProps> = ({ drinks, onSelect }) => {
    return (
        <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">1. Pilih Jenis Minuman</h3>
            <div className="grid grid-cols-2 gap-3">
                {drinks.map(drink => (
                    <button
                        key={drink.id}
                        onClick={() => onSelect(drink)}
                        className="p-4 bg-amber-100 hover:bg-amber-200 rounded-lg transition-all transform hover:scale-105 text-left cursor-pointer flex items-center gap-3"
                    >
                        <div className="text-3xl">{drink.icon}</div>
                        <div>
                            <div className="font-semibold text-amber-900">{drink.name}</div>
                            <div className="text-xs text-amber-600">Symbol: {drink.symbol}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
