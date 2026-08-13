"""
Mengubah sintaks Nuxt Content (MDC) menjadi sintaks VitePress.

Dokumentasi ini ditulis untuk Nuxt Content, yang punya direktif blok sendiri
berupa titik dua berjenjang. VitePress tidak mengenalinya, jadi tiap direktif
dipetakan ke padanan terdekatnya: container bawaan VitePress kalau ada, atau
komponen Vue yang didaftarkan di tema kalau tidak.

Blok kode dilewati seluruhnya. Contoh kode di dokumentasi ini penuh dengan tag
seperti <Field> dan <Button> yang kebetulan mirip komponen, dan menyentuhnya
akan merusak contoh yang justru ingin ditampilkan apa adanya.

Dijalankan sekali saat dokumentasi diangkut dari repo fork. Disimpan di sini
sebagai catatan bagaimana konversinya dilakukan.
"""

import re
import sys
from pathlib import Path


def lindungi_blok_kode(teks):
    """
    Ganti tiap blok kode dengan penanda, kembalikan (teks, daftar_blok).

    Blok kode diganti penanda alih-alih teksnya dipecah, karena sebuah direktif
    bisa membungkus blok kode: pembukanya di atas, penutupnya di bawah. Kalau
    dipecah, keduanya jatuh di potongan berbeda dan pola apa pun gagal mengenali
    pasangannya.

    Dipindai baris per baris, bukan dengan pola tunggal. Pola yang mencoba
    menangkap pasangan pagar kode sekaligus terlalu mudah meleset: kelas \s
    ikut mencakup baris baru, sehingga penangkap indentasi merambat ke baris
    berikutnya dan satu pola bisa menelan hampir seluruh berkas.
    """
    blok = []
    hasil = []
    penutup = None      # pagar penutup yang sedang dinanti
    tampung = []

    for baris in teks.split('\n'):
        if penutup is None:
            m = re.match(r'^([ \t]*)(`{3,}|~{3,})(.*)$', baris)
            if m and m.group(3).strip() != '' or (m and not m.group(3)):
                penutup = (m.group(1), m.group(2)[0], len(m.group(2)))
                tampung = [baris]
            else:
                hasil.append(baris)
        else:
            tampung.append(baris)
            indent, ch, panjang = penutup
            m = re.match(r'^([ \t]*)(' + re.escape(ch) + r'{3,})[ \t]*$', baris)
            if m and len(m.group(2)) >= panjang:
                blok.append('\n'.join(tampung))
                hasil.append(f'\u0000BLOK{len(blok) - 1}\u0000')
                penutup = None
                tampung = []

    if tampung:                      # pagar tak tertutup: kembalikan apa adanya
        hasil.extend(tampung)
    return '\n'.join(hasil), blok


def kembalikan_blok_kode(teks, blok):
    return re.sub(r'\u0000BLOK(\d+)\u0000', lambda m: blok[int(m.group(1))], teks)


def baca_frontmatter(blok):
    """Ambil pasangan kunci-nilai dari blok --- ... --- di dalam direktif."""
    data = {}
    for baris in blok.split('\n'):
        m = re.match(r"^\s*([a-zA-Z]+):\s*(.*)$", baris)
        if m:
            data[m.group(1)] = m.group(2).strip().strip('\'"')
    return data


def pisah_penutup_komentar(teks):
    """
    Pisahkan penutup direktif yang menempel pada penutup komentar HTML.

    Upstream menonaktifkan beberapa bagian dengan membungkusnya dalam komentar,
    dan penutup `::` milik direktif jadi satu baris dengan `-->`. Selama masih
    menempel, tidak ada pola direktif yang mengenalinya, dan sintaks MDC mentah
    tertinggal di dalam komentar. Isinya tetap tidak dirender, tapi dipisahkan
    supaya tidak ada sisa sintaks MDC di mana pun.
    """
    return re.sub(r'^([ \t]*)::[ \t]+-->[ \t]*$', r'\1::\n\1-->', teks, flags=re.M)


