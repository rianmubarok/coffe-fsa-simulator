# Mesin Kopi FSA (Finite State Automata)

Simulasi Finite State Automata pada Mesin Pembuat Minuman Kopi Otomatis menggunakan Next.js dan TypeScript.

## Deskripsi

Aplikasi ini mensimulasikan cara kerja mesin kopi otomatis menggunakan konsep Finite State Automata (FSA). Pengguna dapat memilih jenis minuman, ukuran gelas, tambahan extra, dan jenis air, lalu melihat bagaimana FSA memproses input tersebut melalui berbagai state hingga menghasilkan minuman yang diinginkan. Aplikasi juga menampilkan nama minuman yang dihasilkan berdasarkan kombinasi bahan yang dipilih.

## Fitur

- **3 Jenis Minuman Dasar**: Kopi (a), Susu (b), Coklat (c)
- **3 Ukuran Gelas**: Small (d), Medium (e), Large (f)
- **4 Tambahan Extra**: Tambah Gula (g), Tambah Kopi (h), Tambah Susu (i), Tambah Coklat (j)
- **2 Jenis Air**: Air Panas (k), Air Dingin (l)
- **Self-Loop**: Extra dapat dipilih berulang kali (maksimal 3 total)
- **Nama Minuman Dinamis**: Nama minuman dihasilkan berdasarkan kombinasi bahan (contoh: "Es Mocca Panas dengan Gula Small")
- **Visualisasi FSA**: Diagram state yang interaktif menampilkan 14 states dan transisi secara real-time
- **Process Log**: Log detail proses pembuatan minuman dengan informasi transisi FSA
- **Grammar Rules**: Tampilan aturan produksi CFG (4-Tuple) sesuai spesifikasi

## Cara Menjalankan di Local

### Prerequisites

Pastikan Anda sudah menginstall:

- [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru)
- npm, yarn, pnpm, atau bun

### Langkah-langkah

1. **Clone repository ini**

   ```bash
   git clone <https://github.com/rianmubarok/coffe-fsa-simulator>
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

## Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx          # Root layout dengan HTML tags
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
└── components/
    ├── index.tsx           # Main component
    ├── data/
    │   ├── types.ts        # TypeScript interfaces
    │   └── constants.ts    # Data constants (drinks, sizes, extras, stateMap)
    ├── hooks/
    │   └── useCoffeeMachine.ts # Custom hook untuk FSA logic dan generate nama minuman
    ├── Selection/
    │   ├── DrinkSelection.tsx        # Drink selection UI
    │   ├── SizeSelection.tsx         # Size selection UI
    │   ├── ExtraSelection.tsx        # Extra selection UI (dengan pilihan air)
    │   └── ConfirmationSelection.tsx # Confirmation UI
    └── Visualization/
        ├── DoneState.tsx       # Completion state UI
        ├── StateInfo.tsx       # FSA state info display
        ├── FSADiagram.tsx      # FSA visualization (14 states)
        ├── ProcessLog.tsx      # Process log display
        └── GrammarRules.tsx    # Grammar rules display (CFG 4-Tuple)
```

## Cara Menggunakan

1. **Pilih Jenis Minuman** - Pilih salah satu dari 3 jenis minuman dasar (Kopi, Susu, atau Coklat)
2. **Pilih Ukuran Gelas** - Pilih Small, Medium, atau Large
3. **Tambah Extra (Opsional)** - Tambahkan hingga 3 extra ingredients (bisa memilih yang sama berulang kali)
4. **Pilih Air** - Pilih Air Panas atau Air Dingin
5. **Konfirmasi Pesanan** - Tinjau pesanan Anda sebelum memproses
6. **Proses Minuman** - Klik tombol "Buat Minuman (m)" untuk memulai
7. **Lihat Hasil** - Tunggu hingga proses selesai dan minuman siap!

**Catatan**:

- Anda dapat reset kapan saja (kecuali di state Final) dengan tombol "Reset (0)"
- Di state Final, gunakan tombol "Buat Minuman Lagi" untuk memulai pesanan baru

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Konsep FSA

### 5-Tuple FSA

**FSA = (Q, Σ, δ, q₀, F)**

Dimana:

