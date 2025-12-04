import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Size } from '../data/types';

interface SizeSelectionProps {
    sizes: Size[];
    onSelect: (size: Size) => void;
    onReset?: () => void;
}

export const SizeSelection: React.FC<SizeSelectionProps> = ({ sizes, onSelect, onReset }) => {
    return (
        <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">2. Pilih Ukuran Gelas</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
                {sizes.map(size => (
                    <button
                        key={size.id}
                        onClick={() => onSelect(size)}
                        className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg transition-all transform cursor-pointer flex items-center gap-3"
                    >
                        <div className="text-3xl">{size.icon}</div>
                        <div>
                            <div className="font-semibold text-blue-900">{size.name}</div>
                            <div className="text-xs text-blue-600">Symbol: {size.symbol}</div>
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
