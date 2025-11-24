# Mesin Kopi FSA (Finite State Automata)

Simulasi Finite State Automata pada Mesin Pembuat Minuman Kopi Otomatis menggunakan Next.js dan TypeScript.

## 📋 Deskripsi

Aplikasi ini mensimulasikan cara kerja mesin kopi otomatis menggunakan konsep Finite State Automata (FSA). Pengguna dapat memilih jenis minuman, ukuran gelas, dan tambahan extra, lalu melihat bagaimana FSA memproses input tersebut melalui berbagai state hingga menghasilkan minuman yang diinginkan.

## ✨ Fitur

- **7 Jenis Minuman**: Kopi, Susu, Coklat, Kopi Susu, Kopi Coklat, Mocha, Susu Coklat
- **3 Ukuran Gelas**: Small, Medium, Large
- **4 Tambahan Extra**: Tambah Gula, Tambah Kopi, Tambah Susu, Tambah Coklat
- **Visualisasi FSA**: Diagram state yang interaktif menampilkan transisi state secara real-time
- **Process Log**: Log detail proses pembuatan minuman
- **Grammar Rules**: Tampilan aturan grammar FSA

## 🚀 Cara Menjalankan di Local

### Prerequisites

Pastikan Anda sudah menginstall:
- [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru)
- npm, yarn, pnpm, atau bun

### Langkah-langkah

1. **Clone repository ini**
   ```bash
   git clone <repository-url>
   cd coffe-fsa-simulator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

4. **Buka browser**
   
   Akses [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## 🏗️ Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx          # Root layout dengan HTML tags
│   ├── page.tsx            # Main page (5 lines - simplified)
│   └── globals.css         # Global styles
└── components/
    └── CoffeeMachine/
        ├── index.tsx           # Main component
        ├── types.ts            # TypeScript interfaces
        ├── constants.ts        # Data constants (drinks, sizes, extras)
        ├── useCoffeeMachine.ts # Custom hook untuk FSA logic
        ├── DrinkSelection.tsx  # Drink selection UI
        ├── SizeSelection.tsx   # Size selection UI
        ├── ExtraSelection.tsx  # Extra selection UI
        ├── DoneState.tsx       # Completion state UI
        ├── StateInfo.tsx       # FSA state info display
        ├── FSADiagram.tsx      # FSA visualization
        ├── ProcessLog.tsx      # Process log display
        └── GrammarRules.tsx    # Grammar rules display
```

## 🎯 Cara Menggunakan

1. **Pilih Jenis Minuman** - Pilih salah satu dari 7 jenis minuman yang tersedia
2. **Pilih Ukuran Gelas** - Pilih Small, Medium, atau Large
3. **Tambah Extra (Opsional)** - Tambahkan hingga 3 extra ingredients
4. **Proses Minuman** - Klik tombol "PROSES MINUMAN" untuk memulai
5. **Lihat Hasil** - Tunggu hingga proses selesai dan minuman siap!

## 🔧 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Geist Sans & Geist Mono

## 📚 Konsep FSA

Aplikasi ini mengimplementasikan FSA dengan:
- **V_T (Terminal Symbols)**: a-t (input symbols)
- **V_N (Non-terminal Symbols)**: S, A-O (states)
- **Start State**: S
- **Final State**: FINAL
- **Productions**: Aturan transisi state yang ditampilkan di aplikasi

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Dibuat sebagai project pembelajaran Finite State Automata.
