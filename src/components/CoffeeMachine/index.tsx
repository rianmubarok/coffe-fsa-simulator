"use client";

import React from 'react';
import { Coffee, Zap } from 'lucide-react';
import { useCoffeeMachine } from './useCoffeeMachine';
import { drinks, sizes, extraOptions } from './constants';
import { DrinkSelection } from './DrinkSelection';
import { SizeSelection } from './SizeSelection';
import { ExtraSelection } from './ExtraSelection';
import { DoneState } from './DoneState';
import { StateInfo } from './StateInfo';
import { FSADiagram } from './FSADiagram';
import { ProcessLog } from './ProcessLog';
import { GrammarRules } from './GrammarRules';

export const CoffeeMachine: React.FC = () => {
    const {
        currentState,
        inputSequence,
        grammar,
        isProcessing,
        processLog,
        selectedDrink,
        selectedSize,
        extras,
        step,
        handleDrinkSelect,
        handleSizeSelect,
        handleExtraAdd,
        handleProcess,
        handleReset
    } = useCoffeeMachine();

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <Coffee className="w-10 h-10 text-amber-700" />
                        <h1 className="text-4xl font-bold text-amber-900">Mesin Kopi FSA</h1>
                    </div>
                    <p className="text-amber-700">Simulasi Finite State Automata pada Mesin Pembuat Minuman Kopi Otomatis</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Control Panel */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Zap className="w-6 h-6" />
                            Panel Kontrol
                        </h2>

                        {/* Drink Selection */}
                        {step === 'drink' && (
                            <DrinkSelection drinks={drinks} onSelect={handleDrinkSelect} />
                        )}

                        {/* Size Selection */}
                        {step === 'size' && (
                            <SizeSelection sizes={sizes} onSelect={handleSizeSelect} />
                        )}

                        {/* Extras */}
                        {step === 'extras' && (
                            <ExtraSelection
                                extraOptions={extraOptions}
                                extras={extras}
                                onExtraAdd={handleExtraAdd}
                                onProcess={handleProcess}
                                isProcessing={isProcessing}
                            />
                        )}

                        {/* Done State */}
                        {step === 'done' && (
                            <DoneState
                                selectedDrink={selectedDrink}
                                selectedSize={selectedSize}
                                onReset={handleReset}
                            />
                        )}

                        {/* Current State Info */}
                        <StateInfo
                            currentState={currentState}
                            grammar={grammar}
                            inputSequence={inputSequence}
                        />
                    </div>

                    {/* FSA Visualization & Log */}
                    <div className="space-y-6">
                        <FSADiagram currentState={currentState} />
                        <ProcessLog logs={processLog} />
                    </div>
                </div>

                {/* Grammar Rules Info */}
                <GrammarRules />
            </div>
        </div>
    );
};
