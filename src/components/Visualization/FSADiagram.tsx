import React, { useRef, useEffect } from 'react';
import { FSAState } from '../data/types';

interface FSADiagramProps {
    currentState: FSAState;
}

const getStateColor = (state: string, currentState: FSAState) => {
    if (state === currentState) return 'bg-blue-500 ring-2 ring-blue-300 z-20';
    if (state === 'FINAL' && currentState === 'FINAL') return 'bg-green-500 ring-2 ring-green-300 z-20';
    return 'bg-gray-100 border border-gray-600 z-10';
};

const getStateTextColor = (state: string, currentState: FSAState) => {
    if (state === currentState || (state === 'FINAL' && currentState === 'FINAL')) return 'text-white';
    return 'text-gray-800';
};

export const FSADiagram: React.FC<FSADiagramProps> = ({ currentState }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll ke tengah saat komponen dimuat
    useEffect(() => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current;
            if (scrollWidth > clientWidth) {
                scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
            }
        }
    }, []);

    // Definisi posisi yang lebih compact lagi (skala ~0.7x dari original)
    // Digeser X +200 agar centered di container 1000px (Center = 500)
    const positions = {
        S: { x: 500, y: 30 },
        drinks: ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id, i) => ({ id, x: 260 + i * 80, y: 130 })),
        sizes: ['H', 'I', 'J'].map((id, i) => ({ id, x: 400 + i * 100, y: 240 })),
        ingredients: ['K', 'L', 'M', 'N'].map((id, i) => ({ id, x: 365 + i * 90, y: 350 })),
        O: { x: 500, y: 460 },
        FINAL: { x: 500, y: 550 }
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Diagram FSA</h2>
            <div ref={scrollRef} className="bg-white p-2 rounded-lg overflow-x-auto border border-gray-200">
                <div className="relative min-w-[1000px] w-[1000px] mx-auto h-[600px]">

                    {/* Layer SVG untuk Garis Koneksi */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <defs>
                            <marker
                                id="arrowhead"
                                markerWidth="5"
                                markerHeight="5"
                                refX="4"
                                refY="2.5"
                                orient="auto"
                            >
                                <polygon points="0 0, 5 2.5, 0 5" fill="#000" />
                            </marker>
                        </defs>

                        {/* Koneksi S -> Drinks (A-G) */}
                        {positions.drinks.map((pos, i) => (
                            <g key={`S-${pos.id}`}>
                                <path
                                    d={`M ${positions.S.x} ${positions.S.y + 20} C ${positions.S.x} ${positions.S.y + 60}, ${pos.x} ${pos.y - 50}, ${pos.x} ${pos.y - 20}`}
                                    fill="none"
                                    stroke="#000"
                                    strokeWidth="1.2"
                                    markerEnd="url(#arrowhead)"
                                />
                                {/* Label Transisi */}
                                <rect x={(positions.S.x + pos.x) / 2 - 6} y={(positions.S.y + pos.y) / 2 - 7} width="12" height="12" rx="2" fill="white" stroke="#e5e7eb" />
                                <text x={(positions.S.x + pos.x) / 2} y={(positions.S.y + pos.y) / 2 + 3} textAnchor="middle" fontSize="8" fill="#4b5563" fontWeight="bold">
                                    {String.fromCharCode(97 + i)}
                                </text>
                            </g>
                        ))}

                        {/* Koneksi Drinks -> Sizes (H-J) */}
                        {positions.drinks.map((drink, i) =>
                            positions.sizes.map((size, j) => (
                                <path
                                    key={`${drink.id}-${size.id}`}
                                    d={`M ${drink.x} ${drink.y + 18} C ${drink.x} ${drink.y + 50}, ${size.x} ${size.y - 50}, ${size.x} ${size.y - 20}`}
                                    fill="none"
                                    stroke="#000"
                                    strokeWidth="0.4"
                                    opacity="0.3"
                                    markerEnd="url(#arrowhead)"
                                />
                            ))
                        )}

                        {/* Koneksi Sizes -> Ingredients (K-N) */}
                        {positions.sizes.map((size, i) =>
                            positions.ingredients.map((ing, j) => (
                                <path
                                    key={`${size.id}-${ing.id}`}
                                    d={`M ${size.x} ${size.y + 18} C ${size.x} ${size.y + 50}, ${ing.x} ${ing.y - 50}, ${ing.x} ${ing.y - 20}`}
                                    fill="none"
                                    stroke="#000"
                                    strokeWidth="0.4"
                                    opacity="0.3"
                                    markerEnd="url(#arrowhead)"
                                />
                            ))
                        )}

                        {/* Self-loops untuk Ingredients (K-N) */}
                        {positions.ingredients.map((ing) => (
                            <g key={`${ing.id}-loop`}>
                                <path
                                    d={`M ${ing.x + 12} ${ing.y - 6} C ${ing.x + 40} ${ing.y - 25}, ${ing.x + 40} ${ing.y + 25}, ${ing.x + 12} ${ing.y + 6}`}
                                    fill="none"
                                    stroke="#000"
                                    strokeWidth="1.2"
                                    markerEnd="url(#arrowhead)"
                                />
                                <text x={ing.x + 30} y={ing.y + 3} textAnchor="middle" fontSize="7" fill="#4b5563" fontWeight="bold">
                                    {ing.id.toLowerCase()}
                                </text>
                            </g>
                        ))}

                        {/* Koneksi Silang Antar Ingredients (Fully Connected) */}
                        {positions.ingredients.map((source, i) =>
                            positions.ingredients.map((target, j) => {
                                if (i === j) return null;

                                const isForward = i < j;
                                const curveOffset = isForward ? -35 - (Math.abs(i - j) * 10) : 35 + (Math.abs(i - j) * 10);
                                const midX = (source.x + target.x) / 2;
                                const midY = source.y + curveOffset;

                                return (
                                    <g key={`cross-${source.id}-${target.id}`}>
                                        <path
                                            d={`M ${source.x} ${source.y + (isForward ? -18 : 18)} Q ${midX} ${midY}, ${target.x} ${target.y + (isForward ? -18 : 18)}`}
                                            fill="none"
                                            stroke="#000"
                                            strokeWidth="0.6"
                                            opacity="0.5"
                                            markerEnd="url(#arrowhead)"
                                        />
                                        <rect x={midX - 4} y={midY - 6} width="8" height="12" rx="2" fill="white" fillOpacity="0.9" />
                                        <text x={midX} y={midY + 3} textAnchor="middle" fontSize="7" fill="#4b5563" fontWeight="bold">
                                            {target.id.toLowerCase()}
                                        </text>
                                    </g>
                                );
                            })
                        )}

                        {/* Koneksi Ingredients -> O */}
                        {positions.ingredients.map((ing, i) => (
                            <g key={`${ing.id}-O`}>
                                <path
                                    d={`M ${ing.x} ${ing.y + 18} C ${ing.x} ${ing.y + 50}, ${positions.O.x} ${positions.O.y - 50}, ${positions.O.x} ${positions.O.y - 20}`}
                                    fill="none"
                                    stroke="#000"
                                    strokeWidth="1.2"
                                    markerEnd="url(#arrowhead)"
                                />
                                <rect x={(ing.x + positions.O.x) / 2 - 5} y={(ing.y + positions.O.y) / 2 - 7} width="10" height="10" rx="2" fill="white" stroke="#e5e7eb" />
                                <text x={(ing.x + positions.O.x) / 2} y={(ing.y + positions.O.y) / 2 + 3} textAnchor="middle" fontSize="8" fill="#4b5563" fontWeight="bold">o</text>
                            </g>
                        ))}

                        {/* Koneksi O -> FINAL */}
                        <g>
                            <path
                                d={`M ${positions.O.x} ${positions.O.y + 18} L ${positions.FINAL.x} ${positions.FINAL.y - 30}`}
                                fill="none"
                                stroke="#000"
                                strokeWidth="1.5"
                                markerEnd="url(#arrowhead)"
                            />
                            <rect x={positions.O.x - 7} y={(positions.O.y + positions.FINAL.y) / 2 - 9} width="14" height="14" rx="3" fill="white" stroke="#e5e7eb" />
                            <text x={positions.O.x} y={(positions.O.y + positions.FINAL.y) / 2 + 3} textAnchor="middle" fontSize="9" fill="#4b5563" fontWeight="bold">p</text>
                        </g>

                        {/* Koneksi FINAL -> S (Reset Loop) */}
                        <g>
                            <path
                                d={`M ${positions.FINAL.x + 30} ${positions.FINAL.y} C ${positions.FINAL.x + 320} ${positions.FINAL.y}, ${positions.S.x + 320} ${positions.S.y}, ${positions.S.x + 30} ${positions.S.y}`}
                                fill="none"
                                stroke="#000"
                                strokeWidth="1.2"
                                strokeDasharray="6 3"
                                markerEnd="url(#arrowhead)"
                            />
                            <rect x={positions.FINAL.x + 230} y={290} width="30" height="14" rx="2" fill="white" stroke="#e5e7eb" />
                            <text x={positions.FINAL.x + 245} y={300} textAnchor="middle" fontSize="8" fill="#4b5563" fontWeight="bold">
                                reset
                            </text>
                        </g>

                    </svg>

                    {/* Layer Node / State */}

                    {/* Start Node */}
                    <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: positions.S.x, top: positions.S.y }}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base shadow-md transition-colors duration-300 ${getStateColor('S', currentState)} ${getStateTextColor('S', currentState)}`}>
                            S
                        </div>
                        <div className="text-center mt-1 text-[9px] font-bold text-gray-500">START</div>
                    </div>

                    {/* Drink Nodes */}
                    {positions.drinks.map((pos) => (
                        <div key={pos.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: pos.x, top: pos.y }}>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors duration-300 ${getStateColor(pos.id, currentState)} ${getStateTextColor(pos.id, currentState)}`}>
                                {pos.id}
                            </div>
                        </div>
                    ))}

                    {/* Size Nodes */}
                    {positions.sizes.map((pos) => (
                        <div key={pos.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: pos.x, top: pos.y }}>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors duration-300 ${getStateColor(pos.id, currentState)} ${getStateTextColor(pos.id, currentState)}`}>
                                {pos.id}
                            </div>
                        </div>
                    ))}

                    {/* Ingredient Nodes */}
                    {positions.ingredients.map((pos) => (
                        <div key={pos.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: pos.x, top: pos.y }}>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors duration-300 ${getStateColor(pos.id, currentState)} ${getStateTextColor(pos.id, currentState)}`}>
                                {pos.id}
                            </div>
                        </div>
                    ))}

                    {/* Water Node */}
                    <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: positions.O.x, top: positions.O.y }}>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-colors duration-300 ${getStateColor('O', currentState)} ${getStateTextColor('O', currentState)}`}>
                            O
                        </div>
                    </div>

                    {/* Final Node */}
                    <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: positions.FINAL.x, top: positions.FINAL.y }}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 border-double border-gray-800 transition-colors duration-300 ${getStateColor('FINAL', currentState)} ${getStateTextColor('FINAL', currentState)}`}>
                            ✓
                        </div>
                        <div className="text-center mt-1 text-[9px] font-bold text-gray-500">FINAL</div>
                    </div>

                </div>
            </div>

            <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200 text-[10px] text-gray-600">
                <p className="font-semibold mb-1">Legenda:</p>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                        <span>Aktif</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        <span>Selesai</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-100 border border-gray-600"></div>
                        <span>Pending</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
