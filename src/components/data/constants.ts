import { Drink, Size, Extra, StateMap } from "./types";

export const drinks: Drink[] = [
  { id: "a", name: "Kopi", symbol: "a", ingredients: ["kopi"], icon: "☕" },
  { id: "b", name: "Susu", symbol: "b", ingredients: ["susu"], icon: "🥛" },
  { id: "c", name: "Coklat", symbol: "c", ingredients: ["coklat"], icon: "🍫" },
  {
    id: "d",
    name: "Kopi Susu",
    symbol: "d",
    ingredients: ["kopi", "susu"],
    icon: "☕🥛",
  },
  {
    id: "e",
    name: "Kopi Coklat",
    symbol: "e",
    ingredients: ["kopi", "coklat"],
    icon: "☕🍫",
  },
  {
    id: "f",
    name: "Mocca",
    symbol: "f",
    ingredients: ["kopi", "susu", "coklat"],
    icon: "☕🥛🍫",
  },
  {
    id: "g",
    name: "Susu Coklat",
    symbol: "g",
    ingredients: ["susu", "coklat"],
    icon: "🥛🍫",
  },
];

export const sizes: Size[] = [
  { id: "h", name: "Gelas S", symbol: "h", icon: "🥤" },
  { id: "i", name: "Gelas M", symbol: "i", icon: "🥤" },
  { id: "j", name: "Gelas L", symbol: "j", icon: "🥤" },
];

export const extraOptions: Extra[] = [
  { id: "r", name: "Tambah Kopi", symbol: "r", base: "l", icon: "☕" },
  { id: "s", name: "Tambah Susu", symbol: "s", base: "m", icon: "🥛" },
  { id: "t", name: "Tambah Coklat", symbol: "t", base: "n", icon: "🍫" },
];

export const stateMap: StateMap = {
  S: ["A", "B", "C", "D", "E", "F", "G", "S"], // Added S for reset (0)
  A: ["H", "I", "J", "S"],
  B: ["H", "I", "J", "S"],
  C: ["H", "I", "J", "S"],
  D: ["H", "I", "J", "S"],
  E: ["H", "I", "J", "S"],
  F: ["H", "I", "J", "S"],
  G: ["H", "I", "J", "S"],
  H: ["K", "S"],
  I: ["K", "S"],
  J: ["K", "S"],
  K: ["K", "L", "M", "N", "O", "S"],
  L: ["K", "L", "M", "N", "O", "S"],
  M: ["K", "L", "M", "N", "O", "S"],
  N: ["K", "L", "M", "N", "O", "S"],
  O: ["FINAL", "S"],
};
