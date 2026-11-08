/**
 * ============================================================================
 * DATA UTAMA WEBSITE OLYMPUS LEGACY · PSTI UPI MMXXVI (2026)
 * ============================================================================
 *
 * PANDUAN SINGKAT CARA MENGEDIT DATA ANGGOTA:
 * 1. Mengganti Foto Anggota:
 *    - Masukkan file foto (format .jpg, .png, atau .webp) ke dalam folder:
 *      `assets/members/` (contoh: `assets/members/rafa.jpg`).
 *    - Ubah nilai properti `photo` pada anggota terkait di bawah ini menjadi
 *      path file tersebut, misalnya: `photo: "assets/members/rafa.jpg"`.
 *    - Jika `photo` dikosongkan (`""`), website otomatis menampilkan avatar
 *      inisial nama dengan latar navy khas Olympus Legacy.
 *
 * 2. Mengganti Kutipan (Quote):
 *    - Ubah teks di dalam properti `quote: "..."` pada masing-masing anggota.
 *
 * 3. Mengganti Link Instagram:
 *    - Ubah nilai `instagram` menjadi username (contoh: `"@rafa.olympus"`)
 *      dan `instagramUrl` menjadi URL lengkap (contoh: `"https://instagram.com/username"`).
 * ============================================================================
 */

