"use client";

import React from "react";
import { Coffee, Zap } from "lucide-react";
import { useCoffeeMachine } from "./hooks/useCoffeeMachine";
import { drinks, sizes, extraOptions } from "./data/constants";
import { DrinkSelection } from "./Selection/DrinkSelection";
import { SizeSelection } from "./Selection/SizeSelection";
import { ExtraSelection } from "./Selection/ExtraSelection";
import { DoneState } from "./Visualization/DoneState";
import { StateInfo } from "./Visualization/StateInfo";
import { FSADiagram } from "./Visualization/FSADiagram";
import { ProcessLog } from "./Visualization/ProcessLog";
import { GrammarRules } from "./Visualization/GrammarRules";

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
    handleReset,
  } = useCoffeeMachine();

  return (
    <div className="min-h-screen bg-[#fcf6ea] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col mb-2 text-5xl text-black tracking-tight">
            <h1>Coffe Machine</h1>
            <h1>Finite State Automata</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Control Panel */}
          <div>
            {/* Drink Selection */}
            {step === "drink" && (
              <DrinkSelection
                drinks={drinks}
                onSelect={handleDrinkSelect}
                onReset={currentState !== "S" ? handleReset : undefined}
              />
            )}

            {/* Size Selection */}
            {step === "size" && (
              <SizeSelection
                sizes={sizes}
                onSelect={handleSizeSelect}
                onReset={currentState !== "S" ? handleReset : undefined}
              />
            )}

            {/* Extras */}
            {step === "extras" && (
              <ExtraSelection
                extraOptions={extraOptions}
                extras={extras}
                onExtraAdd={handleExtraAdd}
                onProcess={handleProcess}
                isProcessing={isProcessing}
                onReset={currentState !== "S" ? handleReset : undefined}
              />
            )}

            {/* Done State */}
            {step === "done" && (
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
