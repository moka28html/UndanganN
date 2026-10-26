// EDIT bagian ini sesuai acara sebelum website dibagikan.
const pengaturan = {
  tanggal: "Rabu 28 Oktober 2026",
  waktu: "Pukul 19:00 Wita - selesai",
  tempat: "Rumah Bapak Ferdinan Baitanu",
  maps: "https://www.google.com/maps/place/10%C2%B010'33.9%22S+123%C2%B038'47.7%22E/@-10.1760883,123.6440087,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-10.1760883!4d123.6465836?hl=id&entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D",
  whatsapp: "6282247401748", // kode negara, tanpa + dan tanpa 0 di depan
   pesan: "Shalom Kak Nova dan Kak Diego \n\n" +
    "*Selamat wisuda, Kak Nova!* \n" +
    "Selamat atas gelar S.Tr.Kep., Ns. yang sudah diraih. Perjuangan dan kerja keras Kakak terbayar hari ini. Semoga ilmunya menjadi berkat bagi banyak orang dan Tuhan membuka jalan yang indah untuk langkah selanjutnya.\n\n" +
    "*Selamat ulang tahun, Kak Diego!* \n" +
    "Selamat bertambah usia. Semoga selalu sehat, bertumbuh dalam kasih Tuhan, dan membawa sukacita bagi keluarga. Semoga semua cita-cita dan harapan Kakak terwujud.\n\n" +
    "Selamat berbahagia untuk kalian berdua. Tuhan memberkati selalu "
};

const $ = (id) => document.getElementById(id);

$("tanggalAcara").textContent = pengaturan.tanggal;
$("waktuAcara").textContent = pengaturan.waktu;
$("tempatAcara").textContent = pengaturan.tempat;
$("mapsButton").href = pengaturan.maps;

// Nama tamu dari ?to=Nama%20Tamu
const namaTamu = (new URLSearchParams(location.search).get("to") || "").trim();
$("namaTamu").textContent = namaTamu || "Nama Undangan";

// Nomor WhatsApp: ubah 08xxx menjadi 628xxx otomatis
let nomor = pengaturan.whatsapp.replace(/\D/g, "");
if (nomor.startsWith("0")) nomor = "62" + nomor.slice(1);
const tandaTangan = namaTamu ? "\n\nSalam hangat,\n*" + namaTamu + "*" : "";
const pesan = encodeURIComponent(pengaturan.pesan + tandaTangan);
$("rsvpButton").href = `https://wa.me/${nomor}?text=${pesan}`;

// Buka cover
// Musik
const musik = $("musik");
const musicBtn = $("musicBtn");

function setMusicState(playing) {
  musicBtn.classList.toggle("playing", playing);
  musicBtn.classList.toggle("paused", !playing);
}

// Buka cover + putar musik
$("openBtn").addEventListener("click", () => {
  $("cover").classList.add("open");
  document.body.classList.remove("locked");
  window.scrollTo(0, 0);

  musicBtn.hidden = false;
  musik.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
});

// Tombol putar/jeda
musicBtn.addEventListener("click", () => {
  if (musik.paused) { musik.play(); setMusicState(true); }
  else { musik.pause(); setMusicState(false); }
});

// Sembunyikan foto galeri yang filenya belum ada
document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("error", () => img.closest("figure").remove());
});

// Efek muncul saat gulir
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("in"));
}
