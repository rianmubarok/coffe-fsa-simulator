"use client";

import React from 'react';
import { Coffee, Zap } from 'lucide-react';
import { useCoffeeMachine } from './hooks/useCoffeeMachine';
import { drinks, sizes, extraOptions } from './data/constants';
import { DrinkSelection } from './Selection/DrinkSelection';
import { SizeSelection } from './Selection/SizeSelection';
import { ExtraSelection } from './Selection/ExtraSelection';
import { DoneState } from './Visualization/DoneState';
import { StateInfo } from './Visualization/StateInfo';
import { FSADiagram } from './Visualization/FSADiagram';
import { ProcessLog } from './Visualization/ProcessLog';
import { GrammarRules } from './Visualization/GrammarRules';

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
        <div className="min-h-screen bg-[#49426c] p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <h1 className="text-4xl font-bold text-white">Mesin Kopi FSA</h1>
                    </div>
                    <p className="text-white">Simulasi Finite State Automata pada Mesin Pembuat Minuman Kopi Otomatis</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Control Panel */}
                    <div className="bg-white rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Zap className="w-6 h-6" />
                            Panel Kontrol
                        </h2>

                        {/* Drink Selection */}
                        {step === 'drink' && (
                            <DrinkSelection 
                                drinks={drinks} 
                                onSelect={handleDrinkSelect}
                                onReset={currentState !== 'S' ? handleReset : undefined}
                            />
                        )}

                        {/* Size Selection */}
                        {step === 'size' && (
                            <SizeSelection 
                                sizes={sizes} 
                                onSelect={handleSizeSelect}
                                onReset={currentState !== 'S' ? handleReset : undefined}
                            />
                        )}

                        {/* Extras */}
                        {step === 'extras' && (
                            <ExtraSelection
                                extraOptions={extraOptions}
                                extras={extras}
                                onExtraAdd={handleExtraAdd}
                                onProcess={handleProcess}
                                isProcessing={isProcessing}
                                onReset={currentState !== 'S' ? handleReset : undefined}
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
