import { Drink, Size, Extra, StateMap } from './types';

export const drinks: Drink[] = [
    { id: 'a', name: 'Kopi', symbol: 'a', ingredients: ['kopi'] },
    { id: 'b', name: 'Susu', symbol: 'b', ingredients: ['susu'] },
    { id: 'c', name: 'Coklat', symbol: 'c', ingredients: ['coklat'] },
    { id: 'd', name: 'Kopi Susu', symbol: 'd', ingredients: ['kopi', 'susu'] },
    { id: 'e', name: 'Kopi Coklat', symbol: 'e', ingredients: ['kopi', 'coklat'] },
    { id: 'f', name: 'Mocha', symbol: 'f', ingredients: ['kopi', 'susu', 'coklat'] },
    { id: 'g', name: 'Susu Coklat', symbol: 'g', ingredients: ['susu', 'coklat'] }
];

export const sizes: Size[] = [
    { id: 'h', name: 'Small', symbol: 'h' },
    { id: 'i', name: 'Medium', symbol: 'i' },
    { id: 'j', name: 'Large', symbol: 'j' }
];

export const extraOptions: Extra[] = [
    { id: 'q', name: 'Tambah Gula', symbol: 'q', base: 'k' },
    { id: 'r', name: 'Tambah Kopi', symbol: 'r', base: 'l' },
    { id: 's', name: 'Tambah Susu', symbol: 's', base: 'm' },
    { id: 't', name: 'Tambah Coklat', symbol: 't', base: 'n' }
];

export const stateMap: StateMap = {
    'S': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    'A': ['H', 'I', 'J'],
    'B': ['H', 'I', 'J'],
    'C': ['H', 'I', 'J'],
    'D': ['H', 'I', 'J'],
    'E': ['H', 'I', 'J'],
    'F': ['H', 'I', 'J'],
    'G': ['H', 'I', 'J'],
    'H': ['K'],
    'I': ['K'],
    'J': ['K'],
    'K': ['K', 'L', 'M', 'N'],
    'L': ['L', 'M', 'N', 'O'],
    'M': ['M', 'N', 'O'],
    'N': ['N', 'O'],
    'O': ['FINAL']
};
