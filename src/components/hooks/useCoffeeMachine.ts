import { useState } from 'react';
import { Drink, Size, Extra, ProcessLog, Step, FSAState } from '../data/types';
import { drinks, sizes, stateMap } from '../data/constants';

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
        // Allow more extras to test loops (e.g. K->K->K)
        if (extras.length >= 10) {
            addLog('Maksimal 10 tambahan extra!');
            return;
        }

        // Determine target state for this extra
        const targetStateMap: Record<string, FSAState> = {
            'k': 'K', // Gula
            'l': 'L', // Kopi
            'm': 'M', // Susu
            'n': 'N'  // Coklat
        };

        const targetState = targetStateMap[extra.base];
        if (!targetState) return;

        // ALWAYS use the extra's symbol for the input sequence
        const inputChar = extra.symbol;
        let nextState = currentState;

        // Logic:
        // If current state == target state -> Self loop (use extra.symbol: q, r, s, t)
        // If current state != target state -> Transition (use extra.base: l, m, n) IF valid

        if (currentState === targetState) {
            // State remains same
        } else {
            // Check if transition is valid
            const validTransitions = stateMap[currentState];
            if (validTransitions && validTransitions.includes(targetState)) {
                nextState = targetState;
            } else {
                addLog(`❌ Tidak bisa menambahkan ${extra.name} setelah posisi saat ini (${currentState})`);
                return;
            }
        }

        const newExtras = [...extras, extra];
        setExtras(newExtras);

        const newSeq = [...inputSequence, inputChar];
        setInputSequence(newSeq);
        setGrammar(prev => prev + inputChar);
        setCurrentState(nextState);

        addLog(`Menambahkan: ${extra.name}`);
    };

    const handleProcess = async () => {
        // Validate transition to 'O' (Air)
        const validTransitions = stateMap[currentState];
        if (!validTransitions || !validTransitions.includes('O')) {
            addLog('❌ Belum ada bahan utama (Kopi/Susu/Coklat)!');
            return;
        }

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
        // Tambahkan log dan input "0" sesuai diagram FSA
        addLog('0 (reset) - Kembali ke state Start');
        const resetSeq = [...inputSequence, '0'];
        setInputSequence(resetSeq);
        setGrammar(prev => prev + '0');

        setCurrentState('S');
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
