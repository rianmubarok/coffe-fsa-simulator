import { Drink, Size, Extra, StateMap } from "./types";

// Drinks: a = kopi, b = susu, c = coklat
export const drinks: Drink[] = [
  { id: "a", name: "Kopi", symbol: "a", ingredients: ["kopi"], icon: "☕" },
  { id: "b", name: "Susu", symbol: "b", ingredients: ["susu"], icon: "🥛" },
  { id: "c", name: "Coklat", symbol: "c", ingredients: ["coklat"], icon: "🍫" },
];

// Sizes: d = small, e = medium, f = large
export const sizes: Size[] = [
  { id: "d", name: "Small", symbol: "d", icon: "🥤" },
  { id: "e", name: "Medium", symbol: "e", icon: "🥤" },
  { id: "f", name: "Large", symbol: "f", icon: "🥤" },
];

// Extras: g = gula, h = kopi, i = susu, j = coklat
export const extraOptions: Extra[] = [
  { id: "g", name: "Tambah Gula", symbol: "g", base: "g", icon: "🍬" },
  { id: "h", name: "Tambah Kopi", symbol: "h", base: "h", icon: "☕" },
  { id: "i", name: "Tambah Susu", symbol: "i", base: "i", icon: "🥛" },
  { id: "j", name: "Tambah Coklat", symbol: "j", base: "j", icon: "🍫" },
];

// State transition map sesuai tabel transisi FSA
// G, H, I, J memiliki self-loop (bisa ke diri sendiri)
export const stateMap: StateMap = {
  // S: bisa ke A (a), B (b), C (c), atau reset ke S (0)
  S: ["A", "B", "C", "S"],
  
  // A, B, C: bisa ke D (d), E (e), F (f), atau reset ke S (0)
  A: ["D", "E", "F", "S"],
  B: ["D", "E", "F", "S"],
  C: ["D", "E", "F", "S"],
  
  // D, E, F: bisa ke G (g), H (h), I (i), J (j), K (k), L (l), atau reset ke S (0)
  D: ["G", "H", "I", "J", "K", "L", "S"],
  E: ["G", "H", "I", "J", "K", "L", "S"],
  F: ["G", "H", "I", "J", "K", "L", "S"],
  
  // G: bisa ke G (self-loop), H, I, J, K, L, atau reset ke S (0)
  G: ["G", "H", "I", "J", "K", "L", "S"],
  
  // H: bisa ke G, H (self-loop), I, J, K, L, atau reset ke S (0)
  H: ["G", "H", "I", "J", "K", "L", "S"],
  
  // I: bisa ke G, H, I (self-loop), J, K, L, atau reset ke S (0)
  I: ["G", "H", "I", "J", "K", "L", "S"],
  
  // J: bisa ke G, H, I, J (self-loop), K, L, atau reset ke S (0)
  J: ["G", "H", "I", "J", "K", "L", "S"],
  
  // K: bisa ke Final (m), atau reset ke S (0)
  K: ["Final", "S"],
  
  // L: bisa ke Final (m), atau reset ke S (0)
  L: ["Final", "S"],
  
  // Final: tidak ada transisi keluar
  Final: [],
};