def buang_component_source(teks):
    """
    ::component-source menampilkan kode sumber sebuah demo lewat API registry
    milik aplikasi Nuxt, yang tidak ikut diangkut. Dibuang, bukan dibiarkan
    pecah jadi teks mentah.

    Dijalankan sebelum langkah(), karena langkah() membuang semua baris penutup
    `::` di dalam blok steps — termasuk penutup milik direktif ini, sehingga
    setelah itu polanya tidak lagi punya penanda akhir untuk dicocokkan.
    """
    # bentuk frontmatter
    teks = re.sub(r'^[ \t]*::component-source[ \t]*\n[ \t]*---\n.*?\n[ \t]*---\n[ \t]*::[ \t]*$',
                  '', teks, flags=re.S | re.M)
    # bentuk atribut sebaris
    teks = re.sub(r'^[ \t]*::component-source\{[^}]*\}[ \t]*(\n[ \t]*::[ \t]*)?$',
                  '', teks, flags=re.M)
    return teks


def component_preview(teks):
    """::component-preview + frontmatter  ->  <ComponentPreview />"""
    def ganti(m):
        d = baca_frontmatter(m.group(1))
        nama = d.get('name')
        if not nama:
            return ''
        atribut = [f'name="{nama}"']
        if d.get('align'):
            atribut.append(f'align="{d["align"]}"')
        if d.get('previewClass'):
            atribut.append(f'previewClass="{d["previewClass"]}"')
        return f'<ComponentPreview {" ".join(atribut)} />\n'

    return re.sub(r'^[ \t]*::component-preview[ \t]*\n[ \t]*---\n(.*?)\n[ \t]*---\n[ \t]*::[ \t]*$',
                  ganti, teks, flags=re.S | re.M)


def langkah(teks):
    """:::steps / ::step  ->  <Steps> berisi div.kliping-step"""
    def isi_steps(m):
        badan = m.group(1)
        langkah_langkah = re.findall(r'::step\s*\n(.*?)(?=\n\s*::step|\Z)', badan, re.S)
        if not langkah_langkah:
            return badan
        hasil = ['<Steps>', '']
        for l in langkah_langkah:
            # buang penutup :: milik MDC dan ratakan indentasinya
            l = re.sub(r'^\s*::\s*$', '', l, flags=re.M)
            baris = [b[4:] if b.startswith('    ') else b for b in l.split('\n')]
            hasil += ['<div class="kliping-step">', '', '\n'.join(baris).strip(), '', '</div>', '']
        hasil.append('</Steps>')
        return '\n'.join(hasil)

    return re.sub(r'^\s*:::steps\s*\n(.*?)\n\s*:::\s*$', isi_steps, teks, flags=re.S | re.M)


def tab(teks):
    """
    Blok code-tabs dan tabs diratakan jadi bagian berlabel.

    VitePress punya ::: code-group, tapi itu hanya untuk deretan blok kode.
    Tab di sini berisi campuran: satu tab blok kode, tab lain berisi langkah-
    langkah. Meratakannya jadi label tebal membuat semua isinya tetap terbaca
    tanpa perlu komponen tab tersendiri.
    """
    # kumpulkan label dari tabs-trigger, lalu buang daftar pemicunya
    def buang_daftar(m):
        return ''
    teks = re.sub(r'^\s*:::tabs-list\s*\n.*?\n\s*:::\s*$', buang_daftar, teks, flags=re.S | re.M)

    # tiap tabs-content jadi bagian berlabel
    def isi_tab(m):
        nilai = m.group(1)
        badan = m.group(2)
        label = {'cli': 'CLI', 'manual': 'Manual'}.get(nilai, nilai.replace('-', ' ').title())
        baris = [b[2:] if b.startswith('  ') else b for b in badan.split('\n')]
        return f'\n**{label}**\n\n' + '\n'.join(baris).strip() + '\n'

    teks = re.sub(r'^\s*:{2,4}tabs-content\{value="([^"]+)"\}\s*\n(.*?)\n\s*:{2,4}\s*$',
                  isi_tab, teks, flags=re.S | re.M)

    # buang pembungkus code-tabs / tabs yang tersisa
    teks = re.sub(r'^\s*:{4,5}(code-tabs|tabs)(\{[^}]*\})?\s*$', '', teks, flags=re.M)
    teks = re.sub(r'^\s*:{4,5}\s*$', '', teks, flags=re.M)
    return teks


