function getdata() {
  const namaSantri = document.getElementById('namaSantri').value.trim();
  const jumlahJuz = document.getElementById('jumlahJuz').value;
  const templateImg = document.getElementById('sertifikat-template');
  const namaElement = document.getElementById('nama'); // ✅ ini penting agar tidak error
  const tanggalElement = document.getElementById('tanggal');

  if (!namaSantri || jumlahJuz === "" || jumlahJuz === "Jumlah Juz") {
    alert("Harap isi semua data dengan benar!");
    return;
  }

  // Mapping gambar sertifikat
  const templateMap = {
    "5": "5_Juz.png",
    "10": "10_Juz.png",
    "15": "15_Juz.png",
    "20": "20_Juz.png",
    "25": "25_Juz.png",
    "30": "30_Juz.png"
  };

  // Mapping posisi top elemen nama
  const posisiTopMap = {
    "5": "calc(23vw + 2%)",
    "10": "calc(19vw + 2%)",
    "15": "calc(18vw + 2%)",
    "20": "calc(19.2vw + 2%)",
    "25": "calc(24vw + 2%)",
    "30": "calc(27vw + 2%)"
  };
  const posisiLeftMap = {
    "5": "52.1%",
    "10": "48.8%",
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
   // Mapping posisi top elemen nama
  const tanggalTopMap = {
    "5": "43vw",
    "10": "45.5vw",
    "15": "44.5vw",
    "20": "41.9vw",
    "25": "43.7vw",
    "30": "49.5vw"
  };
  const tanggalLeftMap = {
    "5": "52%",
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
    alert("Template sertifikat tidak ditemukan untuk jumlah juz tersebut.");
    return;
  }

  // Set teks dan posisi nama
  namaElement.textContent = namaSantri;
  namaElement.style.top = posisiTopMap[jumlahJuz] || "calc(23.8vw + 2%)"; // default jika tidak ditemukan
  namaElement.style.left = posisiLeftMap[jumlahJuz] || "50%"; // default jika tidak ditemukan
  namaElement.style.color = fontMap[jumlahJuz] || "#000000"; // default jika tidak ditemukan
  tanggalElement.style.top = tanggalTopMap[jumlahJuz] || "calc(23.8vw + 2%)"; // default jika tidak ditemukan
  tanggalElement.style.left = tanggalLeftMap[jumlahJuz] || "50%"; // default jika tidak ditemukan
  tanggalElement.style.color = tanggalfontMap[jumlahJuz] || "#000000"; // default jika tidak ditemukan

  // Tampilkan data ke elemen output
  document.getElementById('nama').textContent = namaSantri;
  const today = new Date();
  const todayMasehi = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  // Tanggal Hijriah
  const hijriOptions = { day: 'numeric', month: 'long', year: 'numeric', calendar: 'islamic' };
  const todayHijriah = today.toLocaleDateString('id-ID-u-ca-islamic', hijriOptions);
  const tanggalGabung = `Kombo, ${todayMasehi} | ${todayHijriah}`
  document.getElementById('tanggal').textContent = tanggalGabung;
  document.getElementById('modal-nim').style.display = 'none';

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

    const pdf = new jspdf.jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [210, 297]
    });

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
