/* ─────────────────────────────────────────────
   Stories Pagination — Lumineva Aurorae
   Simpan sebagai: assets/js/stories-pagination.js

   Menampilkan 6 story per halaman (2 baris x 3 kartu) di /stories/ dan /id/stories/.
   Halaman berikutnya dibuka lewat ?page=2, ?page=3, dst.

   Cara pakai:
   - Tambahkan satu baris ini sebelum baris scroll-reveal.js:
     <script src="/assets/js/stories-pagination.js" defer></script>
   - Story baru tetap ditempel di urutan PALING ATAS index.html
     seperti biasa. Pembagian halaman terjadi otomatis.
   - Tanpa JavaScript, semua story tetap tampil (tidak ada yang hilang).
   ───────────────────────────────────────────── */

(function () {
    'use strict';

    var PER_PAGE = 6;

    var run = function () {
        var list = document.querySelector('.container-journal');
        if (!list) return;

        var entries = Array.prototype.slice.call(list.querySelectorAll('.journal-entry'));
        var totalPages = Math.ceil(entries.length / PER_PAGE);
        if (totalPages < 2) return;

        var isID = (document.documentElement.lang || '').toLowerCase().indexOf('id') === 0;
        var t = isID
            ? { newer: '← Cerita lebih baru', older: 'Cerita sebelumnya →', page: 'Halaman', of: 'dari', label: 'Navigasi halaman cerita' }
            : { newer: '← Newer stories',     older: 'Older stories →',     page: 'Page',    of: 'of',   label: 'Stories pages' };

        var params = new URLSearchParams(window.location.search);
        var current = parseInt(params.get('page'), 10);
        if (isNaN(current) || current < 1) current = 1;
        if (current > totalPages) current = totalPages;

        var start = (current - 1) * PER_PAGE;
        var end = start + PER_PAGE;

        entries.forEach(function (el, i) {
            if (i < start || i >= end) {
                el.style.display = 'none';
                el.setAttribute('aria-hidden', 'true');
            }
        });

        var linkTo = function (page) {
            return page === 1 ? window.location.pathname : window.location.pathname + '?page=' + page;
        };

        var nav = document.createElement('nav');
        nav.className = 'journal-pagination';
        nav.setAttribute('aria-label', t.label);

        var prev = document.createElement(current > 1 ? 'a' : 'span');
        prev.className = 'pagination-link pagination-prev';
        if (current > 1) { prev.href = linkTo(current - 1); prev.textContent = t.newer; }

        var status = document.createElement('span');
        status.className = 'pagination-status';
        status.textContent = t.page + ' ' + current + ' ' + t.of + ' ' + totalPages;

        var next = document.createElement(current < totalPages ? 'a' : 'span');
        next.className = 'pagination-link pagination-next';
        if (current < totalPages) { next.href = linkTo(current + 1); next.textContent = t.older; }

        nav.appendChild(prev);
        nav.appendChild(status);
        nav.appendChild(next);
        list.appendChild(nav);

        if (current > 1) {
            document.title = document.title + ' — ' + t.page + ' ' + current;
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
