// ======================================================
// ASR Klinika — script.js
// Структура соответствует HTML-секциям. Логика исходная.
// ======================================================

(() => {
  'use strict';

  // ---------- [Утилиты] ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

  // ---------- [Slider with background / Hero-слайдер] ----------
  document.addEventListener('DOMContentLoaded', () => {
    const slides = [
      {
        title: 'Стационар ASR — забота 24/7',
        subtitle: 'Персональное сопровождение, круглосуточный контроль и современная диагностика. Комфортные палаты с Wi-Fi, ТВ, холодильником и трёхразовым питанием.'
      },
      {
        title: 'Лаборатория — быстро и точно',
        subtitle: 'Биохимия, гормоны, ПЦР и серология. Контроль качества на каждом этапе; экспресс-анализы — результат за 1 час.'
      },
      {
        title: 'Диагностика без лишних ожиданий',
        subtitle: 'УЗИ, ЭЭГ, ЭХОКГ и ЛОР-осмотр. Доказательный подход и понятные рекомендации от специалистов.'
      }
    ];
    let current = 0;
    const titleEl = $('#slider-title');
    const subtitleEl = $('#slider-subtitle');
    if (!titleEl || !subtitleEl) return;

    function showSlide(index) {
      titleEl.classList.remove('fade-in-right', 'fade-out-left');
      subtitleEl.classList.remove('fade-in-right', 'fade-out-left');
      titleEl.textContent = slides[index].title;
      subtitleEl.textContent = slides[index].subtitle;

      if (!prefersReducedMotion) {
        titleEl.classList.add('fade-in-right');
        subtitleEl.classList.add('fade-in-right');
        setTimeout(() => {
          titleEl.classList.remove('fade-in-right');
          subtitleEl.classList.remove('fade-in-right');
          titleEl.classList.add('fade-out-left');
          subtitleEl.classList.add('fade-out-left');
        }, 5000);
      }
    }

    showSlide(current);
    const timer = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 6000);

    window.addEventListener('pagehide', () => clearInterval(timer));
  });

  // ---------- [Information about the hospital / Лайтбокс галереи] ----------
  document.addEventListener('DOMContentLoaded', () => {
    const lightbox = $('#lightbox');
    const lbImg = $('#lb-img');
    const lbClose = $('#lb-close');
    if (!lightbox || !lbImg || !lbClose) return;

    function closeLB() {
      lightbox.classList.remove('flex');
      lightbox.classList.add('hidden');
      lbImg.removeAttribute('src');
    }

    $$('img[data-full]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        lbImg.src = el.dataset.full || el.src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLB();
    });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });
    lbClose.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); closeLB(); });
    lbImg.addEventListener('click', (e) => { e.stopPropagation(); closeLB(); });
  });

  // ---------- [Doctors / Модалка врача] ----------
  const doctors = [
    { photo: 'img/lorvrach.png', name: 'Абдуллаев Мирзажон Адхамович', title: 'ЛОР', schedule: 'Пн–Cб: 08:30–16:00', info: ['+998 (71) 295-55-44'] },
    { photo: 'img/nevropatolog2.png', name: 'Юсупов Зокир Рахмонович', title: 'Невропатолог', schedule: 'Пн–Cб: 08:30–16:00', info: ['+998 (71) 295-55-44'] },
    { photo: 'img/terapevt.png', name: 'Югай Дмитрий Феликсович', title: 'Невропатолог', schedule: 'Пн–Cб: 08:30–16:00', info: ['+998 (71) 295-55-44'] },
    { photo: 'img/kardiolog.png', name: 'Абдуллаев Ахрор Нумонжонович', title: 'Терапевт-Кардиолог', schedule: 'Пн–Cб: 08:30–16:00', info: ['+998 (71) 295-55-44'] },
    { photo: 'img/massaj.png', name: 'Тиништибекова Юлдуз', title: 'Массажист', schedule: 'Пн–Cб: 08:30–16:00', info: ['+998 (71) 295-55-44'] },
    { photo: 'img/uzi.png', name: 'Хошимова Ёдгора Мухитдиновна', title: 'УЗИ', schedule: 'Пн–Cб: 08:30–16:00', info: ['+998 (71) 295-55-44'] },
    { photo: 'img/nevropatolog.png', name: 'Кодирова Фарида Кобулжановна', title: 'Невропатолог', schedule: 'Пн–Cб: 08:30–16:00', info: ['+998 (71) 295-55-44'] },
    { photo: 'img/labvrach.png', name: 'Джалолова Ойдин Шухратовна', title: 'Лаборант-Врач', schedule: 'Пн–Cб: 08:30–16:00', info: ['+998 (71) 295-55-44'] }
  ];

  const modal = document.getElementById('doctor-modal');
  const modalPhoto = document.getElementById('modal-photo');
  const modalName = document.getElementById('modal-name');
  const modalTitle = document.getElementById('modal-title');
  const modalSchedule = document.getElementById('modal-schedule');
  const modalInfo = document.getElementById('modal-info');

  if (modal && modalPhoto && modalName && modalTitle && modalSchedule && modalInfo) {
    document.querySelectorAll('.show-doctor').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = doctors[btn.dataset.index];
        if (!d) return;
        modalPhoto.src = d.photo;
        modalName.textContent = d.name;
        modalTitle.textContent = d.title;
        modalSchedule.textContent = d.schedule;
        modalInfo.innerHTML = d.info.map(i => `<p>• ${i}</p>`).join('');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      });
    });

    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
      }
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
      }
    });
  }

  // ---------- [Lab / Поиск анализов] ----------
  document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('service-search');
    const list = document.getElementById('services-list');
    if (!search || !list) return;

    let labList;
    try { labList = servicesList; } catch (_) { labList = window.servicesList; }
    if (!Array.isArray(labList)) return;

    function renderList(filter = '') {
      const lower = filter.toLowerCase();
      list.innerHTML = labList
        .filter(s => s.toLowerCase().includes(lower))
        .map(s => `<div class="px-4 py-2 first:pt-0 last:pb-0 hover:bg-purple-50 cursor-default text-gray-800">${s}</div>`)
        .join('');
    }

    search.addEventListener('input', () => renderList(search.value.trim()));
    renderList();
  });

  // ---------- [Ultrasound / Поиск УЗИ-услуг] ----------
  document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('usg-search');
    const list = document.getElementById('usg-list');
    if (!search || !list) return;

    let usgList;
    try { usgList = usgServicesList; } catch (_) { usgList = window.usgServicesList; }
    if (!Array.isArray(usgList)) return;

    function renderUSG(filter = '') {
      const lower = filter.toLowerCase();
      list.innerHTML = usgList
        .filter(s => s.toLowerCase().includes(lower))
        .map(s => `<div class="px-4 py-2 first:pt-0 last:pb-0 hover:bg-purple-50 cursor-default text-gray-800">${s}</div>`)
        .join('');
    }

    search.addEventListener('input', () => renderUSG(search.value.trim()));
    renderUSG();
  });

  // ---------- [Footer / Текущий год] ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- [Navbar / Закрытие мобильного меню после клика] ----------
  document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    if (!navToggle) return;
    document.querySelectorAll('#mobile-menu a').forEach(a => {
      a.addEventListener('click', () => { navToggle.checked = false; });
    });
  });
})();
