
# Panduan Modifikasi Website Olympus Legacy (PSTI UPI MMXXVI)

Website ini dirancang menggunakan **HTML, CSS, dan JavaScript murni (Vanilla JS)** dengan pemisahan data di `data.js` dan `quizData.js` agar rekan-rekan **Tim Website Olympus Legacy** maupun pengurus angkatan dapat mengubah isi konten tanpa harus mengedit kode `index.html`.

---

## Struktur Folder & File

```text
Olympus/
├── index.html          # Struktur utama halaman single-page
├── style.css           # Tema visual Navy, Putih, dan Biru Langit (#152B4F, #0C1A33, #8FB3E0)
├── script.js           # Logika render dinamis, filter, modal, lightbox, dan canvas IG Story
├── data.js             # Data utama: profil angkatan, struktur, 35 anggota, galeri, timeline
├── quizData.js         # Data kuis 12 Dewa Olympus: 8 pertanyaan, bobot skor, hasil & kecocokan divisi
└── assets/
    ├── logo.png        # Logo resmi Olympus Legacy (dipakai di navbar, hero, favicon, footer, dan IG Story)
    ├── members/        # Folder tempat menyimpan foto masing-masing anggota
    └── gallery/        # Folder tempat menyimpan foto dokumentasi kegiatan angkatan
```

---

## 1. Cara Mengganti Foto, Kutipan, dan Link Instagram Anggota

Buka file [`data.js`](file:///home/sena/Projects/Olympus/data.js) dan cari bagian `members: [ ... ]`. Setiap anggota memiliki format objek seperti berikut:

```javascript
{
  id: "rafa",
  name: "Rafa",
  role: "Ketua Angkatan",
  division: "Inti",
  subdivision: "Ketua",
  filterGroup: "Inti",
  photo: "assets/members/rafa.jpg", // <-- Isi path foto di sini
  quote: "Pemimpin bukan yang berdiri paling tinggi di puncak Olympus...", // <-- Ubah kutipan di sini
  instagram: "@rafa.olympus", // <-- Ubah username Instagram di sini
  instagramUrl: "https://instagram.com/rafa.olympus" // <-- Ubah link profil Instagram di sini
}
```

### Langkah-langkah:
1. **Mengganti Foto:**
   - Siapkan file foto anggota (disarankan rasio persegi `1:1`, format `.jpg`, `.png`, atau `.webp`).
   - Masukkan file foto ke dalam folder `assets/members/`, misalnya `assets/members/rafa.jpg`.
   - Ubah nilai `photo: ""` menjadi `photo: "assets/members/rafa.jpg"`.
   - *Catatan:* Apabila `photo` dikosongkan (`""`) atau file gambar belum tersedia, website otomatis menampilkan avatar inisial nama dengan latar Navy.
2. **Mengganti Kutipan (Quote):**
   - Ubah teks di dalam tanda kutip pada properti `quote`.
3. **Mengganti Link Instagram:**
   - Ubah teks `instagram` (untuk tampilan `@username`) dan `instagramUrl` (tautan tujuan saat tombol Instagram di modal diklik).

---

## 2. Cara Mengganti Motto / Slogan Angkatan

Buka [`data.js`](file:///home/sena/Projects/Olympus/data.js) pada bagian paling atas (`cohort`):

```javascript
cohort: {
  name: "OLYMPUS LEGACY",
  origin: "PSTI UPI",
  yearRoman: "MMXXVI",
  motto: "Dari Puncak Olympus hingga Samudra Tak Terbatas, Mengukir Warisan Abadi.",
  ...
}
```

Ubah nilai `motto` sesuai slogan terbaru angkatan, lalu simpan file dan muat ulang browser. Pada objek `about.symbols`, kamu juga dapat memperbarui narasi 5 elemen filosofi logo (`trisula`, `gunung`, `ombak`, `bintang`, dan `tulisan`).

---

## 3. Cara Menambah atau Mengganti Foto Galeri Kegiatan

1. Simpan foto kegiatan ke dalam folder `assets/gallery/`.
2. Buka [`data.js`](file:///home/sena/Projects/Olympus/data.js) dan cari bagian `gallery: [ ... ]`.
3. Tambahkan atau ubah objek galeri:
   ```javascript
   {
     id: "gal-7",
     title: "Malam Inagurasi Olympus Legacy",
     category: "Inagurasi Angkatan",
     date: "Desember MMXXVI",
     image: "assets/gallery/inagurasi.jpg",
     caption: "Deskripsi singkat kegiatan...",
     credit: "Dokumentasi Kominfo Olympus Legacy"
   }
   ```

---

## 4. Cara Mengedit Pertanyaan & Bobot Skor Kuis 12 Dewa Olympus

Buka [`quizData.js`](file:///home/sena/Projects/Olympus/quizData.js):
- Bagian `gods` menyimpan deskripsi, simbol SVG, kelebihan, kelemahan bercanda, rekomendasi divisi, dan pasangan duet untuk ke-12 dewa (`zeus`, `hera`, `poseidon`, `demeter`, `athena`, `apollo`, `artemis`, `ares`, `aphrodite`, `hephaestus`, `hermes`, `dionysus`).
- Bagian `questions` menyimpan 8 pertanyaan beserta 4 pilihan jawaban dan bobot `points` (1 sampai 3 poin ke 1–3 dewa pada setiap opsi).
