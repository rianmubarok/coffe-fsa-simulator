import React from 'react';
import { Size } from './types';

interface SizeSelectionProps {
    sizes: Size[];
    onSelect: (size: Size) => void;
}

export const SizeSelection: React.FC<SizeSelectionProps> = ({ sizes, onSelect }) => {
    return (
        <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">2. Pilih Ukuran Gelas</h3>
            <div className="grid grid-cols-3 gap-3">
                {sizes.map(size => (
                    <button
                        key={size.id}
                        onClick={() => onSelect(size)}
                        className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg transition-all transform hover:scale-105"
                    >
                        <div className="font-semibold text-blue-900">{size.name}</div>
                        <div className="text-xs text-blue-600">Symbol: {size.symbol}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
