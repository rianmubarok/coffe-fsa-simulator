import { useState } from "react";
import { Drink, Size, Extra, ProcessLog, Step, FSAState } from "../data/types";
import { drinks, sizes, stateMap } from "../data/constants";

// Fungsi untuk generate nama minuman berdasarkan kombinasi
const generateDrinkName = (
  baseDrink: Drink | null,
  extras: Extra[],
  waterType: "k" | "l" | null,
  size: Size | null
): string => {
  if (!baseDrink || !waterType || !size) return "";

  // Mapping symbol ke nama bahan
  const ingredientMap: Record<string, string> = {
    a: "kopi",
    b: "susu",
    c: "coklat",
    g: "gula",
    h: "kopi",
    i: "susu",
    j: "coklat",
  };

  // Hitung total setiap bahan (base + extras)
  const counts: Record<string, number> = {
    kopi: 0,
    susu: 0,
    coklat: 0,
    gula: 0,
  };

  // Tambahkan base drink
  const baseName = ingredientMap[baseDrink.symbol];
  if (baseName && baseName !== "gula") {
    counts[baseName] = 1;
  }

  // Tambahkan extras
  extras.forEach((extra) => {
    const extraName = ingredientMap[extra.symbol];
    if (extraName) {
      counts[extraName] = (counts[extraName] || 0) + 1;
    }
  });

  // Cek kasus khusus: Mocca (kopi + susu + coklat, minimal 1 masing-masing)
  const hasKopi = counts.kopi > 0;
  const hasSusu = counts.susu > 0;
  const hasCoklat = counts.coklat > 0;
  const isMocca = hasKopi && hasSusu && hasCoklat;

  let drinkName = "";

  if (isMocca) {
    // Kasus Mocca
    drinkName = "Mocca";
  } else {
    // Urutan prioritas: kopi > susu > coklat
    const parts: string[] = [];

    if (counts.kopi > 0) parts.push("Kopi");
    if (counts.susu > 0) parts.push("Susu");
    if (counts.coklat > 0) parts.push("Coklat");

    // Jika hanya satu bahan, gunakan nama base
    if (parts.length === 0) {
      drinkName = baseName
        ? baseName.charAt(0).toUpperCase() + baseName.slice(1)
        : "Minuman";
    } else {
      drinkName = parts.join(" ");
    }
  }

  // Tambahkan suhu air
  if (waterType === "l") {
    drinkName = `Es ${drinkName}`;
  } else {
    drinkName = `${drinkName} Panas`;
  }

  // Tambahkan info gula
  if (counts.gula > 0) {
    if (counts.gula === 1) {
      drinkName += " dengan Gula";
    } else {
      drinkName += ` dengan Gula ${counts.gula}x`;
    }
  } else {
    drinkName += " tanpa Gula";
  }

  // Tambahkan ukuran
  const sizeName = size.name;
  drinkName += ` ${sizeName}`;

  return drinkName;
};

