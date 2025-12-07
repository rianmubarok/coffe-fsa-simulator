import React from "react";
import { RotateCcw, ArrowRight } from "lucide-react";
import { Drink, Size, Extra } from "../data/types";
import Image from "next/image";

interface ConfirmationSelectionProps {
    selectedDrink: Drink | null;
    selectedSize: Size | null;
    extras: Extra[];
    selectedWater: 'k' | 'l' | null;
    onFinalize: () => void;
    onReset: () => void;
}

export const ConfirmationSelection: React.FC<ConfirmationSelectionProps> = ({
    selectedDrink,
    selectedSize,
    extras,
    selectedWater,
    onFinalize,
    onReset,
}) => {
    return (
        <div className="text-center mb-6">
            <div className="w-48 h-48 relative mx-auto mb-4">
                <Image
                    src="/img/gelas.png"
                    alt="Gelas minuman siap"
                    fill
                    className="object-contain"
                />
            </div>
            <h3 className="text-3xl text-black mb-4 font-playfair italic">
                Konfirmasi Pesanan
            </h3>
            <div className="bg-amber-50 p-4 rounded-xl mb-6 text-left">
                <h4 className="font-bold text-amber-900 mb-2">Detail Pesanan:</h4>
                <ul className="space-y-1 text-amber-800">
                    <li>• {selectedDrink?.name}</li>
                    <li>• {selectedSize?.name}</li>
                    {extras.length > 0 && (
                        <li>
                            • Extra:{" "}
                            {Object.entries(
                                extras.reduce((acc, extra) => {
                                    const name = extra.name.replace("Tambah ", "");
                                    acc[name] = (acc[name] || 0) + 1;
                                    return acc;
                                }, {} as Record<string, number>)
                            )
                                .map(([name, count]) =>
                                    count > 1 ? `${name} ${count}x` : name
                                )
                                .join(", ")}
                        </li>
                    )}
                    {selectedWater && (
                        <li>• Air: {selectedWater === 'k' ? 'Panas (k)' : 'Dingin (l)'}</li>
                    )}
                </ul>
            </div>

            <div className="space-y-3">
                <button
                    onClick={onFinalize}
                    className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform cursor-pointer"
                >
                    <ArrowRight className="w-5 h-5" />
                    Buat Minuman (m)
                </button>

                <button
                    onClick={onReset}
                    className="w-full p-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-all transform flex items-center justify-center gap-2 font-semibold cursor-pointer"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset (0)
                </button>
            </div>
        </div>
    );
};
