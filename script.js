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
  const titleEl = document.getElementById('slider-title');
  const subtitleEl = document.getElementById('slider-subtitle');

  function showSlide(index) {
    titleEl.classList.remove('fade-in-right', 'fade-out-left');
    subtitleEl.classList.remove('fade-in-right', 'fade-out-left');

    titleEl.replaceChildren();
    subtitleEl.replaceChildren();

    titleEl.textContent = slides[index].title;
    subtitleEl.textContent = slides[index].subtitle;
    titleEl.classList.add('fade-in-right');
    subtitleEl.classList.add('fade-in-right');
    setTimeout(() => {
      titleEl.classList.remove('fade-in-right');
      subtitleEl.classList.remove('fade-in-right');
      titleEl.classList.add('fade-out-left');
      subtitleEl.classList.add('fade-out-left');
    }, 5000);
  }

  showSlide(current);
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 6000);
});



document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');
  const lbClose  = document.getElementById('lb-close');
  if (!lightbox || !lbImg || !lbClose) return;

  document.querySelectorAll('img[data-full]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      lbImg.src = el.dataset.full || el.src;
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
    });
  });

  const closeLB = () => {
    lightbox.classList.remove('flex');
    lightbox.classList.add('hidden');
    lbImg.removeAttribute('src');
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLB();
  });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });
  lbClose.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); closeLB(); });
  lbImg.addEventListener('click', (e) => { e.stopPropagation(); closeLB(); });
});



const doctors = [
  {
    photo: 'lorvrach.png', name: 'Абдуллаев Мирзажон Адхамович', title: 'ЛОР',
    schedule: 'Пн–Cб: 08:30–16:00', info: ["+998 (71) 295-55-44"]
  },
  {
    photo: 'nevropatolog2.png', name: 'Юсупов Зокир Рахмонович', title: 'Невропатолог',
    schedule: 'Пн–Cб: 08:30–16:00', info: ["+998 (71) 295-55-44"]
  },
  {
    photo: 'terapevt.png', name: 'Югай Дмитрий Феликсович', title: 'Невропатолог',
    schedule: 'Пн–Cб: 08:30–16:00', info: ["+998 (71) 295-55-44"]
  },
  {
    photo: 'kardiolog.png', name: 'Абдуллаев Ахрор Нумонжонович', title: 'Терапевт-Кардиолог',
    schedule: 'Пн–Cб: 08:30–16:00', info: ["+998 (71) 295-55-44"]
  },
  {
    photo: 'massaj.png', name: 'Тиништибекова Юлдуз', title: 'Массажист',
    schedule: 'Пн–Cб: 08:30–16:00', info: ["+998 (71) 295-55-44"]
  },
  {
    photo: 'uzi.png', name: 'Хошимова Ёдгора Мухитдиновна', title: 'УЗИ',
    schedule: 'Пн–Cб: 08:30–16:00', info: ["+998 (71) 295-55-44"]
  },
  {
    photo: 'nevropatolog.png', name: 'Кодирова Фарида Кобулжановна', title: 'Невропатолог',
    schedule: 'Пн–Cб: 08:30–16:00', info: ["+998 (71) 295-55-44"]
  },
  {
    photo: 'labvrach.png', name: 'Джалолова Ойдин Шухратовна', title: 'Лаборант-Врач',
    schedule: 'Пн–Cб: 08:30–16:00', info: ["+998 (71) 295-55-44"]
  }
];

const modal = document.getElementById('doctor-modal');
const modalPhoto = document.getElementById('modal-photo');
const modalName = document.getElementById('modal-name');
const modalTitle = document.getElementById('modal-title');
const modalSchedule = document.getElementById('modal-schedule');
const modalInfo = document.getElementById('modal-info');

document.querySelectorAll('.show-doctor').forEach(btn => {
  btn.addEventListener('click', () => {
    const d = doctors[btn.dataset.index];
    modalPhoto.src = d.photo;
    modalName.textContent = d.name;
    modalTitle.textContent = d.title;
    modalSchedule.textContent = d.schedule;
    modalInfo.innerHTML = d.info.map(i => `<p>• ${i}</p>`).join('');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });
});
document.getElementById('modal-close').addEventListener('click', () => {
  modal.classList.remove('flex');
  modal.classList.add('hidden');
});




document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('service-search');
  const list = document.getElementById('services-list');

  function renderList(filter = '') {
    const lower = filter.toLowerCase();
    list.innerHTML = servicesList
      .filter(s => s.toLowerCase().includes(lower))   // ищем по любому вхождению
      .map(s => `<div class="py-2 px-4 hover:bg-purple-50 cursor-default text-gray-800">${s}</div>`)
      .join('');
  }

  search.addEventListener('input', () => renderList(search.value.trim()));
  renderList(); // показать всё при загрузке
});


document.addEventListener('DOMContentLoaded', () => {
  // Поисковик УЗИ — та же логика, что и у лаборатории, но с уникальными id и массивом
  const search = document.getElementById('usg-search');
  const list = document.getElementById('usg-list');

  function renderUSG(filter = '') {
    const lower = filter.toLowerCase();
    list.innerHTML = usgServicesList
      .filter(s => s.toLowerCase().includes(lower))   // поиск по любому вхождению
      .map(s => `<div class="py-2 px-4 hover:bg-purple-50 cursor-default text-gray-800">${s}</div>`)
      .join('');
  }

  search.addEventListener('input', () => renderUSG(search.value.trim()));
  renderUSG(); // стартовый рендер
});


document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  document.querySelectorAll('#mobile-menu a').forEach(a => {
    a.addEventListener('click', () => { if (navToggle) navToggle.checked = false; });
  });
});
