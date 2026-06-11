// Style Schema — tetap, tidak perlu diubah pengguna
const STYLE_SCHEMA = {
  poster_style: {
    meta: {
      nama: "Poster Sekolah Kawaii",
      versi: "1.0",
      saiz_disyorkan: "A3 atau 1080x1527px",
      bahasa: "Bahasa Malaysia"
    },
    latar_belakang: {
      warna: "#1a1040",
      jenis: "gelap-ungu-navy"
    },
    tajuk: {
      baris_1: { warna: "#ffffff", huruf: "bold besar outline putih" },
      baris_2: { warna: "#ff6eb4", kesan: "gradient pink-ke-kuning", huruf: "bold besar outline" },
      baris_3: { warna: "#00d4ff", huruf: "bold besar outline", aksesori: "bintang kecil di tepi" }
    },
    watak_utama: {
      posisi: "tengah poster",
      gaya: "kawaii anime, mata besar, comel",
      pakaian: "seragam sekolah Malaysia",
      kesan: "cahaya glow bulat di belakang watak"
    },
    panel_aktiviti: {
      bilangan: 6,
      susunan: "3 baris x 2 panel (kiri dan kanan watak)",
      gaya_panel: { bentuk: "segi empat membulat", warna_latar: "#2a1a5e" },
      label_panel: { warna_kotak: "#ffffff", warna_teks: "#1a1040", huruf: "bold" },
      ikon_amaran: "segitiga kuning dengan tanda seru"
    },
    anak_panah: { warna: "#ff4444", bentuk: "tebal melengkung menghala ke dalam" },
    bahagian_tips: {
      latar: "#2a1a5e",
      tajuk_tips: { warna: "#ffffff", huruf: "bold", aksesori: "ikon push pin" },
      item_tips: { penanda: "tanda semak hijau", warna_penanda: "#00cc66", warna_teks: "#ffffff" },
      maskot: "panda kawaii kecil di sudut kiri"
    },
    elemen_hiasan: {
      bintang: { warna: ["#ffffff", "#ffff00", "#00d4ff"], posisi: "bertabur di seluruh poster" },
      sparkle: { bentuk: "4-hujung atau 6-hujung", posisi: "di sekitar tajuk dan watak" },
      confetti: { warna: ["#ff6eb4", "#00d4ff", "#ffff00"], posisi: "bahagian atas poster" }
    },
    palet_warna: {
      latar_utama: "#1a1040",
      ungu_panel: "#2a1a5e",
      pink_tajuk: "#ff6eb4",
      biru_tajuk: "#00d4ff",
      kuning_amaran: "#ffcc00",
      merah_anak_panah: "#ff4444",
      hijau_semak: "#00cc66"
    }
  }
};

function val(id) {
  return document.getElementById(id).value.trim() || "[belum diisi]";
}

function generate() {
  const content = {
    poster_content: {
      tajuk: {
        baris_1: val("b1"),
        baris_2: val("b2"),
        baris_3: val("b3"),
        subjudul: val("sub")
      },
      panel: [
        { id: 1, posisi: "atas-kiri",    label: val("p1l"), situasi: val("p1s") },
        { id: 2, posisi: "atas-kanan",   label: val("p2l"), situasi: val("p2s") },
        { id: 3, posisi: "tengah-kiri",  label: val("p3l"), situasi: val("p3s") },
        { id: 4, posisi: "tengah-kanan", label: val("p4l"), situasi: val("p4s") },
        { id: 5, posisi: "bawah-kiri",   label: val("p5l"), situasi: val("p5s") },
        { id: 6, posisi: "bawah-kanan",  label: val("p6l"), situasi: val("p6s") }
      ],
      watak_tengah: val("watak"),
      tips: {
        tajuk: val("ttips"),
        senarai: [val("t1"), val("t2"), val("t3")]
      },
      kredit: val("kredit")
    }
  };

  const jsonStr = JSON.stringify(content, null, 2);

  const prompt = buildPrompt(content);

  document.getElementById("json-output").textContent = jsonStr;
  document.getElementById("prompt-output").textContent = prompt;

  const wrap = document.getElementById("result-wrap");
  wrap.classList.add("show");
  wrap.scrollIntoView({ behavior: "smooth", block: "start" });

  window._generatedJSON = jsonStr;
  window._generatedPrompt = prompt;
}

