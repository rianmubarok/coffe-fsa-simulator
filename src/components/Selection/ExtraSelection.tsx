import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { Extra } from '../data/types';

interface ExtraSelectionProps {
    extraOptions: Extra[];
    extras: Extra[];
    onExtraAdd: (extra: Extra) => void;
    onProcess: () => void;
    isProcessing: boolean;
    onReset?: () => void;
}

export const ExtraSelection: React.FC<ExtraSelectionProps> = ({
    extraOptions,
    extras,
    onExtraAdd,
    onProcess,
    isProcessing,
    onReset
}) => {
    return (
        <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">3. Tambahan Extra (Opsional - Max 10)</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                {extraOptions.map(extra => (
                    <button
                        key={extra.id}
                        onClick={() => onExtraAdd(extra)}
                        disabled={extras.length >= 10}
                        className="p-3 bg-green-100 hover:bg-green-200 disabled:bg-gray-200 disabled:cursor-not-allowed rounded-lg transition-all transform cursor-pointer flex items-center gap-3"
                    >
                        <div className="text-2xl">{extra.icon}</div>
                        <div>
                            <div className="font-semibold text-green-900 text-sm">{extra.name}</div>
                            <div className="text-xs text-green-600">Symbol: {extra.base}{extra.symbol}</div>
                        </div>
                    </button>
                ))}
            </div>
            <div className="text-sm text-gray-600 mb-4">
                Extra dipilih: {extras.length}/10
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onProcess}
                    disabled={isProcessing}
                    className="flex-1 p-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all transform disabled:opacity-50 cursor-pointer"
                >
                    <Play className="w-5 h-5" />
                    PROSES MINUMAN
                </button>
                {onReset && (
                    <button
                        onClick={onReset}
                        className="p-4 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-all transform flex items-center justify-center gap-2 font-semibold"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset (0)
                    </button>
                )}
            </div>
        </div>
    );
};