def callout(teks):
    """::callout dan <Callout> -> container ::: tip milik VitePress"""
    def dari_mdc(m):
        judul = m.group(1) or ''
        j = re.search(r'title="([^"]*)"', judul)
        badan = '\n'.join(b[2:] if b.startswith('  ') else b
                          for b in m.group(2).split('\n')).strip()
        return f'::: tip {j.group(1) if j else ""}\n{badan}\n:::'

    teks = re.sub(r'^[ \t]*::callout(\{[^}]*\})?[ \t]*\n(.*?)\n[ \t]*::[ \t]*$',
                  dari_mdc, teks, flags=re.S | re.M)

    def dari_html(m):
        atribut = m.group(1) or ''
        j = re.search(r'title="([^"]*)"', atribut)
        return f'::: tip {j.group(1) if j else ""}\n{m.group(2).strip()}\n:::'

    teks = re.sub(r'<Callout([^>]*)>\s*\n(.*?)\n\s*</Callout>', dari_html, teks, flags=re.S)
    return teks


def sisa_direktif(teks):
    """Direktif yang tidak punya padanan langsung."""
    # pembungkus kode yang bisa dilipat -> container details bawaan VitePress.
    # Penutupnya ikut diganti: container VitePress menuntut penutup minimal
    # sepanjang pembukanya, jadi `::` milik MDC tidak akan menutup `:::` dan
    # sisa halaman ikut tertelan ke dalam blok yang tidak pernah selesai.
    teks = re.sub(r'^[ \t]*::code-collapsible-wrapper[ \t]*\n(.*?)\n[ \t]*::[ \t]*$',
                  lambda m: f'::: details Lihat kode lengkap\n{m.group(1)}\n:::',
                  teks, flags=re.S | re.M)

    # registry-directory mengandalkan API registry milik aplikasi Nuxt yang
    # tidak ikut diangkut. Dibuang, bukan dibiarkan pecah.
    teks = re.sub(r'^::registry-directory\s*\n::\s*$', '', teks, flags=re.M)

    # linked-card -> tautan biasa
    teks = re.sub(r'<linked-card\s+href="([^"]+)"[^>]*>\s*(.*?)\s*</linked-card>',
                  lambda m: f'[{re.sub(r"<[^>]+>", "", m.group(2)).strip()}]({m.group(1)})',
                  teks, flags=re.S)

    # button-a -> tautan biasa
    teks = re.sub(r'<button-a\s+to="([^"]+)"[^>]*>\s*(.*?)\s*</button-a>',
                  lambda m: f'[{m.group(2).strip()}]({m.group(1)})', teks, flags=re.S)
    return teks


def rapikan_frontmatter(teks):
    """
    Kutip nilai frontmatter yang mengandung titik dua.

    Parser YAML membaca `deskripsi: ada dua hal: ini dan itu` sebagai pemetaan
    bersarang, lalu gagal. Nuxt Content tidak pernah mengeluhkannya, tapi
    VitePress memakai parser yang lebih ketat dan build berhenti di berkas
    pertama yang kena. Prosa Bahasa Indonesia memakai titik dua dengan wajar,
    jadi nilainya dikutip, bukan kalimatnya yang diubah.
    """
    m = re.match(r'^---\n(.*?\n)---\n', teks, re.S)
    if not m:
        return teks

    baris_baru = []
    for baris in m.group(1).split('\n'):
        km = re.match(r'^([a-zA-Z_][\w-]*):[ \t]+(.+?)[ \t]*$', baris)
        if km and ': ' in km.group(2) and km.group(2)[0] not in '"\'':
            nilai = km.group(2).replace('\\', '\\\\').replace('"', '\\"')
            baris = f'{km.group(1)}: "{nilai}"'
        baris_baru.append(baris)

    return '---\n' + '\n'.join(baris_baru) + '---\n' + teks[m.end():]