function buildPrompt(content) {
  const c = content.poster_content;
  const panels = c.panel.map(p =>
    `   Panel ${p.id} (${p.posisi}): Label = "${p.label}" | Scene = "${p.situasi}"`
  ).join("\n");

  return `Create a kawaii anime-style educational poster for Malaysian school children with the following specifications:

=== VISUAL STYLE (fixed — do not change) ===
- Dark navy-purple background (#1a1040)
- Kawaii anime art style with big cute eyes and pastel colors
- Main title text: bold, large, with white outline
- Title line 2: hot pink (#ff6eb4) with gradient effect
- Title line 3: bright cyan (#00d4ff) with outline
- 6 activity panels arranged around a central character (3 rows × 2 panels)
- Each panel: dark purple (#2a1a5e) rounded rectangle background
- Panel labels: white rounded speech bubble with dark text, bold font
- Yellow warning triangle icons (⚠) on relevant panels
- Red curved arrows pointing inward toward the center character
- Bottom tips section: dark purple background, green checkmarks (✓), white text
- Small kawaii panda mascot in bottom-left corner
- Decorative sparkles, stars, and confetti scattered throughout
- A glowing aura/halo effect behind the central character

=== POSTER CONTENT ===
Title:
   Line 1 (small, white): "${c.tajuk.baris_1}"
   Line 2 (large, pink): "${c.tajuk.baris_2}"
   Line 3 (large, cyan): "${c.tajuk.baris_3}"
   Subtitle (small, white): "${c.tajuk.subjudul}"

Six activity panels:
${panels}

Central character: ${c.watak_tengah}

Tips section:
   Title: "${c.tips.tajuk}"
   • ${c.tips.senarai[0]}
   • ${c.tips.senarai[1]}
   • ${c.tips.senarai[2]}

Credit text (bottom right, small): "${c.kredit}"

=== FORMAT ===
Portrait orientation, A3 size ratio (approximately 1:1.41), high resolution, vibrant colors, clean and readable text, suitable for classroom display.`;
}

function copyJSON() {
  if (!window._generatedJSON) return;
  navigator.clipboard.writeText(window._generatedJSON).then(() => {
    showToast("✅ JSON disalin!");
    const btn = document.getElementById("copy-btn");
    btn.textContent = "Disalin!";
    setTimeout(() => btn.textContent = "Salin JSON", 2000);
  });
}

function copyPrompt() {
  if (!window._generatedPrompt) return;
  navigator.clipboard.writeText(window._generatedPrompt).then(() => {
    showToast("✅ Prompt disalin! Tampal ke Gemini terus.");
    const btn = document.getElementById("prompt-btn");
    btn.textContent = "Disalin!";
    setTimeout(() => btn.textContent = "Salin Prompt Claude", 2000);
  });
}

function showTab(name, el) {
  document.querySelectorAll(".rtab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".rtab-panel").forEach(p => p.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("tab-" + name).classList.add("active");

  if (name === "json") {
    document.getElementById("copy-btn").style.display = "";
    document.getElementById("prompt-btn").style.display = "";
  } else if (name === "prompt") {
    document.getElementById("copy-btn").style.display = "none";
    document.getElementById("prompt-btn").style.display = "";
  } else {
    document.getElementById("copy-btn").style.display = "none";
    document.getElementById("prompt-btn").style.display = "none";
  }
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

// Update tab "Prompt untuk Claude" label to reflect it's actually a direct Gemini prompt
document.addEventListener("DOMContentLoaded", () => {
  // Auto-detect GitHub Pages URL and update the github link
  const ghBtn = document.getElementById("github-link");
  if (ghBtn && window.location.hostname.includes("github.io")) {
    const parts = window.location.hostname.split(".");
    const user = parts[0];
    const repo = window.location.pathname.split("/")[1];
    ghBtn.href = `https://github.com/${user}/${repo}`;
  }
});
