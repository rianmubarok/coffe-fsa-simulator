import React from 'react';

export const GrammarRules: React.FC = () => {
    return (
        <div className="mt-6 bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Aturan Grammar FSA</h2>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                <div className="text-gray-700 space-y-1">
                    <div><strong>V_T</strong> = {'{a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t}'}</div>
                    <div><strong>V_N</strong> = {'{S, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O}'}</div>
                    <div className="mt-2"><strong>Produksi:</strong></div>
                    <div>S → aA | bB | cC | dD | eE | fF | gG</div>
                    <div>A,B,C,D,E,F,G → hH | iI | jJ</div>
                    <div>H,I,J → kK</div>
                    <div>K → qK | lL | mM | nN</div>
                    <div>L → rL | mM | nN | oO</div>
                    <div>M → sM | nN | oO</div>
                    <div>N → tN | oO</div>
                    <div>O → p (Final State)</div>
                </div>
            </div>
        </div>
    );
};
