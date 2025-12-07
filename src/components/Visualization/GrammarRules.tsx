import React from "react";

export const GrammarRules: React.FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-black mb-3">Aturan Grammar CFG (4-Tuple)</h2>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-xs overflow-x-auto">
        <div className="text-gray-700 space-y-1">
          <div>
            <strong>V_T</strong> ={" "}
            {"{a, b, c, d, e, f, g, h, i, j, k, l, m, 0}"}
          </div>
          <div>
            <strong>V_N</strong> ={" "}
            {"{S, A, B, C, D, E, F, G, H, I, J, K, L, Final}"}
          </div>
          <div className="mt-2">
            <strong>Produksi:</strong>
          </div>
          <div>S → aA | bB | cC | 0</div>
          <div>A → dD | eE | fF | 0</div>
          <div>B → dD | eE | fF | 0</div>
          <div>C → dD | eE | fF | 0</div>
          <div>D → gG | hH | iI | jJ | kK | lL | 0</div>
          <div>E → gG | hH | iI | jJ | kK | lL | 0</div>
          <div>F → gG | hH | iI | jJ | kK | lL | 0</div>
          <div>G → gG | hH | iI | jJ | kK | lL | 0</div>
          <div>H → gG | hH | iI | jJ | kK | lL | 0</div>
          <div>I → gG | hH | iI | jJ | kK | lL | 0</div>
          <div>J → gG | hH | iI | jJ | kK | lL | 0</div>
          <div>K → mFinal | 0</div>
          <div>L → mFinal | 0</div>
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