window.OLYMPUS_DATA = {
  // 1. Informasi Umum Angkatan
  cohort: {
    name: "OLYMPUS LEGACY",
    origin: "PSTI UPI",
    fullOrigin: "Pendidikan Sistem dan Teknologi Informasi · Universitas Pendidikan Indonesia",
    yearRoman: "MMXXVI",
    yearNumeric: 2026,
    motto: "Dari Puncak Olympus hingga Samudra Tak Terbatas, Mengukir Warisan Abadi.",
    subMotto:
      "Tiga puluh lima penjaga karsa yang dipersatukan oleh teknologi, persaudaraan, dan tekad untuk meninggalkan jejak bermakna di PSTI UPI.",
    logo: "assets/logo.png",
    stats: [
      {
        value: 35,
        suffix: "",
        label: "Penjaga Karsa",
        detail: "Mahasiswa aktif angkatan MMXXVI yang tergabung dalam satu keluarga utuh."
      },
      {
        value: 6,
        suffix: "",
        label: "Pilar Kepengurusan",
        detail: "Ketua, Wakil, Sekretaris, Bendahara, Humas, dan Kominfo dalam satu simfoni."
      },
      {
        value: 5,
        suffix: "",
        label: "Sub-Divisi Spesialis",
        detail: "Internal, Eksternal, Dokumentasi, Editing, dan Website yang saling menopang."
      },
      {
        value: 12,
        suffix: "",
        label: "Agenda & Tonggak",
        detail: "Program kolektif dari orientasi perdana hingga malam inagurasi angkatan."
      }
    ]
  },

  // 2. Tentang Angkatan, Makna Logo, Visi & Misi
  about: {
    meaningTitle: 'Makna Utama Logo "Olympus Legacy"',
    meaningLead:
      "Ibarat sebuah perjalanan menuju Gunung Olympus, logo ini menceritakan perjuangan kita bersama untuk mencapai puncak kesuksesan.",
    meaningParagraph:
      "Dengan keahlian yang berbeda-beda, kita saling bekerja sama untuk mendaki dan menciptakan karya nyata lewat teknologi yang berdampak bagi banyak orang, selalu berpegang teguh pada Tri Dharma Perguruan Tinggi.",
    symbols: [
      {
        id: "trisula",
        name: "Trisula (Di Tengah)",
        latin: "Tri Dharma Perguruan Tinggi",
        description:
          'Ini ibarat "senjata" atau pegangan utama kita. Tiga ujungnya melambangkan Tri Dharma Perguruan Tinggi (Pendidikan, Penelitian, dan Pengabdian). Artinya, semua tindakan dan karya kita selalu berpusat pada tiga hal tersebut.'
      },
      {
        id: "gunung",
        name: "Gunung Jaringan",
        latin: "Olympus & Sistem Informasi",
        description:
          "Gambar gunung melambangkan Olympus, tempat kita berpijak. Kalau diperhatikan, gunung ini dibentuk dari garis-garis yang saling menyambung mirip jaringan sistem, menandakan identitas kita sebagai anak teknologi atau sistem informasi."
      },
      {
        id: "ombak",
        name: "Gelombang Air (Di Bawah)",
        latin: "Persatuan & Manfaat",
        description:
          "Air selalu menyatukan berbagai aliran menjadi satu arus yang kuat. Maknanya, walaupun kita punya kelebihan dan latar belakang yang berbeda-beda, saat kita bersatu, kekuatan kita akan sangat besar dan terus mengalir membawa manfaat."
      },
      {
        id: "bintang",
        name: "Petir & Bintang Bercahaya",
        latin: "Inovasi & Legacy",
        description:
          'Petir yang melilit trisula melambangkan energi, kekuatan, dan pergerakan inovasi teknologi kita yang cepat. Sedangkan bintang yang bersinar di puncak melambangkan "Legacy" — jejak baik, prestasi, dan warisan yang akan menerangi dan menginspirasi masa depan.'
      },
      {
        id: "tulisan",
        name: "Tulisan Melingkar",
        latin: "PSTI • MMXXVI • UPI",
        description:
          'Teks "PSTI • MMXXVI • UPI" adalah bingkai identitas kita. Ini jadi pengingat kebanggaan bahwa pergerakan dan karya hebat ini lahir dari PSTI angkatan 2026.'
      }
    ],
    vision:
      "Menjadi angkatan PSTI UPI MMXXVI yang solid, berkarakter pelopor, unggul dalam rekayasa teknologi dan pendidikan, serta meninggalkan warisan karya yang berdampak nyata bagi almamater dan masyarakat.",
    missions: [
      "Membangun ikatan kekeluargaan yang inklusif dan saling menguatkan di antara seluruh 35 anggota Olympus Legacy.",
      "Mengembangkan ekosistem kolaborasi akademik dan teknologi melalui riset, proyek digital, dan budaya berbagi ilmu.",
      "Menghadirkan tata kelola komunikasi, dokumentasi, dan hubungan eksternal angkatan yang profesional serta kreatif.",
      "Menjaga nilai etika, kepemimpinan, dan kontribusi aktif dalam setiap dinamika kemahasiswaan di lingkungan PSTI UPI."
    ]
  },

  // 3. Struktur Organisasi (Hierarki Interaktif)
  structure: {
    level1: [
      { role: "Ketua Angkatan", memberIds: ["rafa"] },
      { role: "Wakil Ketua Angkatan", memberIds: ["dania"] }
    ],
    level2: [
      {
        role: "Sekretaris",
        subtitle: "Tata Arsip, Notulensi & Administrasi Angkatan",
        memberIds: ["afni", "laura", "hanien"]
      },
      {
        role: "Bendahara",
        subtitle: "Manajemen Kas, Transparansi & Pendanaan Kegiatan",
        memberIds: ["syamsul", "salsa"]
      }
    ],
    level3: [
      {
        id: "humas",
        name: "Divisi Humas",
        tagline: "Penjaga Harmoni Internal & Duta Diplomasi Eksternal",
        subdivisions: [
          {
            id: "humas-internal",
            name: "Humas Internal",
            focus: "Merekatkan solidaritas 35 anggota, aspirasi keluarga, dan koordinasi lintas bidang.",
            memberIds: ["eva", "rico", "ikhda", "zulfadli", "deryl"]
          },
          {
            id: "humas-eksternal",
            name: "Humas Eksternal",
            focus: "Menjalin relasi antarangkatan, himpunan, pemangku kepentingan kampus, dan mitra luar.",
            memberIds: ["nazaf", "faris", "fathih", "rahma", "shaila"]
          }
        ]
      },
      {
        id: "kominfo",
        name: "Divisi Kominfo",
        tagline: "Arsitek Narasi Visual, Arsip Memori & Infrastruktur Digital",
        subdivisions: [
          {
            id: "kominfo-dokumentasi",
            name: "Sub-Divisi Dokumentasi",
            focus: "Mengabadikan setiap momen bersejarah angkatan lewat fotografi, videografi, dan kurasi arsip.",
            memberIds: ["ayu", "salma", "nazmah", "fais", "syadza", "siddiq"]
          },
          {
            id: "kominfo-editing",
            name: "Sub-Divisi Editing",
            focus: "Mengolah identitas visual, desain grafis, motion, dan publikasi kreatif Olympus Legacy.",
            memberIds: ["disa", "sania", "natasya", "wafa", "fadhil"]
          },
          {
            id: "kominfo-website",
            name: "Sub-Divisi Website",
            focus: "Merancang, membangun, dan memelihara rumah digital resmi Olympus Legacy PSTI UPI.",
            memberIds: ["sena", "selbi", "junita", "haikan", "nurul", "jovi", "aziz"]
          }
        ]
      }
    ]
  },

  // 4. Daftar Lengkap 35 Anggota (WAJIB PERSIS SESUAI DATA STRUKTUR)
  members: [
    // INTI: KETUA & WAKIL KETUA
    {
      id: "rafa",
      name: "Rafa",
      role: "Ketua Angkatan",
      division: "Inti",
      subdivision: "Ketua",
      filterGroup: "Inti",
      photo: "",
      quote: "Pemimpin bukan yang berdiri paling tinggi di puncak Olympus, tapi yang memastikan seluruh 35 rekannya tiba bersama di puncak.",
      instagram: "@rafa.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "dania",
      name: "Dania",
      role: "Wakil Ketua Angkatan",
      division: "Inti",
      subdivision: "Wakil Ketua",
      filterGroup: "Inti",
      photo: "",
      quote: "Menjaga ritme di balik layar agar setiap langkah angkatan tetap selaras dan tenang menghadapi ombak.",
      instagram: "@dania.olympus",
      instagramUrl: "https://instagram.com/"
    },

    // SEKRETARIS (3)
    {
      id: "afni",
      name: "Afni",
      role: "Sekretaris",
      division: "Sekretaris",
      subdivision: "Sekretaris",
      filterGroup: "Sekretaris",
      photo: "",
      quote: "Sejarah besar dimulai dari catatan yang rapi dan rencana yang tertata sejak hari pertama.",
      instagram: "@afni.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "laura",
      name: "Laura",
      role: "Sekretaris",
      division: "Sekretaris",
      subdivision: "Sekretaris",
      filterGroup: "Sekretaris",
      photo: "",
      quote: "Setiap detail agenda adalah benang perak yang menyatukan perjalanan kita di PSTI.",
      instagram: "@laura.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "hanien",
      name: "Hanien",
      role: "Sekretaris",
      division: "Sekretaris",
      subdivision: "Sekretaris",
      filterGroup: "Sekretaris",
      photo: "",
      quote: "Menulis jejak hari ini agar menjadi warisan yang bisa dibaca kembali di masa depan.",
      instagram: "@hanien.olympus",
      instagramUrl: "https://instagram.com/"
    },

    // BENDAHARA (2)
    {
      id: "syamsul",
      name: "Syamsul",
      role: "Bendahara",
      division: "Bendahara",
      subdivision: "Bendahara",
      filterGroup: "Bendahara",
      photo: "",
      quote: "Kepercayaan dibangun dari ketelitian angka dan keterbukaan di setiap lembar laporan.",
      instagram: "@syamsul.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "salsa",
      name: "Salsa",
      role: "Bendahara",
      division: "Bendahara",
      subdivision: "Bendahara",
      filterGroup: "Bendahara",
      photo: "",
      quote: "Mengelola sumber daya bersama supaya setiap ide besar angkatan punya bahan bakar untuk berlayar.",
      instagram: "@salsa.olympus",
      instagramUrl: "https://instagram.com/"
    },

    // HUMAS · INTERNAL (5)
    {
      id: "eva",
      name: "Eva",
      role: "Anggota Humas Internal",
      division: "Humas",
      subdivision: "Humas Internal",
      filterGroup: "Humas Internal",
      photo: "",
      quote: "Rumah yang hangat bukan karena megah bangunannya, melainkan karena tiap orang di dalamnya merasa didengar.",
      instagram: "@eva.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "rico",
      name: "Rico",
      role: "Anggota Humas Internal",
      division: "Humas",
      subdivision: "Humas Internal",
      filterGroup: "Humas Internal",
      photo: "",
      quote: "Solidaritas itu sederhana: hadir saat teman butuh dan merayakan setiap kemenangan kecil bersama.",
      instagram: "@rico.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "ikhda",
      name: "Ikhda",
      role: "Anggota Humas Internal",
      division: "Humas",
      subdivision: "Humas Internal",
      filterGroup: "Humas Internal",
      photo: "",
      quote: "Menjaga komunikasi tetap cair di tengah padatnya jadwal kuliah dan praktikum.",
      instagram: "@ikhda.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "zulfadli",
      name: "Zulfadli",
      role: "Anggota Humas Internal",
      division: "Humas",
      subdivision: "Humas Internal",
      filterGroup: "Humas Internal",
      photo: "",
      quote: "Tiga puluh lima kepala, beragam latar belakang, satu frekuensi kekeluargaan Olympus.",
      instagram: "@zulfadli.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "deryl",
      name: "Deryl",
      role: "Anggota Humas Internal",
      division: "Humas",
      subdivision: "Humas Internal",
      filterGroup: "Humas Internal",
      photo: "",
      quote: "Energi positif di dalam tim adalah kunci sebelum kita melangkah menghadapi tantangan luar.",
      instagram: "@deryl.olympus",
      instagramUrl: "https://instagram.com/"
    },

    // HUMAS · EKSTERNAL (5)
    {
      id: "nazaf",
      name: "Nazaf",
      role: "Anggota Humas Eksternal",
      division: "Humas",
      subdivision: "Humas Eksternal",
      filterGroup: "Humas Eksternal",
      photo: "",
      quote: "Membangun jembatan kolaborasi sejauh cakrawala dengan tetap membawa jati diri angkatan.",
      instagram: "@nazaf.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "faris",
      name: "Faris",
      role: "Anggota Humas Eksternal",
      division: "Humas",
      subdivision: "Humas Eksternal",
      filterGroup: "Humas Eksternal",
      photo: "",
      quote: "Setiap jabat tangan dan percakapan baru adalah pintu menuju peluang yang lebih luas.",
      instagram: "@faris.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "fathih",
      name: "Fathih",
      role: "Anggota Humas Eksternal",
      division: "Humas",
      subdivision: "Humas Eksternal",
      filterGroup: "Humas Eksternal",
      photo: "",
      quote: "Diplomasi yang baik berawal dari rasa hormat, kejelasan pesan, dan ketulusan niat.",
      instagram: "@fathih.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "rahma",
      name: "Rahma",
      role: "Anggota Humas Eksternal",
      division: "Humas",
      subdivision: "Humas Eksternal",
      filterGroup: "Humas Eksternal",
      photo: "",
      quote: "Menjadi wajah ramah Olympus Legacy yang siap bersinergi dengan seluruh elemen kampus.",
      instagram: "@rahma.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "shaila",
      name: "Shaila",
      role: "Anggota Humas Eksternal",
      division: "Humas",
      subdivision: "Humas Eksternal",
      filterGroup: "Humas Eksternal",
      photo: "",
      quote: "Merangkai jejaring hari ini untuk memperluas dampak karya kita esok hari.",
      instagram: "@shaila.olympus",
      instagramUrl: "https://instagram.com/"
    },

    // KOMINFO · DOKUMENTASI (6)
    {
      id: "ayu",
      name: "Ayu",
      role: "Anggota Dokumentasi",
      division: "Kominfo",
      subdivision: "Dokumentasi",
      filterGroup: "Dokumentasi",
      photo: "",
      quote: "Membekukan detik-detik berharga agar tawa dan perjuangan kita tidak lekang oleh waktu.",
      instagram: "@ayu.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "salma",
      name: "Salma",
      role: "Anggota Dokumentasi",
      division: "Kominfo",
      subdivision: "Dokumentasi",
      filterGroup: "Dokumentasi",
      photo: "",
      quote: "Di balik setiap foto angkatan, ada cerita tentang proses panjang yang layak dikenang.",
      instagram: "@salma.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "nazmah",
      name: "Nazmah",
      role: "Anggota Dokumentasi",
      division: "Kominfo",
      subdivision: "Dokumentasi",
      filterGroup: "Dokumentasi",
      photo: "",
      quote: "Menangkap cahaya paling jujur dari setiap kegiatan bersama keluarga MMXXVI.",
      instagram: "@nazmah.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "fais",
      name: "Fais",
      role: "Anggota Dokumentasi",
      division: "Kominfo",
      subdivision: "Dokumentasi",
      filterGroup: "Dokumentasi",
      photo: "",
      quote: "Lensa kamera adalah saksi bisu bagaimana 35 orang asing tumbuh menjadi satu keluarga.",
      instagram: "@fais.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "syadza",
      name: "Syadza",
      role: "Anggota Dokumentasi",
      division: "Kominfo",
      subdivision: "Dokumentasi",
      filterGroup: "Dokumentasi",
      photo: "",
      quote: "Merawat memori kolektif melalui bingkai visual yang bercerita.",
      instagram: "@syadza.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "siddiq",
      name: "Siddiq",
      role: "Anggota Dokumentasi",
      division: "Kominfo",
      subdivision: "Dokumentasi",
      filterGroup: "Dokumentasi",
      photo: "",
      quote: "Momen terbaik tidak datang dua kali; tugas kami memastikan ia abadi.",
      instagram: "@siddiq.olympus",
      instagramUrl: "https://instagram.com/"
    },

    // KOMINFO · EDITING (5)
    {
      id: "disa",
      name: "Disa",
      role: "Anggota Editing",
      division: "Kominfo",
      subdivision: "Editing",
      filterGroup: "Editing",
      photo: "",
      quote: "Menyatukan warna navy dan cahaya bintang menjadi identitas visual yang berkarakter.",
      instagram: "@disa.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "sania",
      name: "Sania",
      role: "Anggota Editing",
      division: "Kominfo",
      subdivision: "Editing",
      filterGroup: "Editing",
      photo: "",
      quote: "Desain yang baik tidak hanya memanjakan mata, tapi juga menyampaikan jiwa dari sebuah angkatan.",
      instagram: "@sania.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "natasya",
      name: "Natasya",
      role: "Anggota Editing",
      division: "Kominfo",
      subdivision: "Editing",
      filterGroup: "Editing",
      photo: "",
      quote: "Merangkai potongan rekaman dan tipografi menjadi karya yang punya ritme.",
      instagram: "@natasya.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "wafa",
      name: "Wafa",
      role: "Anggota Editing",
      division: "Kominfo",
      subdivision: "Editing",
      filterGroup: "Editing",
      photo: "",
      quote: "Estetika adalah bahasa tanpa suara yang memperkenalkan siapa itu Olympus Legacy.",
      instagram: "@wafa.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "fadhil",
      name: "Fadhil",
      role: "Anggota Editing",
      division: "Kominfo",
      subdivision: "Editing",
      filterGroup: "Editing",
      photo: "",
      quote: "Detail piksel dan transisi halus adalah bentuk dedikasi kami untuk angkatan.",
      instagram: "@fadhil.olympus",
      instagramUrl: "https://instagram.com/"
    },

    // KOMINFO · WEBSITE (7)
    {
      id: "sena",
      name: "Sena",
      role: "Anggota Website",
      division: "Kominfo",
      subdivision: "Website",
      filterGroup: "Website",
      photo: "",
      quote: "Menerjemahkan mitologi Olympus dan semangat PSTI ke dalam arsitektur kode yang hidup.",
      instagram: "@sena.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "selbi",
      name: "Selbi",
      role: "Anggota Website",
      division: "Kominfo",
      subdivision: "Website",
      filterGroup: "Website",
      photo: "",
      quote: "Antarmuka yang jernih dan aksesibel membuat cerita angkatan bisa dinikmati siapa saja.",
      instagram: "@selbi.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "junita",
      name: "Junita",
      role: "Anggota Website",
      division: "Kominfo",
      subdivision: "Website",
      filterGroup: "Website",
      photo: "",
      quote: "Merancang pengalaman interaktif yang menyatukan struktur data dan keindahan visual.",
      instagram: "@junita.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "haikan",
      name: "Haikan",
      role: "Anggota Website",
      division: "Kominfo",
      subdivision: "Website",
      filterGroup: "Website",
      photo: "",
      quote: "Setiap fungsi JavaScript yang berjalan mulus adalah kontribusi kecil untuk rumah digital kita.",
      instagram: "@haikan.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "nurul",
      name: "Nurul",
      role: "Anggota Website",
      division: "Kominfo",
      subdivision: "Website",
      filterGroup: "Website",
      photo: "",
      quote: "Menjaga kerapian struktur halaman agar warisan digital angkatan bertahan lintas tahun.",
      instagram: "@nurul.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "jovi",
      name: "Jovi",
      role: "Anggota Website",
      division: "Kominfo",
      subdivision: "Website",
      filterGroup: "Website",
      photo: "",
      quote: "Teknologi terbaik adalah yang terasa ringan digunakan namun kuat di balik layar.",
      instagram: "@jovi.olympus",
      instagramUrl: "https://instagram.com/"
    },
    {
      id: "aziz",
      name: "Aziz",
      role: "Anggota Website",
      division: "Kominfo",
      subdivision: "Website",
      filterGroup: "Website",
      photo: "",
      quote: "Dari baris HTML pertama hingga halaman ini tayang, semuanya untuk kebanggaan MMXXVI.",
      instagram: "@aziz.olympus",
      instagramUrl: "https://instagram.com/"
    }
  ],

  // 5. Galeri Kegiatan (dengan foto di folder assets/gallery/)
  gallery: [
    {
      id: "gal-1",
      title: "Sidang Perdana & Penetapan Nama Olympus Legacy",
      category: "Musyawarah Angkatan",
      date: "Agustus MMXXVI",
      image: "assets/gallery/mount-olympus-from-larissa-thessaly-greece.jpg",
      caption: "Momen bersejarah ketika 35 mahasiswa baru PSTI UPI menyepakati nama, filosofi lambang trisula, dan struktur kepengurusan angkatan MMXXVI.",
      credit: "\"Mount Olympus from Larissa, Thessaly, Greece\" · Edward Lear (The Met, CC0)"
    },
    {
      id: "gal-2",
      title: "Pelayaran Solidaritas & Malam Keakraban",
      category: "Internal & Kekeluargaan",
      date: "September MMXXVI",
      image: "assets/gallery/ocean-waves-crashing-on-dark-rocks-and.jpg",
      caption: "Forum lintas divisi untuk menyatukan visi dari Ketua, Sekretaris, Bendahara, Humas, hingga Kominfo dalam suasana hangat.",
      credit: "\"Ocean waves crashing on dark rocks\" · Sergei Gussev (Wikimedia Commons, CC BY 2.0)"
    },
    {
      id: "gal-3",
      title: "Lokakarya Rekayasa Web & Arsitektur Digital",
      category: "Akademik & Kominfo",
      date: "Oktober MMXXVI",
      image: "assets/gallery/star-chart-of-centaurus-constellation-highlighting-pds.jpg",
      caption: "Sesi kolaborasi Sub-Divisi Website, Editing, dan Dokumentasi dalam merancang identitas digital serta repositori karya angkatan.",
      credit: "\"Star chart of Centaurus constellation\" · ESO, IAU & Sky & Telescope (CC BY 4.0)"
    },
    {
      id: "gal-4",
      title: "Dialog Eksternal & Kunjungan Antarangkatan PSTI",
      category: "Humas & Relasi",
      date: "Oktober MMXXVI",
      image: "assets/gallery/concourse-of-the-gods-on-mount-olympus.jpg",
      caption: "Pertemuan bersama kakak tingkat dan himpunan mahasiswa untuk memperkuat jejaring keilmuan serta budaya organisasi di lingkungan UPI.",
      credit: "\"Concourse of the Gods on Mount Olympus\" · Cornelis Cort, 1565 (The Met, CC0)"
    },
    {
      id: "gal-5",
      title: "Ekspedisi Visual & Kurasi Memori Semester Ganjil",
      category: "Dokumentasi & Karya",
      date: "November MMXXVI",
      image: "assets/gallery/barks-fleeing-before-the-storm.jpg",
      caption: "Pengumpulan dokumentasi perkuliahan, praktikum pemrograman, dan keseharian seluruh 35 anggota Olympus Legacy.",
      credit: "\"Barks Fleeing Before the Storm\" · Jules Dupré (Art Institute of Chicago, CC0)"
    },
    {
      id: "gal-6",
      title: "Peluncuran Portal Resmi Olympus Legacy MMXXVI",
      category: "Inovasi Digital",
      date: "November MMXXVI",
      image: "assets/gallery/atmospheric-gravity-waves-in-the-atlantic-ocean.jpg",
      caption: "Peresmian rumah digital angkatan yang memuat struktur interaktif, direktori 35 anggota, dan kuis kepribadian 12 Dewa Olympus.",
      credit: "\"Atmospheric gravity waves in the Atlantic Ocean\" · NASA MODIS (Public Domain)"
    }
  ],

  // 6. Timeline Perjalanan Angkatan
  timeline: [
    {
      romanPhase: "I",
      date: "Agustus MMXXVI",
      title: "Titik Mula di Gerbang PSTI UPI",
      description:
        "Tiga puluh lima mahasiswa baru dari berbagai daerah pertama kali bertemu di lingkungan Pendidikan Sistem dan Teknologi Informasi UPI, memulai perjalanan akademik sebagai satu keluarga."
    },
    {
      romanPhase: "II",
      date: "September MMXXVI",
      title: "Kelahiran Lambang Trisula & Nama Olympus Legacy",
      description:
        "Melalui musyawarah angkatan, terpilihnya Rafa sebagai Ketua dan Dania sebagai Wakil Ketua, diikuti perumusan makna lambang Trisula, Gunung Olympus, Ombak Samudra, dan Bintang Bersudut Delapan."
    },
    {
      romanPhase: "III",
      date: "Oktober MMXXVI",
      title: "Pembentukan Pilar Humas & Kominfo",
      description:
        "Penyusunan formasi lengkap Sekretaris, Bendahara, Humas (Internal & Eksternal), serta Kominfo (Dokumentasi, Editing, Website) agar seluruh 35 anggota memiliki ruang berkarya yang jelas."
    },
    {
      romanPhase: "IV",
      date: "November MMXXVI",
      title: "Peluncuran Rumah Digital Olympus Legacy",
      description:
        "Tim Website bersama Editing dan Dokumentasi merilis portal profil angkatan interaktif sebagai arsip terbuka dan identitas resmi PSTI UPI MMXXVI."
    },
    {
      romanPhase: "V",
      date: "MMXXVI · Masa Depan",
      title: "Mengukir Warisan Karya Lintas Semester",
      description:
        "Melanjutkan perjalanan riset, pengabdian masyarakat, kompetisi teknologi, dan solidaritas tanpa batas hingga seluruh 35 anggota menyandang gelar sarjana bersama."
    }
  ]
};
