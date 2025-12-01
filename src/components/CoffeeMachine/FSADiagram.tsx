import React from 'react';
import { FSAState } from './types';

interface FSADiagramProps {
    currentState: FSAState;
}

const getStateColor = (state: string, currentState: FSAState) => {
    if (state === currentState) return 'bg-blue-500 ring-4 ring-blue-300';
    if (state === 'FINAL' && currentState === 'FINAL') return 'bg-green-500 ring-4 ring-green-300';
    return 'bg-gray-300';
};

export const FSADiagram: React.FC<FSADiagramProps> = ({ currentState }) => {
    return (
        <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Diagram FSA</h2>
            <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto">
                <div className="flex flex-col items-center space-y-4 min-w-max">
                    {/* Start State */}
                    <div className={`w-16 h-16 rounded-full ${getStateColor('S', currentState)} flex items-center justify-center text-white font-bold text-lg transition-all duration-300`}>
                        S
                    </div>

                    <div className="text-gray-400">↓ pilih minuman (a-g)</div>

                    {/* Drink States */}
                    <div className="flex gap-2">
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(state => (
                            <div key={state} className={`w-12 h-12 rounded-full ${getStateColor(state, currentState)} flex items-center justify-center text-white font-bold transition-all duration-300`}>
                                {state}
                            </div>
                        ))}
                    </div>

                    <div className="text-gray-400">↓ pilih ukuran (h-j)</div>

                    {/* Size States */}
                    <div className="flex gap-4">
                        {['H', 'I', 'J'].map(state => (
                            <div key={state} className={`w-12 h-12 rounded-full ${getStateColor(state, currentState)} flex items-center justify-center text-white font-bold transition-all duration-300`}>
                                {state}
                            </div>
                        ))}
                    </div>

                    <div className="text-gray-400">↓ tambah gula (k)</div>

                    {/* Ingredient States */}
                    <div className="flex gap-4">
                        {['K', 'L', 'M', 'N'].map(state => (
                            <div key={state} className={`w-12 h-12 rounded-full ${getStateColor(state, currentState)} flex items-center justify-center text-white font-bold transition-all duration-300`}>
                                {state}
                            </div>
                        ))}
                    </div>

                    <div className="text-gray-400">↓ tambah air (o)</div>

                    {/* Water State */}
                    <div className={`w-12 h-12 rounded-full ${getStateColor('O', currentState)} flex items-center justify-center text-white font-bold transition-all duration-300`}>
                        O
                    </div>

                    <div className="text-gray-400">↓ aduk (p)</div>

                    {/* Final State */}
                    <div className={`w-16 h-16 rounded-full ${getStateColor('FINAL', currentState)} flex items-center justify-center text-white font-bold transition-all duration-300 border-4 border-white`}>
                        ✓
                    </div>
                </div>
            </div>

            <div className="mt-4 text-xs text-gray-600 bg-blue-50 p-3 rounded">
                <strong>Keterangan:</strong> State biru = aktif, State hijau = selesai, State abu = belum diproses
            </div>
        </div>
    );
};
