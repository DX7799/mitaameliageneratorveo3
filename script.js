// File: script.js
// JavaScript untuk Veo 3 Prompt Generator

document.addEventListener('DOMContentLoaded', function() {
    // Mengambil semua elemen yang dibutuhkan dari DOM
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const englishPrompt = document.getElementById('englishPrompt');
    const copyBtn = document.getElementById('copyBtn');
    const formInputs = document.querySelectorAll('#input-column input, #input-column textarea, #input-column select');

    // Fungsi untuk mengisi form dengan contoh data
    function prefillForm() {
        document.getElementById('judul_scane').value = 'Terminal bus malam';
        document.getElementById('deskripsi_karakter').value = 'Seorang vlogger pria muda asal Maluku berusia 27 tahun.\nPerawakan/Bentuk Tubuh: tubuh kekar, tinggi 164cm, bentuk badan proporsional.\nWarna kulit: sawo matang cerah.\nRambut: lurus, hitam kecokelatan, belah samping.\nWajah: wajah oval, alis tebal alami, mata hitam besar, senyum ramah, pipi merona, bibir natural.\nPakaian: mengenakan jaket hoodie warna loreng dan celana panjang hitam robek di lutut, membawa ransel kecil.';
        document.getElementById('detail_suara').value = 'Dia berbicara dengan suara pria muda yang hangat dan penuh semangat.\nNada: Young Male.\nTimbre: bersahabat dan enerjik.\nAksen/Logat: logat Indonesia dengan sentuhan khas Maluku halus, berbicara murni dalam Bahasa Indonesia.\nCara Berbicara: tempo sedang-cepat, gaya bicara lincah dan ekspresif.\nPENTING: Seluruh dialog harus dalam Bahasa Indonesia dengan pengucapan natural dan jelas. Pastikan suara karakter ini konsisten di seluruh video.';
        document.getElementById('aksi_karakter').value = 'berjalan di sekitar terminal bus malam sambil melihat-lihat aktivitas penumpang dan pedagang.';
        document.getElementById('ekspresi_karakter').value = 'Karakter menunjukkan ekspresi kagum dan antusias, sering tersenyum sambil melirik kamera.';
        document.getElementById('latar').value = 'Latar tempat: di terminal bus antar kota malam hari, terdapat pedagang kaki lima di pinggir jalur keberangkatan, beberapa bus berjajar dengan lampu menyala.\nWaktu: malam hari, hujan rintik-rintik.';
        document.getElementById('visual_tambahan').value = 'Pencahayaan: natural dari lampu jalan dan lampu bus, pantulan cahaya pada aspal basah.\nGaya Video/Art Style: cinematic realistis.\nKualitas Visual: Resolusi 4K.';
        document.getElementById('suasana').value = 'Suasana sibuk, ramai, dengan kesan perjalanan malam yang hidup dan dinamis meskipun hujan.';
        document.getElementById('suara_lingkungan').value = 'SOUND: suara mesin bus menyala, pengumuman dari pengeras suara, derai hujan ringan, dan percakapan samar antar penumpang dan pedagang.';
        document.getElementById('dialog_karakter').value = 'Tiap kota punya terminal kayak gini, dan aku suka banget suasana malamnya… hangat walau gerimis begini. Rasanya kayak perjalanan baru mau dimulai.';
        document.getElementById('negative_prompt').value = 'Hindari: teks di layar, subtitle, tulisan di video, font, logo, distorsi, artefak, anomali, wajah ganda, anggota badan cacat, tangan tidak normal, orang tambahan, objek mengganggu, kualitas rendah, buram, glitch, suara robotik, suara pecah.';
    }

    prefillForm(); // Memanggil fungsi prefill saat halaman dimuat

    // Fungsi untuk menghasilkan prompt dengan format yang lebih baik
    function generatePrompt() {
        const inputs = {
            judul: document.getElementById('judul_scane').value.trim(),
            deskripsi: document.getElementById('deskripsi_karakter').value.trim(),
            suara: document.getElementById('detail_suara').value.trim(),
            aksi: document.getElementById('aksi_karakter').value.trim(),
            ekspresi: document.getElementById('ekspresi_karakter').value.trim(),
            latar: document.getElementById('latar').value.trim(),
            visual: document.getElementById('visual_tambahan').value.trim(),
            kamera: document.getElementById('gerakan_kamera').value,
            suasana: document.getElementById('suasana').value.trim(),
            ambience: document.getElementById('suara_lingkungan').value.trim(),
            dialog: document.getElementById('dialog_karakter').value.trim(),
            negatif: document.getElementById('negative_prompt').value.trim(),
        };

        // Membuat prompt dengan struktur yang jelas dan rapi
        const promptEN = `
**SCENE:**
A cinematic video titled "${inputs.judul}".

**CHARACTER & ACTION:**
- **Description:** A consistent character, defined as: ${inputs.deskripsi}
- **Action:** The character is ${inputs.aksi}.
- **Expression:** Showing an expression of ${inputs.ekspresi}.

**SETTING & ATMOSPHERE:**
- **Location & Time:** ${inputs.latar}
- **Atmosphere:** The overall atmosphere is ${inputs.suasana}.

**CINEMATOGRAPHY & VISUALS:**
- **Camera Movement:** ${inputs.kamera}.
- **Visual Details:** ${inputs.visual}.

**AUDIO:**
- **Character Voice:** ${inputs.suara}.
- **Spoken Dialogue (in Indonesian):** "${inputs.dialog}"
- **Ambient Sound:** ${inputs.ambience}.

**---NEGATIVE PROMPT---**
${inputs.negatif}
`.trim();

        // Menampilkan hasil prompt yang sudah terformat
        englishPrompt.textContent = promptEN;
    }

    // Event listener untuk tombol 'Generate'
    generateBtn.addEventListener('click', generatePrompt);

    // Event listener untuk tombol 'Clear'
    clearBtn.addEventListener('click', () => {
        formInputs.forEach(input => {
            if (input.type === 'select-one') {
                input.selectedIndex = 7; // Reset ke 'Tracking Shot'
            } else {
                input.value = '';
            }
        });
        englishPrompt.textContent = 'Hasil prompt akan muncul di sini...';
    });

    // Event listener untuk tombol 'Copy'
    copyBtn.addEventListener('click', function() {
        const textToCopy = englishPrompt.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-400"><path d="M20 6 9 17l-5-5"/></svg>`;
            copyBtn.title = "Tersalin!";
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.title = "Salin Prompt";
            }, 2000);
        }).catch(err => {
            console.error('Gagal menyalin teks: ', err);
            alert('Oops, tidak bisa menyalin');
        });
    });

    // Fungsi global (opsional, jika masih diperlukan)
    window.handlePrompt = function(prompt) {
        // ... (fungsi ini bisa diisi jika ada interaksi lain)
    }
});