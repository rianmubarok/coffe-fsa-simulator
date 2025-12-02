import React from 'react';
import { BookOpen, Lightbulb, ArrowRight, RotateCcw } from 'lucide-react';

export const FSADocumentation: React.FC = () => {
    return (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Dokumentasi FSA Mesin Kopi</h2>
            </div>

            {/* Introduction */}
            <div className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Tentang Sistem
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    Aplikasi ini menerapkan konsep <strong>Finite State Automaton (FSA)</strong> untuk mensimulasikan
                    mesin pembuat minuman kopi otomatis. FSA digunakan untuk membaca simbol masukan yang diberikan
                    dari start state sampai final state sehingga diperoleh suatu bahasa yang dikenali oleh mesin.
                    Mesin akan mengikuti pola alur dari proses pembuatan minuman sesuai dengan pilihan jenis minuman,
                    sehingga tidak terjadi kesalahan dalam proses pembuatan minuman.
                </p>
            </div>

            {/* How It Works */}
            <div className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Cara Kerja Sistem</h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
                        <div>
                            <strong className="text-gray-800">Pilih Minuman (State S → A-G)</strong>
                            <p className="text-gray-600 text-sm">Pengguna memilih jenis minuman (kopi, susu, coklat, atau kombinasinya). Sistem bertransisi dari state S ke salah satu state A-G.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
                        <div>
                            <strong className="text-gray-800">Pilih Ukuran (State A-G → H-J)</strong>
                            <p className="text-gray-600 text-sm">Pengguna memilih ukuran gelas (Small, Medium, Large). Sistem bertransisi ke state H, I, atau J.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
                        <div>
                            <strong className="text-gray-800">Tambah Gula (State H-J → K)</strong>
                            <p className="text-gray-600 text-sm">Sistem otomatis menambahkan gula dasar dan bertransisi ke state K.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">4</div>
                        <div>
                            <strong className="text-gray-800">Tambah Extra (State K → L/M/N)</strong>
                            <p className="text-gray-600 text-sm">Pengguna dapat menambahkan extra (gula, kopi, susu, coklat). Sistem bertransisi sesuai bahan yang ditambahkan.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">5</div>
                        <div>
                            <strong className="text-gray-800">Tambah Air (State → O)</strong>
                            <p className="text-gray-600 text-sm">Sistem menambahkan air panas dan bertransisi ke state O.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm">6</div>
                        <div>
                            <strong className="text-gray-800">Aduk & Selesai (State O → FINAL)</strong>
                            <p className="text-gray-600 text-sm">Sistem mengaduk minuman dan mencapai final state. Minuman siap disajikan!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Return to Start Feature */}
            <div className="mb-6 bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                    <RotateCcw className="w-5 h-5 text-yellow-600" />
                    Fitur Kembali ke Start State
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                    Sesuai dengan spesifikasi FSA lengkap, sistem mendukung transisi kembali ke <strong>start state (S)</strong>
                    dari setiap state intermediate. Ini memungkinkan pengguna untuk membatalkan proses dan memulai dari awal
                    kapan saja sebelum mencapai final state.
                </p>
                <div className="bg-white p-3 rounded text-sm font-mono text-gray-700">
                    <div>Setiap state dapat kembali ke S:</div>
                    <div className="mt-2 space-y-1 text-xs">
                        <div>• A, B, C, D, E, F, G → S (dari pilihan minuman)</div>
                        <div>• H, I, J → S (dari pilihan ukuran)</div>
                        <div>• K, L, M, N → S (dari penambahan bahan)</div>
                        <div>• O → S (dari penambahan air)</div>
                    </div>
                </div>
            </div>

            {/* Example Sequences */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-3">Contoh Urutan Input</h3>
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-gray-800">Kopi Medium dengan Extra Gula:</span>
                        </div>
                        <div className="font-mono text-sm text-gray-700 flex items-center gap-2">
                            <span className="bg-blue-100 px-2 py-1 rounded">a</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">i</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">k</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">q</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">o</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-green-100 px-2 py-1 rounded">p</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            S → A → I → K → K → O → FINAL
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-gray-800">Mocha Large dengan Extra Susu dan Coklat:</span>
                        </div>
                        <div className="font-mono text-sm text-gray-700 flex items-center gap-2 flex-wrap">
                            <span className="bg-blue-100 px-2 py-1 rounded">f</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">j</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">k</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">m</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">s</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">n</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">t</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">o</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-green-100 px-2 py-1 rounded">p</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            S → F → J → K → M → M → N → N → O → FINAL
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-gray-800">Susu Coklat Small (Sederhana):</span>
                        </div>
                        <div className="font-mono text-sm text-gray-700 flex items-center gap-2">
                            <span className="bg-blue-100 px-2 py-1 rounded">g</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">h</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">k</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-blue-100 px-2 py-1 rounded">o</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="bg-green-100 px-2 py-1 rounded">p</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            S → G → H → K → O → FINAL
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
