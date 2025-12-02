import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Drink, Size } from '../data/types';

interface DoneStateProps {
    selectedDrink: Drink | null;
    selectedSize: Size | null;
    onReset: () => void;
}

export const DoneState: React.FC<DoneStateProps> = ({ selectedDrink, selectedSize, onReset }) => {
    return (
        <div className="text-center mb-6">
            <div className="text-6xl mb-4">☕</div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">Minuman Selesai!</h3>
            <p className="text-gray-700 mb-4">
                {selectedDrink?.name} {selectedSize?.name} siap dinikmati
            </p>
            <button
                onClick={onReset}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 mx-auto transition-all cursor-pointer"
            >
                <RotateCcw className="w-5 h-5" />
                Buat Minuman Lagi
            </button>
        </div>
    );
};