- **Q** = {S, A, B, C, D, E, F, G, H, I, J, K, L, Final} - Total 14 states
- **Σ** = {a, b, c, d, e, f, g, h, i, j, k, l, m, 0} - Input symbols
  - a = pilih kopi
  - b = pilih susu
  - c = pilih coklat
  - d = pilih small
  - e = pilih medium
  - f = pilih large
  - g = tambah gula
  - h = tambah kopi
  - i = tambah susu
  - j = tambah coklat
  - k = air panas
  - l = air dingin
  - m = buat minuman (dari state K/L ke Final)
  - 0 = reset ke S
- **δ** = Fungsi transisi (lihat stateMap di constants.ts)
- **q₀** = S (state awal)
- **F** = {Final} (state akhir)

### Karakteristik FSA

- **Jenis**: Deterministic Finite Automaton (DFA)
- **Self-Loop**: State G, H, I, J memiliki self-loop (bisa memilih extra yang sama berulang kali)
- **Batasan Extra**: Maksimal 3 extra (dihandle aplikasi, bukan FSA)
- **State Final**: Hanya bisa dicapai dari K atau L dengan input 'm'
- **Reset**: Semua state (kecuali Final) dapat reset ke S dengan input '0'

### Grammar (CFG 4-Tuple)

**G = (V_T, V_N, S, P)**

Dimana:

- **V_T (Terminal Symbols)**: {a, b, c, d, e, f, g, h, i, j, k, l, m, 0}
- **V_N (Non-Terminal Symbols)**: {S, A, B, C, D, E, F, G, H, I, J, K, L, Final}
- **S (Start Symbol)**: S
- **P (Set of Productions)**:

```
P = {
  S → aA | bB | cC | 0,
  A → dD | eE | fF | 0,
  B → dD | eE | fF | 0,
  C → dD | eE | fF | 0,
  D → gG | hH | iI | jJ | kK | lL | 0,
  E → gG | hH | iI | jJ | kK | lL | 0,
  F → gG | hH | iI | jJ | kK | lL | 0,
  G → gG | hH | iI | jJ | kK | lL | 0,
  H → gG | hH | iI | jJ | kK | lL | 0,
  I → gG | hH | iI | jJ | kK | lL | 0,
  J → gG | hH | iI | jJ | kK | lL | 0,
  K → mFinal | 0,
  L → mFinal | 0
}
```

**Catatan**: Aturan G, H, I, J memiliki self-loop (gG, hH, iI, jJ) yang memungkinkan extra dipilih berulang kali. Batasan maksimal 3 extra diimplementasikan di level aplikasi.

### Contoh Trace Eksekusi

**Contoh 1: "Kopi Susu Panas"**

- **Input:** `a d i k m`
- **Trace:** S → A → D → I → K → Final
- **Komposisi:** Kopi + Small + Extra Susu + Air Panas

**Contoh 2: "Es Mocca"**

- **Input:** `c e h j l m`
- **Trace:** S → C → E → H → J → L → Final
- **Komposisi:** Coklat + Medium + Extra Kopi + Extra Coklat + Air Dingin

**Contoh 3: "Kopi dengan Gula 3x"**

- **Input:** `a e g g g k m`
- **Trace:** S → A → E → G → G → G → K → Final
- **Komposisi:** Kopi + Medium + Gula 3x + Air Panas
- **Catatan:** Loop G→G→G (self-transition 3 kali)

## Fitur Khusus

### Nama Minuman Dinamis

Aplikasi secara otomatis menghasilkan nama minuman berdasarkan kombinasi bahan yang dipilih:

- **"Es Mocca Panas dengan Gula Small"** - Jika semua bahan (kopi, susu, coklat) ada
- **"Kopi Susu Panas dengan Gula 2x Medium"** - Jika kopi dan susu ada
- **"Es Susu Coklat tanpa Gula Large"** - Jika susu dan coklat ada
- **"Kopi Panas tanpa Gula Small"** - Jika hanya kopi

### Process Log

Log proses menampilkan:

- Transisi FSA: `[FSA] State: X → Y (input: z)`
- Self-loop indicator: `(self-loop ↻, input: z)`
- Komposisi minuman saat memilih air
- Nama final minuman saat selesai

## Author

Dibuat sebagai project pembelajaran Finite State Automata.
