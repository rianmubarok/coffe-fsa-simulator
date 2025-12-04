export interface Drink {
    id: string;
    name: string;
    symbol: string;
    ingredients: string[];
    icon: string;
}

export interface Size {
    id: string;
    name: string;
    symbol: string;
    icon: string;
}

export interface Extra {
    id: string;
    name: string;
    symbol: string;
    base: string;
    icon: string;
}

export interface ProcessLog {
    time: string;
    message: string;
}

export type Step = 'drink' | 'size' | 'extras' | 'processing' | 'confirmation' | 'done';

export type FSAState = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' |
    'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'FINAL';

export interface StateMap {
    [key: string]: string[];
}
