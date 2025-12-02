import { Drink, Size, Extra, StateMap } from './types';

export const drinks: Drink[] = [
    { id: 'a', name: 'Kopi', symbol: 'a', ingredients: ['kopi'], icon: '☕' },
    { id: 'b', name: 'Susu', symbol: 'b', ingredients: ['susu'], icon: '🥛' },
    { id: 'c', name: 'Coklat', symbol: 'c', ingredients: ['coklat'], icon: '🍫' },
    { id: 'd', name: 'Kopi Susu', symbol: 'd', ingredients: ['kopi', 'susu'], icon: '☕🥛' },
    { id: 'e', name: 'Kopi Coklat', symbol: 'e', ingredients: ['kopi', 'coklat'], icon: '☕🍫' },
    { id: 'f', name: 'Mocha', symbol: 'f', ingredients: ['kopi', 'susu', 'coklat'], icon: '☕🥛🍫' },
    { id: 'g', name: 'Susu Coklat', symbol: 'g', ingredients: ['susu', 'coklat'], icon: '🥛🍫' }
];

export const sizes: Size[] = [
    { id: 'h', name: 'Small', symbol: 'h', icon: '🥤' },
    { id: 'i', name: 'Medium', symbol: 'i', icon: '🥤' },
    { id: 'j', name: 'Large', symbol: 'j', icon: '🥤' }
];

export const extraOptions: Extra[] = [
    { id: 'q', name: 'Tambah Gula', symbol: 'q', base: 'k', icon: '🍬' },
    { id: 'r', name: 'Tambah Kopi', symbol: 'r', base: 'l', icon: '☕' },
    { id: 's', name: 'Tambah Susu', symbol: 's', base: 'm', icon: '🥛' },
    { id: 't', name: 'Tambah Coklat', symbol: 't', base: 'n', icon: '🍫' }
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
