/**
 * ============================================================================
 * DATA KUIS KEPRIBADIAN: "KAMU DEWA OLYMPUS YANG MANA?"
 * OLYMPUS LEGACY · PSTI UPI MMXXVI (2026)
 * ============================================================================
 *
 * Cara Edit:
 * - `gods`: Berisi 12 Dewa Olympus beserta simbol SVG, deskripsi santai,
 *   2 kelebihan, 1 kelemahan bercanda, rekomendasi divisi, dan pasangan duet.
 * - `questions`: Berisi 8 pertanyaan situasi anak kuliah. Setiap pilihan
 *   memiliki objek `points` yang menambahkan bobot (1–3 poin) ke 1–3 dewa.
 * - `cohortDistribution`: Data awal statistik "Dewa Angkatan" (bisa dihubungkan
 *   ke Firebase Realtime Database / Firestore jika ingin sinkronisasi live).
 * ============================================================================
 */

window.OLYMPUS_QUIZ_DATA = {
  // 12 Dewa Olympus
  gods: {
    zeus: {
      id: "zeus",
      name: "Zeus",
      epithet: "Sang Penguasa Langit & Pemegang Petir Keputusan",
      symbolName: "Petir Kilat (Fulmen)",
      effect: "lightning",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M36 6L14 34h16l-4 24 24-28H34L36 6z"/><path d="M10 18l6 2M54 46l-6-2M48 14l-4 4M16 50l4-4"/></svg>`,
      description:
        "Kamu adalah tipe natural leader yang kalau di rapat angkatan suaranya paling didengar. Saat yang lain masih bingung mau mulai dari mana, kamu udah bagi-bagi tugas dengan tegas sambil tetep santai ngopi.",
      strengths: [
        "Berani ambil keputusan cepat di situasi genting",
        "Punya wibawa alami yang bikin satu tim gerak bareng"
      ],
      weakness:
        "Kadang saking semangatnya ngatur strategi, lupa kalau temen sekelompoknya belum makan siang.",
      recommendedDivision: "Ketua Angkatan / Inti",
      RecommendedDivisionReason:
        "Visi besarmu dan ketegasanmu cocok banget memegang komando utama seperti Rafa di pucuk Olympus Legacy.",
      partnerGod: "Athena",
      partnerReason:
        "Keputusan kilatmu bakal makin tak terkalahkan kalau dipadukan sama taktik rapi dan catatan detail dari Athena."
    },

    hera: {
      id: "hera",
      name: "Hera",
      epithet: "Sang Penjaga Takhta & Harmoni Keluarga",
      symbolName: "Mahkota Bintang & Merak Agung",
      effect: "radiance",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 46h44l-4-24-11 10-7-16-7 16-11-10-4 24z"/><path d="M10 52h44"/><circle cx="32" cy="10" r="2.5"/><circle cx="17" cy="16" r="2"/><circle cx="47" cy="16" r="2"/></svg>`,
      description:
        "Kamu adalah perekat utama angkatan. Kalau ada jadwal bentrok atau miskom antar-divisi, kamu yang paling sigap ngerapiin suasana dengan elegan tanpa bikin keributan baru.",
      strengths: [
        "Sangat loyal dan peduli pada keutuhan tim jangka panjang",
        "Peka membaca situasi sosial dan menjaga standar kerja tetap tinggi"
      ],
      weakness:
        "Kalau ada yang ngilang tanpa kabar pas kerja kelompok, senyummu tetap ramah tapi tatapanmu langsung berubah jadi mode sidang skripsi.",
      recommendedDivision: "Wakil Ketua / Humas Internal",
      RecommendedDivisionReason:
        "Ketenangan dan keteguhanmu menjaga keutuhan internal sangat selaras dengan peran Wakil Ketua maupun Humas Internal.",
      partnerGod: "Zeus",
      partnerReason:
        "Saat Zeus melesat terlalu cepat di depan, kamulah penyeimbang yang memastikan seluruh barisan tetap utuh."
    },

    poseidon: {
      id: "poseidon",
      name: "Poseidon",
      epithet: "Sang Penakluk Samudra & Pemegang Trisula",
      symbolName: "Trisula Samudra (Tridens)",
      effect: "waves",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 8v48"/><path d="M18 14v10c0 8 6 12 14 12s14-4 14-12V14"/><path d="M32 8l-4 5m4-5l4 5"/><path d="M18 14l-4 4m4-4l4 4"/><path d="M46 14l-4 4m4-4l4 4"/><path d="M12 56c5-4 10-4 15 0s10 4 15 0 10-4 10 0"/></svg>`,
      description:
        "Sesuai lambang utama Olympus Legacy! Dari luar kamu kelihatan kalem kayak laut teduh, tapi begitu ada tantangan besar atau proyek mendadak, energimu langsung menggulung kayak ombak pasang.",
      strengths: [
        "Adaptif banget menghadapi perubahan situasi yang serba mendadak",
        "Punya intuisi kuat dan solidaritas tinggi buat pasang badan demi teman"
      ],
      weakness:
        "Mood-nya kadang ngikutin pasang surut air laut·jam 10 pagi siap menaklukkan dunia, jam 2 siang pengen rebahan dengerin hujan.",
      recommendedDivision: "Inti / Humas Internal",
      RecommendedDivisionReason:
        "Sebagai jiwa dari lambang Trisula Olympus, kamu cocok menjadi motor penggerak solidaritas angkatan.",
      partnerGod: "Demeter",
      partnerReason:
        "Arus besarmu yang dinamis akan sangat stabil saat berpadu dengan ketenangan dan konsistensi Demeter."
    },

    demeter: {
      id: "demeter",
      name: "Demeter",
      epithet: "Sang Penjaga Kemakmuran & Keteraturan",
      symbolName: "Tangkai Gandum Emas",
      effect: "radiance",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 58V12"/><path d="M32 20c-8-2-12-8-10-14 6 2 10 8 10 14z"/><path d="M32 20c8-2 12-8 10-14-6 2-10 8-10 14z"/><path d="M32 32c-9-2-13-8-11-14 7 2 11 8 11 14z"/><path d="M32 32c9-2 13-8 11-14-7 2-11 8-11 14z"/><path d="M32 44c-9-2-13-8-11-14 7 2 11 8 11 14z"/><path d="M32 44c9-2 13-8 11-14-7 2-11 8-11 14z"/></svg>`,
      description:
        "Kamu adalah sosok paling suportif dan telaten di tongkrongan. Urusan logistik, kas angkatan, sampai ngingetin temen buat kumpulin tugas tepat waktu·semuanya aman di tanganmu.",
      strengths: [
        "Sangat terorganisir, sabar, dan bisa diandalkan dalam jangka panjang",
        "Selalu memastikan sumber daya tim cukup dan tidak ada anggota yang tertinggal"
      ],
      weakness:
        "Dompet dan tasmu mirip kantong ajaib: dari tisu, charger, sampai catatan pengeluaran kas tiga bulan lalu semuanya ada.",
      recommendedDivision: "Bendahara",
      RecommendedDivisionReason:
        "Ketelitian dan rasa tanggung jawabmu mengelola sumber daya bersama membuatmu sangat pas di Bendahara.",
      partnerGod: "Poseidon",
      partnerReason:
        "Ketenanganmu merawat fondasi tim memberi pijakan kokoh bagi ide-ide berani milik Poseidon."
    },

    athena: {
      id: "athena",
      name: "Athena",
      epithet: "Sang Dewi Kebijaksanaan, Taktik & Arsitektur Logika",
      symbolName: "Burung Hantu & Perisai Aegis",
      effect: "radiance",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="26" r="6"/><circle cx="40" cy="26" r="6"/><circle cx="24" cy="26" r="1.5" fill="currentColor"/><circle cx="40" cy="26" r="1.5" fill="currentColor"/><path d="M32 30l-3 5h6l-3-5z"/><path d="M16 16c4 4 8 4 16 4s12 0 16-4c2 10 2 28-16 38C14 44 14 26 16 16z"/></svg>`,
      description:
        "Otak strategisnya angkatan! Sebelum orang lain buka laptop, kamu udah punya struktur folder, timeline kerja, dan rencana cadangan A sampai Z. Analisismu tajam dan selalu berbasis data.",
      strengths: [
        "Pemikir sistematis yang jago menyederhanakan masalah rumit",
        "Objektif, adil, dan selalu punya solusi paling masuk akal saat rapat buntu"
      ],
      weakness:
        "Hobi merapikan format dokumen atau Google Docs orang lain jam 1 pagi karena geregetan lihat margin yang miring.",
      recommendedDivision: "Sekretaris / Sub-Divisi Website",
      RecommendedDivisionReason:
        "Ketajaman logika dan kerapian administrasimu adalah tulang punggung utama Sekretaris maupun arsitektur Website.",
      partnerGod: "Hephaestus",
      partnerReason:
        "Ketika cetak biru strategimu bertemu kemampuan eksekusi teknis Hephaestus, proyek seberat apa pun pasti beres."
    },

    apollo: {
      id: "apollo",
      name: "Apollo",
      epithet: "Sang Dewa Cahaya, Harmoni Visual & Estetika",
      symbolName: "Kecapi Emas (Lyra) & Surya",
      effect: "radiance",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14c-6 10-4 26 4 32h16c8-6 10-22 4-32"/><path d="M16 46h32"/><path d="M22 52h20"/><path d="M28 18v28M32 18v28M36 18v28"/><path d="M16 14h8M40 14h8"/></svg>`,
      description:
        "Semua yang lewat tanganmu otomatis kelihatan estetik dan berkelas. Kamu punya selera visual, musik, dan gaya komunikasi yang bikin suasana angkatan selalu cerah dan inspiratif.",
      strengths: [
        "Punya mata artistik yang tajam untuk warna, tipografi, dan komposisi",
        "Komunikator hangat yang mudah mencairkan suasana di berbagai forum"
      ],
      weakness:
        "Bisa ngabisin waktu 45 menit cuma buat milih dua kombinasi font yang menurut orang lain bentuknya sama persis.",
      recommendedDivision: "Sub-Divisi Editing (Kominfo)",
      RecommendedDivisionReason:
        "Kepekaan visual dan seleramu yang tinggi adalah kunci di balik identitas kreatif Sub-Divisi Editing.",
      partnerGod: "Artemis",
      partnerReason:
        "Artemis menangkap momen mentah terbaik di lapangan, dan kamu menyulapnya menjadi mahakarya visual yang utuh."
    },

    artemis: {
      id: "artemis",
      name: "Artemis",
      epithet: "Sang Pemburu Momen & Penjaga Fokus Malam",
      symbolName: "Busur Perak & Bulan Sabit",
      effect: "waves",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10c16 8 16 36 0 44"/><path d="M22 10v44"/><path d="M12 32h38"/><path d="M42 24l8 8-8 8"/></svg>`,
      description:
        "Mandiri, jeli, dan selalu tepat sasaran. Kamu nggak suka banyak basa-basi, tapi matamu paling cepat menangkap detail kecil dan momen berharga yang sering dilewatkan orang lain.",
      strengths: [
        "Fokus luar biasa tinggi dan sangat mandiri dalam menyelesaikan tanggung jawab",
        "Pengamat ulung yang peka menangkap momen autentik tanpa dibuat-buat"
      ],
      weakness:
        "Di kamera HP-mu ada ratusan foto bagus temen-temen angkatan, tapi foto dirimu sendiri cuma ada tiga.",
      recommendedDivision: "Sub-Divisi Dokumentasi (Kominfo)",
      RecommendedDivisionReason:
        "Ketajaman bidikan dan kepekaanmu membaca momen menjadikanmu ujung tombak Sub-Divisi Dokumentasi.",
      partnerGod: "Apollo",
      partnerReason:
        "Layaknya kembar penjaga bulan dan matahari, bidikan dokumentasimu dan sentuhan editing Apollo adalah duet sempurna."
    },

    ares: {
      id: "ares",
      name: "Ares",
      epithet: "Sang Pelopor Keberanian & Eksekutor Lapangan",
      symbolName: "Tombak & Perisai Garda Depan",
      effect: "lightning",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="32" cy="34" r="18"/><circle cx="32" cy="34" r="8"/><path d="M14 52L50 12"/><path d="M38 12h12v12"/></svg>`,
      description:
        "Tipe orang yang pantang mundur kalau udah menyangkut nama baik angkatan. Saat tim butuh orang buat maju presentasi duluan atau negosiasi hal sulit, tanganmu yang pertama terangkat.",
      strengths: [
        "Penuh energi, berani ambil inisiatif, dan tahan banting di bawah tekanan",
        "To-the-point dan selalu siap membela rekan satu tim kapan pun dibutuhkan"
      ],
      weakness:
        "Kalau kode program error terus, kadang pengen rasanya ngajak duel compiler-nya secara langsung.",
      recommendedDivision: "Humas Eksternal / Inti",
      RecommendedDivisionReason:
        "Keberanian tampil di garis depan dan mental baja sangat dibutuhkan untuk membuka jalan di Humas Eksternal maupun Inti.",
      partnerGod: "Aphrodite",
      partnerReason:
        "Ketegasanmu yang berapi-api menjadi jauh lebih persuasif ketika diimbangi diplomasi halus milik Aphrodite."
    },

    aphrodite: {
      id: "aphrodite",
      name: "Aphrodite",
      epithet: "Sang Dewi Empati, Pesona & Keindahan Relasi",
      symbolName: "Kerang Mutiara Samudra",
      effect: "waves",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 50c-14 0-22-12-20-26 4-8 12-12 20-12s16 4 20 12c2 14-6 26-20 26z"/><path d="M32 50L20 20M32 50V14M32 50l12-30"/><path d="M22 54h20"/></svg>`,
      description:
        "Kamu punya kecerdasan emosional dan daya tarik komunikasi yang bikin orang baru langsung nyaman ngobrol. Di mana ada kamu, suasana kaku langsung berubah jadi akrab dan penuh apresiasi.",
      strengths: [
        "Empati tinggi dan sangat piawai membangun kesan pertama yang berkesan",
        "Punya cita rasa estetika yang menghidupkan karya maupun hubungan sosial"
      ],
      weakness:
        "Niat awalnya cuma mau bahas tugas 15 menit di kafe, tapi keterusan curhat dan foto-foto sampai kafe mau tutup.",
      recommendedDivision: "Humas Internal / Sub-Divisi Editing",
      RecommendedDivisionReason:
        "Kemampuanmu merangkul hati orang lain dan kepekaan estetika sangat hidup di Humas maupun Editing.",
      partnerGod: "Ares",
      partnerReason:
        "Kamu menghadirkan kehangatan diplomasi yang melengkapi keberanian langkah Ares di lapangan."
    },

    hephaestus: {
      id: "hephaestus",
      name: "Hephaestus",
      epithet: "Sang Arsitek Tempaan & Mahaguru Rekayasa Teknologi",
      symbolName: "Palu Tempa & Roda Gigi Digital",
      effect: "lightning",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 16h28l6 8-6 8H18v-16z"/><path d="M32 32v24"/><path d="M24 56h16"/><path d="M12 24h6"/></svg>`,
      description:
        "Sang problem-solver sejati anak PSTI! Kamu lebih suka berbicara lewat karya nyata daripada janji manis. Kasih kamu kopi, waktu tenang, dan spesifikasi yang jelas·tiba-tiba website atau sistemnya udah jadi.",
      strengths: [
        "Sangat terampil secara teknis, tekun, dan pantang menyerah membedah bug",
        "Mampu mengubah konsep abstrak menjadi produk digital yang benar-benar berfungsi"
      ],
      weakness:
        "Jam tidur sering bergeser mengikuti zona waktu server Eropa gara-gara nanggung benerin satu fitur lagi.",
      recommendedDivision: "Sub-Divisi Website (Kominfo)",
      RecommendedDivisionReason:
        "Keahlian merakit kode, ketekunan teknis, dan kecintaanmu membangun produk adalah DNA murni Sub-Divisi Website.",
      partnerGod: "Athena",
      partnerReason:
        "Arsitektur sistem yang dirancang Athena dan ditempa langsung oleh tanganmu akan menghasilkan mahakarya teknologi."
    },

    hermes: {
      id: "hermes",
      name: "Hermes",
      epithet: "Sang Duta Cakrawala & Penjelajah Jejaring",
      symbolName: "Sayap Kecepatan (Talaria)",
      effect: "waves",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 10v44"/><circle cx="32" cy="10" r="3"/><path d="M32 22c-10-8-20-6-22 2 8 0 14 2 22 8"/><path d="M32 22c10-8 20-6 22 2-8 0-14 2-22 8"/><path d="M22 48c4-4 16-4 20 0s-16 8-20 0z"/></svg>`,
      description:
        "Gesit, serba tahu info kampus terbaru, dan kenal orang dari berbagai jurusan. Kamu adalah jembatan komunikasi yang bikin Olympus Legacy dikenal luas di seluruh penjuru UPI.",
      strengths: [
        "Cepat tanggap, luwes bernegosiasi, dan punya jaringan pertemanan super luas",
        "Cerdas mencari celah solusi kreatif saat jalan biasa sedang macet"
      ],
      weakness:
        "Saking banyaknya agenda dan grup yang diikuti, kadang bisa muncul di tiga tempat berbeda dalam satu sore.",
      recommendedDivision: "Humas Eksternal",
      RecommendedDivisionReason:
        "Kelincahan komunikasi dan kemampuanmu membangun relasi lintas batas menjadikanmu duta terbaik Humas Eksternal.",
      partnerGod: "Apollo",
      partnerReason:
        "Karya keren yang dipoles Apollo akan menjangkau audiens paling luas lewat jaringan cepat milikmu."
    },

    dionysus: {
      id: "dionysus",
      name: "Dionysus",
      epithet: "Sang Penjaga Semangat & Perayaan Kebersamaan",
      symbolName: "Piala Perjamuan & Sulur Kehidupan",
      effect: "radiance",
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 12h28c0 14-6 22-14 22S18 26 18 12z"/><path d="M32 34v18"/><path d="M20 52h24"/><path d="M14 18c-4 0-6 4-4 8s6 4 10 2"/><path d="M50 18c4 0 6 4 4 8s-6 4-10 2"/></svg>`,
      description:
        "Nyawa dari setiap kumpul angkatan! Di tengah tumpukan laporan praktikum dan tugas koding yang bikin pusing, kehadiranmu selalu berhasil mengembalikan tawa dan semangat hidup teman-teman.",
      strengths: [
        "Spontan, kreatif, dan jago menghidupkan suasana agar tidak kaku",
        "Bikin setiap orang merasa diterima apa adanya tanpa sekat canggung"
      ],
      weakness:
        "Kalau bilang 'ayo ngumpul sebentar aja habis kelas', definisi sebentarnya bisa sampai warung langganan tutup.",
      recommendedDivision: "Humas Internal / Sub-Divisi Dokumentasi",
      RecommendedDivisionReason:
        "Energi hangatmu merawat kebahagiaan kolektif sangat dibutuhkan untuk menjaga ikatan Humas Internal tetap hidup.",
      partnerGod: "Hera",
      partnerReason:
        "Kreativitas spontanmu yang bebas akan terarah dengan manis saat dijaga oleh struktur rapi dari Hera."
    }
  },

  // 8 Pertanyaan Kepribadian (Bahasa Santai Anak Kuliah)
  questions: [
    {
      id: 1,
      topic: "Gaya Saat Kerja Kelompok",
      question: "Dosen baru aja bagi kelompok buat proyek besar akhir semester. Hal pertama yang otomatis kamu lakuin adalah...",
      options: [
        {
          label: "Langsung bikin grup, pimpin pembagian jobdesk, dan tentuin target mingguan biar jelas.",
          points: { zeus: 3, ares: 2, hera: 1 }
        },
        {
          label: "Bikin struktur dokumen, template laporan, sama jadwal timeline yang rapi dari sekarang.",
          points: { athena: 3, demeter: 2, hera: 1 }
        },
        {
          label: "Langsung ngulik bagian teknis/koding atau desain visualnya karena lebih suka langsung eksekusi.",
          points: { hephaestus: 3, apollo: 2, artemis: 1 }
        },
        {
          label: "Cairin suasana grup dulu, cari referensi dari kakak tingkat, dan pastiin semua anggota nyaman ngobrol.",
          points: { hermes: 3, dionysus: 2, aphrodite: 2 }
        }
      ]
    },
    {
      id: 2,
      topic: "Reaksi Saat Deadline Mepet",
      question: "Besok pagi jam 08.00 batas kumpul tugas besar, tapi malam ini tiba-tiba ada bagian yang error. Reaksi jujurmu?",
      options: [
        {
          label: "Tarik napas, pasang headset, bedah baris kodenya satu-satu sampai ketemu akar masalahnya malam ini juga.",
          points: { hephaestus: 3, athena: 2, artemis: 2 }
        },
        {
          label: "Koordinasi cepat: bagi ulang tugas ke temen yang masih bangun biar beban selesai bareng-bareng.",
          points: { zeus: 3, poseidon: 2, ares: 2 }
        },
        {
          label: "Siapin kopi dan camilan buat tim, semangatin grup biar nggak panik, sambil bantu rapihin bagian yang bisa diselamatkan.",
          points: { demeter: 3, dionysus: 2, aphrodite: 1 }
        },
        {
          label: "Hubungi temen kelas lain buat diskusi solusi tercepat sambil poles tampilan presentasinya biar tetep meyakinkan.",
          points: { hermes: 3, apollo: 2, poseidon: 1 }
        }
      ]
    },
    {
      id: 3,
      topic: "Peran di Tongkrongan Angkatan",
      question: "Pas lagi ngumpul bareng anak-anak Olympus Legacy habis kelas sore, kamu biasanya jadi tipe yang mana?",
      options: [
        {
          label: "Pemantik obrolan seru dan pencair suasana yang bikin satu meja ketawa lepas.",
          points: { dionysus: 3, hermes: 2, aphrodite: 1 }
        },
        {
          label: "Pendengar yang asik, sesekali motret candid temen-temen atau merhatiin hal unik di sekitar.",
          points: { artemis: 3, poseidon: 2, hephaestus: 1 }
        },
        {
          label: "Yang ngatur mau makan di mana, ngitungin patungan bayar di kasir, dan pastiin nggak ada barang temen yang ketinggalan.",
          points: { hera: 3, demeter: 3, athena: 1 }
        },
        {
          label: "Yang ngajak diskusi ide kegiatan angkatan berikutnya atau bahas tren desain & teknologi terbaru.",
          points: { zeus: 2, apollo: 3, ares: 2 }
        }
      ]
    },
    {
      id: 4,
      topic: "Cara Menghadapi Konflik",
      question: "Kalau lagi ada beda pendapat yang lumayan panas waktu musyawarah angkatan, sikapmu adalah...",
      options: [
        {
          label: "Tampil di tengah buat mediasi dari hati ke hati supaya nggak ada yang baper setelah rapat selesai.",
          points: { aphrodite: 3, hera: 2, dionysus: 1 }
        },
        {
          label: "Bedah pro-kontra tiap argumen pakai logika objektif dan data supaya keputusannya adil buat semua.",
          points: { athena: 3, zeus: 2, demeter: 1 }
        },
        {
          label: "Berani nyuarain pendapat secara jujur dan tegas supaya masalahnya langsung tuntas di tempat, nggak dipendam.",
          points: { ares: 3, poseidon: 2, zeus: 1 }
        },
        {
          label: "Lempar alternatif jalan tengah yang segar sambil mencairkan ketegangan dengan humor tipis-tipis.",
          points: { hermes: 3, apollo: 2, poseidon: 1 }
        }
      ]
    },
    {
      id: 5,
      topic: "Gaya Belajar Menjelang Ujian",
      question: "Minggu depan udah masuk pekan UTS/UAS di PSTI. Gaya belajarmu yang paling menggambarkan diri kamu adalah...",
      options: [
        {
          label: "Bikin rangkuman materi yang terstruktur rapi, lengkap dengan highlight warna-warni yang enak dibaca.",
          points: { athena: 2, apollo: 3, hera: 2 }
        },
        {
          label: "Langsung praktik ngoding atau kerjain soal-soal studi kasus di tempat sepi tanpa gangguan siapa pun.",
          points: { artemis: 3, hephaestus: 3, ares: 1 }
        },
        {
          label: "Belajar bareng satu tongkrongan: saling tanya-jawab, bagi catatan, dan bahas kisi-kisi rame-rame.",
          points: { demeter: 2, dionysus: 3, hermes: 2 }
        },
        {
          label: "Fokus kuasai konsep besarnya dulu, lalu siap jadi tempat tanya temen-temen yang masih bingung.",
          points: { poseidon: 3, zeus: 2, aphrodite: 2 }
        }
      ]
    },
    {
      id: 6,
      topic: "Tipe Orang di Grup Chat Angkatan",
      question: "Di grup WhatsApp/Discord Olympus Legacy yang lagi rame, jejak digitalmu biasanya berupa...",
      options: [
        {
          label: "Pengumuman penting, rekap hasil rapat, atau polling penentuan jadwal kumpul.",
          points: { zeus: 3, hera: 3, athena: 1 }
        },
        {
          label: "Terusan info lomba, beasiswa, berita kampus terbaru, atau stiker lucu yang pas banget sama situasi.",
          points: { hermes: 3, dionysus: 2, ares: 1 }
        },
        {
          label: "Kirim link Google Drive dokumentasi foto/video, desain poster yang baru beres, atau link repo GitHub.",
          points: { artemis: 2, apollo: 2, hephaestus: 3 }
        },
        {
          label: "Apresiasi karya temen, ngingetin deadline kas/tugas dengan ramah, dan nyambut obrolan biar nggak sepi.",
          points: { aphrodite: 3, demeter: 3, poseidon: 1 }
        }
      ]
    },
    {
      id: 7,
      topic: "Hobi di Waktu Luang",
      question: "Kalau lagi libur akhir pekan dan nggak ada tugas kuliah, cara favoritmu buat nge-charge energi adalah...",
      options: [
        {
          label: "Ngulik side-project web, rakit sesuatu, atau eksplor tools digital baru sampai lupa waktu.",
          points: { hephaestus: 3, athena: 2, apollo: 1 }
        },
        {
          label: "Hunting foto jalanan, olahraga, naik gunung, atau motoran cari udara segar di luar.",
          points: { artemis: 3, ares: 3, poseidon: 2 }
        },
        {
          label: "Dengerin kurasi playlist musik, desain visual, nonton film estetik, atau nongkrong di kafe nyaman.",
          points: { apollo: 3, aphrodite: 3, dionysus: 2 }
        },
        {
          label: "Quality time bareng keluarga/sahabat dekat, beresin kamar, dan nyiapin rencana minggu depan dengan tenang.",
          points: { hera: 2, demeter: 3, zeus: 1 }
        }
      ]
    },
    {
      id: 8,
      topic: "Sifat Utama Diri",
      question: "Terakhir! Kalau temen-temen Olympus Legacy diminta mendeskripsikan kamu dalam satu kalimat, mereka bakal bilang kamu itu...",
      options: [
        {
          label: "Sosok berwibawa dan pemberani yang selalu siap memimpin di tengah badai sekalipun.",
          points: { zeus: 2, poseidon: 3, ares: 2 }
        },
        {
          label: "Pemikir cerdas dan pekerja teknis andalan yang hasil kerjanya selalu rapi dan presisi.",
          points: { athena: 2, hephaestus: 2, artemis: 2 }
        },
        {
          label: "Jiwa kreatif dan komunikator luwes yang bikin setiap acara maupun karya angkatan jadi hidup.",
          points: { apollo: 2, hermes: 2, dionysus: 2 }
        },
        {
          label: "Penjaga kehangatan keluarga yang setia, telaten, dan selalu bikin orang lain merasa dihargai.",
          points: { hera: 2, demeter: 2, aphrodite: 2 }
        }
      ]
    }
  ],

  // Statistik Fun Fact "Dewa Angkatan" (Data awal 35 anggota, otomatis bertambah saat kuis dimainkan)
  cohortDistribution: [
    { godId: "hephaestus", count: 6, note: "Dominan di Sub-Divisi Website & pengulik koding" },
    { godId: "athena", count: 5, note: "Para perancang strategi & penjaga arsip Sekretaris" },
    { godId: "hermes", count: 4, note: "Para duta jejaring Humas Eksternal" },
    { godId: "apollo", count: 4, note: "Kreator visual & penjaga estetika Editing" },
    { godId: "artemis", count: 4, note: "Para pemburu momen autentik Dokumentasi" },
    { godId: "poseidon", count: 3, note: "Penjaga solidaritas & arus utama angkatan" },
    { godId: "zeus", count: 2, note: "Nakhoda pengambil keputusan strategis" },
    { godId: "hera", count: 2, note: "Penjaga harmoni dan keteraturan internal" },
    { godId: "demeter", count: 2, note: "Pengelola sumber daya & kas Bendahara" },
    { godId: "aphrodite", count: 1, note: "Perekat empati & kehangatan keluarga" },
    { godId: "ares", count: 1, note: "Garda depan penuh keberanian" },
    { godId: "dionysus", count: 1, note: "Sumber tawa & perayaan kebersamaan" }
  ]
};
