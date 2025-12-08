import React from "react";

export const GrammarRules: React.FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-black mb-3">Aturan Grammar CFG (4-Tuple)</h2>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <div className="text-gray-700 space-y-1">
          <div>
            <strong>G = (V_T, V_N, S, P)</strong>
          </div>
          <div>
            <strong>V_T</strong> ={" "}
            {"{a, b, c, d, e, f, g, h, i, j, k, l, m, 0}"}
          </div>
          <div>
            <strong>V_N</strong> ={" "}
            {"{S, A, B, C, D, E, F, G, H, I, J, K, L, Final}"}
          </div>
          <div>
            <strong>S</strong> = S
          </div>
          <div className="mt-2">
            <strong>P = {"{"}</strong>
          </div>
          <div className="ml-2">S → aA | bB | cC | 0,</div>
          <div className="ml-2">A → dD | eE | fF | 0,</div>
          <div className="ml-2">B → dD | eE | fF | 0,</div>
          <div className="ml-2">C → dD | eE | fF | 0,</div>
          <div className="ml-2">D → gG | hH | iI | jJ | kK | lL | 0,</div>
          <div className="ml-2">E → gG | hH | iI | jJ | kK | lL | 0,</div>
          <div className="ml-2">F → gG | hH | iI | jJ | kK | lL | 0,</div>
          <div className="ml-2">G → gG | hH | iI | jJ | kK | lL | 0,</div>
          <div className="ml-2">H → gG | hH | iI | jJ | kK | lL | 0,</div>
          <div className="ml-2">I → gG | hH | iI | jJ | kK | lL | 0,</div>
          <div className="ml-2">J → gG | hH | iI | jJ | kK | lL | 0,</div>
          <div className="ml-2">K → mFinal | 0,</div>
          <div className="ml-2">L → mFinal | 0</div>
          <div>
            <strong>{"}"}</strong>
          </div>
          <div className="mt-2 text-gray-600 text-[10px]">
            <strong>Catatan:</strong> Aturan G, H, I, J memiliki self-loop (gG,
            hH, iI, jJ) yang memungkinkan extra dipilih berulang kali. Batasan
            maksimal 3 extra diimplementasikan di level aplikasi.
          </div>
        </div>
      </div>
    </div>
  );
};