export const useCoffeeMachine = () => {
  const [currentState, setCurrentState] = useState<FSAState>("S");
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [grammar, setGrammar] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processLog, setProcessLog] = useState<ProcessLog[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [selectedWater, setSelectedWater] = useState<"k" | "l" | null>(null);
  const [step, setStep] = useState<Step>("drink");
  const [finalDrinkName, setFinalDrinkName] = useState<string>("");

  const addLog = (message: string) => {
    setProcessLog((prev) => [
      ...prev,
      { time: new Date().toLocaleTimeString(), message },
    ]);
  };

  // Fungsi transisi FSA sesuai tabel
  const transition = (current: FSAState, input: string): FSAState | null => {
    // Reset (0) dari semua state kembali ke S
    if (input === "0") {
      return "S";
    }

    // Mapping input ke state target
    const inputToState: Record<string, FSAState> = {
      a: "A", // kopi
      b: "B", // susu
      c: "C", // coklat
      d: "D", // small
      e: "E", // medium
      f: "F", // large
      g: "G", // tambah gula
      h: "H", // tambah kopi
      i: "I", // tambah susu
      j: "J", // tambah coklat
      k: "K", // air panas
      l: "L", // air dingin
      m: "Final", // buat minuman
    };

    const targetState = inputToState[input];
    if (!targetState) return null;

    // Cek apakah transisi valid dari current state (termasuk self-loop)
    const validTransitions = stateMap[current];
    if (validTransitions && validTransitions.includes(targetState)) {
      return targetState;
    }

    return null;
  };

  const handleDrinkSelect = (drink: Drink) => {
    const input = drink.symbol; // a, b, atau c
    const nextState = transition(currentState, input);
    const prevState = currentState;

    if (!nextState) {
      addLog(
        `❌ Transisi tidak valid: State ${prevState} tidak menerima input '${input}'`
      );
      return;
    }

    setSelectedDrink(drink);
    setInputSequence([input]);
    setGrammar(input);
    setCurrentState(nextState);
    setStep("size");
    addLog(`[FSA] State: ${prevState} → ${nextState} (input: ${input})`);
    addLog(`✓ Memilih minuman dasar: ${drink.name}`);
  };

  const handleSizeSelect = (size: Size) => {
    const input = size.symbol; // d, e, atau f
    const nextState = transition(currentState, input);
    const prevState = currentState;

    if (!nextState) {
      addLog(
        `❌ Transisi tidak valid: State ${prevState} tidak menerima input '${input}'`
      );
      return;
    }

    setSelectedSize(size);
    const newSeq = [...inputSequence, input];
    setInputSequence(newSeq);
    setGrammar((prev) => prev + input);
    setCurrentState(nextState);
    setStep("extras");
    addLog(`[FSA] State: ${prevState} → ${nextState} (input: ${input})`);
    addLog(`✓ Memilih ukuran: ${size.name}`);
  };

  const handleExtraAdd = (extra: Extra) => {
    // Batasan maksimal 3 extra (dihandle aplikasi, bukan FSA)
    if (extras.length >= 3) {
      addLog("❌ Maksimal 3 extra telah tercapai!");
      return;
    }

    const input = extra.symbol; // g, h, i, atau j
    const nextState = transition(currentState, input);

    if (!nextState) {
      addLog(
        `❌ Transisi tidak valid: State ${currentState} tidak menerima input '${input}'`
      );
      return;
    }

    // Self-loop: jika state sama, tetap di state yang sama
    const isSelfLoop = currentState === nextState;
    const prevState = currentState;

    const newExtras = [...extras, extra];
    setExtras(newExtras);

    const newSeq = [...inputSequence, input];
    setInputSequence(newSeq);
    setGrammar((prev) => prev + input);
    setCurrentState(nextState);

    if (isSelfLoop) {
      addLog(
        `[FSA] State: ${prevState} → ${nextState} (self-loop ↻, input: ${input})`
      );
      addLog(
        `✓ Menambahkan extra: ${extra.name} (${
          extras.length + 1
        }/3) - Loop di state ${nextState}`
      );
    } else {
      addLog(`[FSA] State: ${prevState} → ${nextState} (input: ${input})`);
      addLog(`✓ Menambahkan extra: ${extra.name} (${extras.length + 1}/3)`);
    }
  };

  const handleWaterSelect = async (waterType: "k" | "l") => {
    const input = waterType; // k (panas) atau l (dingin)
    const nextState = transition(currentState, input);
    const prevState = currentState;

    if (!nextState) {
      addLog(
        `❌ Transisi tidak valid: State ${prevState} tidak menerima input '${input}'`
      );
      return;
    }

    setSelectedWater(waterType);
    const withWater = [...inputSequence, input];
    setInputSequence(withWater);
    setGrammar((prev) => prev + input);
    setCurrentState(nextState);
    addLog(`[FSA] State: ${prevState} → ${nextState} (input: ${input})`);
    addLog(`✓ Memilih air: ${waterType === "k" ? "Panas" : "Dingin"}`);

    // Generate nama minuman sementara
    const tempName = generateDrinkName(
      selectedDrink,
      extras,
      waterType,
      selectedSize
    );
    if (tempName) {
      addLog(`📝 Komposisi: ${tempName}`);
    }

    setStep("confirmation");
  };

  const handleFinalize = async () => {
    const input = "m"; // buat minuman
    const nextState = transition(currentState, input);
    const prevState = currentState;

    if (!nextState) {
      addLog(
        `❌ Transisi tidak valid: State ${prevState} tidak menerima input '${input}'`
      );
      return;
    }

    setIsProcessing(true);
    setStep("processing");

    addLog("--- MEMULAI PROSES PEMBUATAN ---");
    addLog(`[FSA] State: ${prevState} → ${nextState} (input: ${input})`);

    const finalSeq = [...inputSequence, input];
    setInputSequence(finalSeq);
    setGrammar((prev) => prev + input);
    setCurrentState(nextState);

    // Generate nama minuman final
    const drinkName = generateDrinkName(
      selectedDrink,
      extras,
      selectedWater,
      selectedSize
    );
    setFinalDrinkName(drinkName);

    addLog("⚙️ Memproses minuman...");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    addLog(`✓ Minuman selesai dibuat!`);
    addLog(`🎉 ${drinkName}`);
    addLog("--- SELAMAT MENIKMATI ---");
    setIsProcessing(false);
    setStep("done");
  };

  const handleReset = () => {
    // Final state tidak bisa reset dengan input 0 (tidak ada transisi 0 dari Final)
    // Tapi bisa langsung reset ke S untuk membuat minuman baru
    if (currentState === "Final") {
      addLog("🔄 Membuat minuman baru: Kembali ke state Start (S)");
      setCurrentState("S");
      setInputSequence([]);
      setGrammar("");
      setSelectedDrink(null);
      setSelectedSize(null);
      setExtras([]);
      setSelectedWater(null);
      setFinalDrinkName("");
      setStep("drink");
      setIsProcessing(false);
      // Tidak menambahkan input 0 ke sequence karena Final tidak menerima input 0
      return;
    }

    const input = "0";
    const nextState = transition(currentState, input);
    const prevState = currentState;

    if (nextState) {
      addLog(
        `[FSA] State: ${prevState} → ${nextState} (input: ${input} - reset)`
      );
      addLog("🔄 Reset: Kembali ke state Start (S)");
      const resetSeq = [...inputSequence, input];
      setInputSequence(resetSeq);
      setGrammar((prev) => prev + input);
      setCurrentState(nextState);
    }

    setSelectedDrink(null);
    setSelectedSize(null);
    setExtras([]);
    setSelectedWater(null);
    setFinalDrinkName("");
    setStep("drink");
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
    selectedWater,
    finalDrinkName,
    step,
    handleDrinkSelect,
    handleSizeSelect,
    handleExtraAdd,
    handleWaterSelect,
    handleFinalize,
    handleReset,
  };
};
