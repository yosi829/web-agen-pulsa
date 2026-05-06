const produk = [
  {kategori:"pulsa", nama:"Pulsa 10K", harga:12000},
  {kategori:"pulsa", nama:"Pulsa 20K", harga:22000},
  {kategori:"data", nama:"Data 2GB", harga:25000},
  {kategori:"data", nama:"Data 5GB", harga:50000},
  {kategori:"pln", nama:"Token 20K", harga:21000},
  {kategori:"pln", nama:"Token 50K", harga:51000},
];

// DETEKSI PROVIDER
const providerMap = {
  "0811":"Telkomsel","0812":"Telkomsel","0813":"Telkomsel",
  "0821":"Telkomsel","0822":"Telkomsel",
  "0852":"Telkomsel","0853":"Telkomsel",
  "0817":"XL","0818":"XL","0819":"XL",
  "0859":"XL","0877":"XL","0878":"XL",
  "0856":"Indosat","0857":"Indosat","0858":"Indosat",
  "0881":"Smartfren","0882":"Smartfren"
};

document.getElementById("phone").addEventListener("input", function(){
  const val = this.value.substring(0,4);
  const provider = providerMap[val] || "Tidak diketahui";
  document.getElementById("provider").innerText = provider;
});

// FILTER PRODUK
function filterProduk(kategori){
  const list = document.getElementById("produkList");
  list.innerHTML = "";

  const filtered = produk.filter(p => p.kategori === kategori);

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${p.nama}</h3>
      <p>Rp ${p.harga.toLocaleString("id-ID")}</p>
      <button class="beli" onclick="beli('${p.nama}', ${p.harga})">Beli</button>
    `;

    list.appendChild(card);
  });
}

// GENERATE SN
function generateSN(){
  return "SN" + Math.random().toString(36).substring(2,10).toUpperCase();
}

// SIMULASI TRANSAKSI
function beli(nama, harga){
  const nomor = document.getElementById("phone").value;

  if(!nomor){
    alert("Masukkan nomor terlebih dahulu!");
    return;
  }

  document.getElementById("loading").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");

    const sukses = Math.random() > 0.2;
    const result = document.getElementById("result");

    if(sukses){
      result.innerHTML = `
        <h2>✅ Transaksi Berhasil</h2>
        <p>Nomor: ${nomor}</p>
        <p>Produk: ${nama}</p>
        <p>SN: ${generateSN()}</p>
      `;
    } else {
      result.innerHTML = `
        <h2>❌ Transaksi Gagal</h2>
        <p>Silakan coba lagi</p>
      `;
    }

    result.classList.remove("hidden");
  }, 2000);
}

// DEFAULT LOAD
filterProduk("pulsa");
