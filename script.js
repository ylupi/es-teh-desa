const form = document.getElementById('penjualanForm');
const status = document.getElementById('status');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const tanggal = document.getElementById('tanggal').value;
    const jam = document.getElementById('jam').value;
    const jenis = document.getElementById('jenis').value;
    const jumlah = parseInt(document.getElementById('jumlah').value);
    const harga = parseInt(document.getElementById('harga').value);
    const total = jumlah * harga;
    const kasir = document.getElementById('kasir').value;

    fetch("https://script.google.com/macros/s/AKfycbyO-3khhCVRoU_suXqWzd29Qe-P8iS2_RBMD1eYOoc4rtGDRSnx88tjZND9hiTrz6r1/exec", {
            method: "POST",
            body: JSON.stringify({
                tanggal,
                jam,
                jumlah,
                jenis,
                harga,
                total,
                kasir
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(response => {
            status.innerText = "✅ Data berhasil dikirim!";
            form.reset();
            setDefaultDateTime(); // Reset tanggal & jam
        })
        .catch(error => {
            status.innerText = "❌ Gagal mengirim data.";
            console.error(error);
        });
});

function setDefaultDateTime() {
    const now = new Date();
    document.getElementById('tanggal').value = now.toISOString().slice(0, 10);
    document.getElementById('jam').value = now.toTimeString().slice(0, 5);
}

window.addEventListener("load", setDefaultDateTime);