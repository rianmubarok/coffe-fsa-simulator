import { useState } from 'react';
import { Drink, Size, Extra, ProcessLog, Step, FSAState } from './types';
import { drinks, sizes } from './constants';

export const useCoffeeMachine = () => {
    const [currentState, setCurrentState] = useState<FSAState>('S');
    const [inputSequence, setInputSequence] = useState<string[]>([]);
    const [grammar, setGrammar] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processLog, setProcessLog] = useState<ProcessLog[]>([]);
    const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [extras, setExtras] = useState<Extra[]>([]);
    const [step, setStep] = useState<Step>('drink');

    const addLog = (message: string) => {
        setProcessLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
    };

    const handleDrinkSelect = (drink: Drink) => {
        setSelectedDrink(drink);
        setInputSequence([drink.symbol]);
        setGrammar(drink.symbol);
        setCurrentState(String.fromCharCode(65 + drinks.findIndex(d => d.id === drink.id)) as FSAState);
        setStep('size');
        addLog(`Memilih minuman: ${drink.name}`);
    };

    const handleSizeSelect = (size: Size) => {
        setSelectedSize(size);
        const newSeq = [...inputSequence, size.symbol];
        setInputSequence(newSeq);
        setGrammar(prev => prev + size.symbol);
        setCurrentState(String.fromCharCode(72 + sizes.findIndex(s => s.id === size.id)) as FSAState);
        addLog(`Memilih ukuran gelas: ${size.name}`);

        // Auto add sugar (k) and move to K state
        setTimeout(() => {
            const withSugar = [...newSeq, 'k'];
            setInputSequence(withSugar);
            setGrammar(prev => prev + 'k');
            setCurrentState('K');
            addLog('Menambahkan gula dasar');
            setStep('extras');
        }, 500);
    };

    const handleExtraAdd = (extra: Extra) => {
        if (extras.length >= 3) {
            addLog('Maksimal 3 tambahan extra!');
            return;
        }

        const newExtras = [...extras, extra];
        setExtras(newExtras);

        const newSeq = [...inputSequence, extra.base, extra.symbol];
        setInputSequence(newSeq);
        setGrammar(prev => prev + extra.base + extra.symbol);

        // Update state based on ingredient
        const stateTransition: Record<string, FSAState> = {
            'l': 'L', 'r': 'L',
            'm': 'M', 's': 'M',
            'n': 'N', 't': 'N'
        };
        setCurrentState(stateTransition[extra.base] || currentState);

        addLog(`Menambahkan: ${extra.name}`);
    };

    const handleProcess = async () => {
        setIsProcessing(true);
        setStep('processing');
        addLog('--- MEMULAI PROSES PEMBUATAN ---');

        // Add water (o)
        const withWater = [...inputSequence, 'o'];
        setInputSequence(withWater);
        setGrammar(prev => prev + 'o');
        setCurrentState('O');
        addLog('Menambahkan air panas');

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Stir and finalize (p)
        const finalSeq = [...withWater, 'p'];
        setInputSequence(finalSeq);
        setGrammar(prev => prev + 'p');
        setCurrentState('FINAL');
        addLog('Mengaduk minuman');

        await new Promise(resolve => setTimeout(resolve, 1000));

        addLog(`✓ ${selectedDrink?.name} ${selectedSize?.name} selesai!`);
        addLog('--- SELAMAT MENIKMATI ---');
        setIsProcessing(false);
        setStep('done');
    };

    const handleReset = () => {
        setCurrentState('S');
        setInputSequence([]);
        setGrammar('');
        setProcessLog([]);
        setSelectedDrink(null);
        setSelectedSize(null);
        setExtras([]);
        setStep('drink');
        setIsProcessing(false);
    };

    return {
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
    };
};
