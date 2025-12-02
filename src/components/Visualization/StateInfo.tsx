import React from 'react';
import { FSAState } from '../data/types';

interface StateInfoProps {
    currentState: FSAState;
    grammar: string;
    inputSequence: string[];
}

export const StateInfo: React.FC<StateInfoProps> = ({ currentState, grammar, inputSequence }) => {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <div className="text-sm font-semibold text-gray-700 mb-2">Status FSA:</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="text-gray-600">State Saat Ini:</span>
                    <div className="font-bold text-blue-600 text-lg">{currentState}</div>
                </div>
                <div>
                    <span className="text-gray-600">Grammar:</span>
                    <div className="font-mono text-purple-600 break-all">{grammar || '-'}</div>
                </div>
            </div>
            <div className="mt-2">
                <span className="text-gray-600">Input Sequence:</span>
                <div className="font-mono text-xs text-gray-800 bg-white p-2 rounded mt-1">
                    {inputSequence.length > 0 ? inputSequence.join(' → ') : 'Belum ada input'}
                </div>
            </div>
        </div>
    );
};
