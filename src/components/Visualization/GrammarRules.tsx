import React from "react";

export const GrammarRules: React.FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-black mb-3">Aturan Grammar FSA</h2>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <div className="text-gray-700 space-y-1">
          <div>
            <strong>V_T</strong> ={" "}
            {"{a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, 0}"}
          </div>
          <div>
            <strong>V_N</strong> ={" "}
            {"{S, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O}"}
          </div>
          <div className="mt-2">
            <strong>Produksi:</strong>
          </div>
          <div>S → aA | bB | cC | dD | eE | fF | gG | 0</div>
          <div>A → hH | iI | jJ | S</div>
          <div>B → hH | iI | jJ | S</div>
          <div>C → hH | iI | jJ | S</div>
          <div>D → hH | iI | jJ | S</div>
          <div>E → hH | iI | jJ | S</div>
          <div>F → hH | iI | jJ | S</div>
          <div>G → hH | iI | jJ | S</div>
          <div>H → kK | S</div>
          <div>I → kK | S</div>
          <div>J → kK | S</div>
          <div>K → qK | lL | mM | nN | S</div>
          <div>L → rL | mM | nN | oO | S</div>
          <div>M → sM | nN | oO | S</div>
          <div>N → tN | oO | S</div>
          <div>O → p</div>
        </div>
      </div>
    </div>
  );
};