def rapikan(teks):
    teks = re.sub(r'\n{4,}', '\n\n\n', teks)
    return teks.strip() + '\n'


def konversi(teks):
    teks = rapikan_frontmatter(teks)
    teks, blok = lindungi_blok_kode(teks)
    teks = pisah_penutup_komentar(teks)
    teks = buang_component_source(teks)
    teks = component_preview(teks)
    teks = callout(teks)
    teks = langkah(teks)
    teks = tab(teks)
    teks = sisa_direktif(teks)
    teks = kembalikan_blok_kode(teks, blok)
    return rapikan(teks)


def rute_tersedia(akar):
    """Kumpulan rute yang benar-benar punya halaman di folder dokumentasi."""
    rute = set()
    for berkas in akar.rglob('*.md'):
        if '.vitepress' in berkas.parts:
            continue
        jalur = berkas.relative_to(akar).with_suffix('').as_posix()
        # Halaman index hanya sah dengan garis miring di belakang: tanpa itu
        # VitePress mencari berkas bernama sama, bukan folder berisi index.
        rute.add(f'/{jalur[:-len("index")]}' if jalur.endswith('index') else f'/{jalur}')
    return rute


def perbaiki_tautan(teks, rute):
    """
    Sesuaikan tautan internal dengan struktur folder yang baru.

    Di aplikasi Nuxt semua halaman ini hidup di bawah /docs dan namanya masih
    berawalan angka untuk mengurutkan sidebar. Di sini dokumentasinya adalah
    situsnya sendiri, jadi awalan itu dibuang.

    Tautan yang menunjuk halaman yang memang tidak ikut diangkut — galeri blok,
    galeri grafik, pembuat tema, dan dua halaman registry yang di upstream pun
    tidak pernah ada — dilepas jadi teks biasa. Membiarkannya berarti pembaca
    mengklik dan mendarat di halaman kosong.
    """
    teks, blok = lindungi_blok_kode(teks)

    def normalkan(jalur):
        if jalur.startswith('/docs/'):
            jalur = jalur[len('/docs'):]
        elif jalur == '/docs':
            jalur = '/'
        return re.sub(r'/\d+\.', '/', jalur)

    def ganti(m):
        label, jalur, jangkar = m.group(1), m.group(2), m.group(3) or ''
        baru = normalkan(jalur)
        for calon in (baru, f'{baru}/'):
            if calon in rute:
                return f'[{label}]({calon}{jangkar})'
        return label            # halaman tidak ada: lepas jadi teks biasa

    teks = re.sub(r'\[([^\]]*)\]\((/[^)#]*)(#[^)]*)?\)', ganti, teks)
    teks = kembalikan_blok_kode(teks, blok)
    return teks


if __name__ == '__main__':
    akar = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
    berkas_md = [b for b in sorted(akar.rglob('*.md')) if '.vitepress' not in b.parts]

    diubah = 0
    for berkas in berkas_md:
        asli = berkas.read_text(encoding='utf-8')
        baru = konversi(asli)
        if baru != asli:
            berkas.write_text(baru, encoding='utf-8')
            diubah += 1
    print(f'berkas diubah: {diubah}')

    # Tautan dibereskan setelah semua berkas selesai, karena daftar rute yang
    # sah baru bisa disusun kalau seluruh pohon dokumentasi sudah pada tempatnya.
    rute = rute_tersedia(akar)
    ditaut = 0
    for berkas in berkas_md:
        asli = berkas.read_text(encoding='utf-8')
        baru = perbaiki_tautan(asli, rute)
        if baru != asli:
            berkas.write_text(baru, encoding='utf-8')
            ditaut += 1
    print(f'berkas dengan tautan disesuaikan: {ditaut}')
