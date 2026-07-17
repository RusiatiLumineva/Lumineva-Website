/* ─────────────────────────────────────────────
   Scroll Reveal — Lumineva Aurorae
   Simpan sebagai: assets/js/scroll-reveal.js

   Cara pakai: tambahkan satu baris ini sebelum </body>
   di halaman yang ingin diberi efek (mis. index.html):

   <script src="/assets/js/scroll-reveal.js" defer></script>

   Catatan:
   - Tanpa JavaScript, halaman tampil normal (tidak ada
     konten yang disembunyikan secara permanen).
   - Menghormati pengaturan "reduce motion" pengunjung.
   ───────────────────────────────────────────── */

(function () {
    'use strict';

    // Hormati preferensi pengunjung yang mematikan animasi
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    var run = function () {

        // Elemen yang diberi efek reveal.
        // Section besar muncul sebagai satu kesatuan;
        // kartu-kartu di dalam grid muncul bergantian (stagger).
        var singles = document.querySelectorAll(
            'main section, .hero-content, .founder-grid > div'
        );
        var staggered = document.querySelectorAll(
            '.testimonial-card, .value-card, .service-box, .journal-entry, .service-item'
        );

        var prepare = function (el) {
            el.classList.add('reveal');
        };

        singles.forEach(prepare);

        // Stagger: beri jeda 90ms antar kartu dalam parent yang sama
        var groups = {};
        staggered.forEach(function (el) {
            prepare(el);
            var parent = el.parentElement;
            var key = parent ? Array.prototype.indexOf.call(document.querySelectorAll('*'), parent) : 0;
            groups[key] = (groups[key] || 0) + 1;
            el.style.transitionDelay = ((groups[key] - 1) * 90) + 'ms';
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
