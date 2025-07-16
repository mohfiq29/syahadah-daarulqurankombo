function masehiKeHijriah(date) {
  const iYear = 10631 / 30;
  const epochAstro = 1948084;
  const shift1 = 8.01 / 60;

  let jd = Math.floor((date.getTime() / 86400000) + 2440588);
  let z = jd - epochAstro;
  let cyc = Math.floor(z / 10631);
  z = z - 10631 * cyc;
  let j = Math.floor((z - shift1) / iYear);
  let iy = 30 * cyc + j;
  z = z - Math.floor(j * iYear + shift1);
  let im = Math.floor((z + 28.5001) / 29.5);
  if (im === 13) im = 12;
  let id = z - Math.floor(29.5001 * im - 29);

  const bulanHijriah = [
    "Muharram", "Safar", "Rabiul Awal", "Rabiul Akhir",
    "Jumadil Awal", "Jumadil Akhir", "Rajab", "Syaban",
    "Ramadhan", "Syawal", "Zulkaidah", "Zulhijjah"
  ];

  return `${id} ${bulanHijriah[im - 1]} ${iy} H`;
}

function getdata() {
  const namaSantri = document.getElementById('namaSantri').value.trim();
  const jumlahJuz = document.getElementById('jumlahJuz').value;
  const inputTanggal = document.getElementById('tanggalPicker')?.value;
  const templateImg = document.getElementById('sertifikat-template');
  const namaElement = document.getElementById('nama');
  const tanggalElement = document.getElementById('tanggal');

  if (!namaSantri || jumlahJuz === "" || jumlahJuz === "Jumlah Juz") {
    alert("Harap isi semua data dengan benar!");
    return;
  }

  const templateMap = {
  "5": "5_Juz.png", 
  "10": "10_Juz.png", 
  "15": "15_Juz.png",
  "20": "20_Juz.png", 
  "25": "25_Juz.png", 
  "30": "30_Juz.png"
};

  const posisiTopMap = {
  "5": "24vw",
  "10": "20vw",
  "15": "20vw",
  "20": "21vw",
  "25": "24vw",
  "30": "28vw"
};
  const posisiLeftMap = {
  "5": "55%", 
  "10": "50.5%", 
  "15": "50%",
  "20": "58.2%", 
  "25": "50%", 
  "30": "50%"
};
  const fontMap = {
  "5": "#0a1d41", 
  "10": "#035d5b", 
  "15": "#0a5d70",
  "20": "#01385a", 
  "25": "#045254", 
  "30": "#191818"
};
  const tanggalTopMap = {
  "5": "43vw", 
  "10": "45.5vw", 
  "15": "44.5vw",
  "20": "41.9vw", 
  "25": "43.7vw", 
  "30": "49.5vw"
};
  const tanggalLeftMap = {
  "5": "54.6%", 
  "10": "49.9%", 
  "15": "50%",
  "20": "58.2%", 
  "25": "50%", 
  "30": "50%"
};
  const tanggalfontMap = {
  "5": "#8e5f16", 
  "10": "#035d5b", 
  "15": "#020e11",
  "20": "#000000", 
  "25": "#045254", 
  "30": "#191818"
};

  // Set gambar sertifikat
  if (templateMap[jumlahJuz]) {
    templateImg.src = templateMap[jumlahJuz];
  } else {
    alert("Template sertifikat tidak ditemukan.");
    return;
  }

  // Atur Nama
  namaElement.textContent = namaSantri;
  namaElement.style.top = posisiTopMap[jumlahJuz]
  namaElement.style.left = posisiLeftMap[jumlahJuz]
  namaElement.style.color = fontMap[jumlahJuz]

  // Atur Tanggal Posisi & Warna
  tanggalElement.style.top = tanggalTopMap[jumlahJuz] || "calc(23.8vw + 2%)";
  tanggalElement.style.left = tanggalLeftMap[jumlahJuz] || "50%";
  tanggalElement.style.color = tanggalfontMap[jumlahJuz] || "#000";

  // Atur Tanggal Masehi & Hijriah
  const dateSelected = inputTanggal ? new Date(inputTanggal) : new Date();
  const todayMasehi = dateSelected.toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  const todayHijriah = masehiKeHijriah(dateSelected);
  const tanggalGabung = `Kombo, ${todayMasehi} | ${todayHijriah}`;
  tanggalElement.textContent = tanggalGabung;

  document.getElementById('modal-nim').style.display = 'none';
}

function tampilkanData(data) {
  const id = getQueryParam('id');
  const item = data.find(row => row.ID == id);

  if (item) {
    document.getElementById('nama').textContent = item['Nama Lengkap'];
    document.getElementById('tanggal').textContent = item['Tanggal'];
  } else {
    document.getElementById('nama').textContent = 'DATA TIDAK DITEMUKAN';
    document.getElementById('tanggal').textContent = 'DATA TIDAK DITEMUKAN';
  }
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function downloadSertifikatpdf() {
  const element = document.querySelector("#sertifikat-container");
  html2canvas(element).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jspdf.jsPDF({ orientation: "landscape", unit: "mm", format: [210, 297] });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    const nama = document.getElementById('nama').textContent.trim().replace(/\s+/g, '_') || "Santri";
    pdf.save(`sertifikat_${nama}.pdf`);
  });
}

function downloadSertifikatpng() {
  const element = document.querySelector("#sertifikat-container");
  html2canvas(element).then(canvas => {
    const link = document.createElement("a");
    const nama = document.getElementById('nama').textContent.trim().replace(/\s+/g, '_') || "Santri";
    link.download = `sertifikat_${nama}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
