(function(){
  const DEFAULT_LANG = "ru";
  const LANG_KEY = "cleverdi_lang";

  const translations = {
    ru: {
      nav_home: "Главная",
      nav_about: "О центре",
      nav_courses: "Курсы",
      students_info_embed_note: "Если embed не задан — блок автоматически скрывается.",
      students_info_embed_text: "Если вы добавите embed-ссылку, таблица будет показываться прямо здесь.",
      students_info_embed_title: "Встроенный просмотр (опционально)",
      students_info_links_format: "Формат links: несколько ссылок через ; или Название|https://... (пример: Домашка|https://...; Материалы|https://...)",
      students_info_columns_text: "Скопируйте строку ниже в первую строку Google Sheets (заголовки колонок):",
      students_info_columns_title: "Колонки таблицы",
      students_info_hint: "Вставьте ссылку в assets/js/config.js → STUDENTS_SHEET_OPEN_URL. Если хотите встроить просмотр — добавьте STUDENTS_SHEET_EMBED_URL.",
      students_info_copy: "Скопировать ссылку",
      students_info_open_sheet: "Открыть таблицу",
      students_info_link_label: "Ссылка на таблицу:",
      students_info_sheet_text: "Откройте таблицу и добавляйте/обновляйте студентов. В поле links можно указать несколько ссылок.",
      students_info_sheet_title: "Таблица студентов (Google Sheets)",
      students_info_lead: "На этой странице вы храните и обновляете данные студентов в Google Sheets. Просто вставьте ссылку на таблицу — и используйте поле links для персональных ссылок (материалы, домашка, чат группы и т.д.).",
      students_info_h1: "Студенты и персональные ссылки",
      students_info_kicker: "Информация",
      page_students_info_title: "Cleverdi — Студенты",
      nav_students_info: "Студенты",
      nav_materials: "Материалы",
      nav_schedule: "Расписание",
      nav_certs: "Сертификаты",
      nav_contacts: "Контакты",
    student_links_for: "Для студента",
    student_links_list: "Полезные ссылки",
    student_links_schedule: "Расписание",
    student_links_materials: "Материалы",
    student_links_empty: "Ссылки пока не добавлены.",
    students_links_btn: "Мои ссылки",
    students_links_empty: "Ссылки пока не добавлены.",
    students_links_title: "Мои ссылки",
    student_links_back_profile: "Вернуться в профиль",
    student_links_note: "Если ссылки не отображаются — проверьте ID/код или напишите администратору.",
    student_links_lead: "Здесь собраны ваши персональные ссылки: материалы, расписание и полезные ресурсы.",
    student_links_h1: "Мои ссылки и материалы",
    student_links_kicker: "Студенту",
    page_student_links_title: "Cleverdi — Ссылки студента",
    admin_embed_note: "Если embed не задан — этот блок скрывается автоматически.",
    admin_embed_text: "Если вы используете Google Form для добавления/обновления студентов — вставьте embed-ссылку, и форма появится ниже.",
    admin_embed_title: "Встроенная форма (опционально)",
    admin_links_format: "Поле links: можно несколько ссылок через ;  или в формате Название|https://... (например: Домашка|https://...; Папка|https://...)",
    admin_columns_text: "Скопируйте строку ниже в первую строку Google Sheets (заголовки колонок):",
    admin_columns_title: "Структура таблицы (колонки)",
    admin_copy: "Скопировать",
    admin_result_label: "Готовая ссылка:",
    admin_generate: "Сгенерировать",
    admin_student_link_text: "Сгенерируйте ссылку студенту вида students.html?sid=...&code=... и отправьте в WhatsApp.",
    admin_student_link_title: "Ссылка студенту (персональная)",
    admin_hint: "Ссылки на таблицу/форму вставляются в файле assets/js/admin.js",
    admin_open_form: "Открыть форму",
    admin_open_sheet: "Открыть таблицу",
    admin_links_text: "Откройте таблицу, добавьте/обновите строки студентов и поле links. Можно также использовать Google Form для удобного ввода.",
    admin_links_title: "Внести/обновить данные в Google Sheets",
    admin_lead: "Это фронтенд-страница для работы с Google Sheets/Forms. Вы сами вставляете ссылки на таблицу и форму — без бэкенда.",
    admin_h1: "Управление студентами и ссылками",
    admin_kicker: "Администратору",
    page_admin_title: "Cleverdi — Администратору",
    nav_admin: "Админу",
    students_back: "К курсам",
    students_id: "ID",
    students_found: "Данные студента",
    students_admin_setup: "Администратор ещё не подключил таблицу студентов. Проверьте настройки.",
    students_load_error: "Не удалось загрузить данные. Попробуйте позже.",
    students_not_found: "Студент не найден. Проверьте ID и код.",
    students_loading: "Загрузка...",
    students_note: "Если не знаете свой ID или код — напишите администратору учебного центра.",
    students_find_btn: "Найти",
    students_code_label: "Код доступа",
    students_id_label: "Student ID",
    students_lead: "Введите ваш Student ID и код доступа. После этого вы увидите свои данные (курс, группа, статус и ссылки).",
    students_h1: "Найти информацию о себе",
    students_kicker: "Студенту",
    page_students_title: "Cleverdi — Студенту",
    nav_students: "Студенту",
      cta_materials: "Материалы",
      cta_courses: "Смотреть курсы",
      nav_enroll: "Запись",      hero_kicker: "Cleverdi — учебный центр",
      hero_title: "Язык • Интеллект • Личностный рост",
      hero_lead: "Современная академия развития: английский язык, искусственный интеллект и личностное развитие. Материалы и расписание доступны на сайте, а учебные файлы — по ссылкам Google Drive.",
      hero_badge_1: "Онлайн и офлайн",
      hero_badge_2: "Практика и задания",
      hero_badge_3: "Материалы в Google Drive",
      hero_badge_4: "Сертификат",
      side_title: "Что будет на сайте",
      side_p: "Структура чуть сложнее обычного сайта: отдельные страницы курсов, материалы и расписание — поэтому важно сделать удобную навигацию и единый дизайн.",
      side_li1: "Страницы курсов с программой, длительностью и стоимостью",
      side_li2: "Раздел материалов с ссылками на лекции/презентации",
      side_li3: "Расписание (таблица или Google Sheets)",
      sec_courses_h2: "Популярные направления",
      sec_courses_p: "Примеры курсов — можно добавить новые в любой момент (достаточно создать страницу и вставить ссылки).",
      course_tag_lang: "Язык",
      course_tag_ai: "Технологии",
      course_tag_growth: "Развитие",
      course_en_title: "Английский язык",
      course_en_desc: "Разговорная практика, грамматика и уверенность в общении.",
      course_ai_title: "Искусственный интеллект",
      course_ai_desc: "Понимание AI-инструментов и применение в учёбе и работе.",
      course_gr_title: "Личностное развитие",
      course_gr_desc: "Осознанность, мышление, дисциплина и рост.",
      meta_format: "Формат",
      meta_duration: "Длительность",
      meta_level: "Уровень",
      format_mix: "онлайн/офлайн",
      duration_2m: "2 месяца",
      level_all: "с нуля",
      sec_how_h2: "Как устроены материалы",
      sec_how_p: "Мы используем Google-ссылки — удобно обновлять и не требует сложного обслуживания.",
      how1_h3: "Лекции и презентации",
      how1_p: "Хранятся в Google Drive (папки по курсам).",
      how2_h3: "Запись на обучение",
      how2_p: "Осуществляется через Google Form — заявки приходят автоматически.",
      how3_h3: "Расписание",
      how3_p: "Можно вести в Google Sheets и показывать на сайте.",
      sec_contact_h2: "Контакты",
      sec_contact_p: "Свяжитесь с нами по телефону или в соцсетях — подскажем по курсам и расписанию.",
      contact_note: "Замените контакты, карту и ссылки на формы/диск на свои.",
      page_title_courses: "Курсы",
      page_title_materials: "Материалы",
      page_title_schedule: "Расписание",
      page_title_certs: "Сертификаты",
      page_title_contacts: "Контакты",
      page_title_about: "О центре",      about_p1: "Cleverdi — современная академия развития, где сочетаются язык, интеллект и личностный рост.",
      about_p2: "Обучение практико-ориентированное: теория + задания, а материалы доступны по ссылкам.",      materials_p: "Ниже — кнопки на папки Google Drive. Достаточно заменить ссылки.",
      schedule_p: "Ниже — вариант таблицы или встроенная Google таблица.",
      certs_p: "Разместите образец сертификата и условия получения.",
      contacts_p: "Укажите адрес, телефон, WhatsApp/Telegram/Instagram и карту.",
      footer_right: "Документы • Публичная оферта • Политика",
      footer_copy: "© Cleverdi Academy. Все права защищены."
    },
    kg: {

      nav_home: "Башкы бет",
      nav_about: "Борбор тууралуу",
      nav_courses: "Курстар",
      students_info_embed_note: "Embed берилбесе — блок жашырылат.",
      students_info_embed_text: "Embed шилтеме кошсоңуз — таблица ушул жерде көрүнөт.",
      students_info_embed_title: "Ичине көрсөтүү (кошумча)",
      students_info_links_format: "links форматы: бир нече шилтеме үчүн ; же Название|https://... (мисалы: Үй тапшырма|https://...; Материалдар|https://...)",
      students_info_columns_text: "Төмөнкү сапты Google Sheetsтин биринчи сапына (колонка аттары) катары коюңуз:",
      students_info_columns_title: "Таблицанын колонкалары",
      students_info_hint: "Шилтемени assets/js/config.js → STUDENTS_SHEET_OPEN_URL жерине коюңуз. Көрсөтүп коюу үчүн STUDENTS_SHEET_EMBED_URL кошсоңуз болот.",
      students_info_copy: "Шилтемени көчүрүү",
      students_info_open_sheet: "Таблицаны ачуу",
      students_info_link_label: "Таблица шилтемеси:",
      students_info_sheet_text: "Таблицаны ачып, студенттерди кошуп/жаңылаңыз. links талаасына бир нече шилтеме жазса болот.",
      students_info_sheet_title: "Студенттер таблицасы (Google Sheets)",
      students_info_lead: "Бул бетте студенттердин маалыматтарын Google Sheets'те сактап, жаңылайсыз. Таблицага шилтемени коюңуз — ал эми links талаасына жеке шилтемелерди жазсаңыз болот (материалдар, үй тапшырма, группа чаты ж.б.).",
      students_info_h1: "Студенттер жана жеке шилтемелер",
      students_info_kicker: "Маалымат",
      page_students_info_title: "Cleverdi — Студенттер",
      nav_students_info: "Студенттер",
      nav_materials: "Материалдар",
      nav_schedule: "Расписание",
      nav_certs: "Сертификаттар",
      nav_contacts: "Байланыш",
    student_links_for: "Студент үчүн",
    student_links_list: "Пайдалуу шилтемелер",
    student_links_schedule: "Расписание",
    student_links_materials: "Материалдар",
    student_links_empty: "Азырынча шилтемелер кошула элек.",
    students_links_btn: "Шилтемелерим",
    students_links_empty: "Азырынча шилтемелер кошула элек.",
    students_links_title: "Шилтемелерим",
    student_links_back_profile: "Профилге кайтуу",
    student_links_note: "Шилтемелер чыкпай жатса — ID/кодду текшериңиз же администраторго жазыңыз.",
    student_links_lead: "Бул жерде сиздин жеке шилтемелер: материалдар, расписание жана пайдалуу ресурстар.",
    student_links_h1: "Менин шилтемелерим",
    student_links_kicker: "Студентке",
    page_student_links_title: "Cleverdi — Студент шилтемелери",
    admin_embed_note: "Embed коюлбаса — бул блок жашырылат.",
    admin_embed_text: "Эгер Google Form колдонсоңуз — embed шилтемени коюңуз, форма төмөндө чыгат.",
    admin_embed_title: "Форма (кошумча)",
    admin_links_format: "links талаасы: бир нече шилтеме үчүн ; колдонсоңуз болот же Название|https://... форматында.",
    admin_columns_text: "Төмөндөгү сапты Google Sheetsтин биринчи сапына (колонка аттары) катары коюңуз:",
    admin_columns_title: "Таблицанын колонкалары",
    admin_copy: "Көчүрүү",
    admin_result_label: "Шилтеме:",
    admin_generate: "Түзүү",
    admin_student_link_text: "students.html?sid=...&code=... формасында шилтеме түзүп, WhatsApp аркылуу жөнөтүңүз.",
    admin_student_link_title: "Студентке жеке шилтеме",
    admin_hint: "Таблица/форма шилтемелерин assets/js/admin.js файлына коюңуз",
    admin_open_form: "Форманы ачуу",
    admin_open_sheet: "Таблицаны ачуу",
    admin_links_text: "Таблицаны ачып, студенттердин саптарын жана links талаасын жаңылаңыз. Кааласаңыз Google Form колдонсоңуз болот.",
    admin_links_title: "Google Sheetsке маалымат киргизүү",
    admin_lead: "Бул Google Sheets/Forms менен иштөө үчүн фронтенд-бет. Силер өзүңөр шилтемелерди коёсуздар — бэкенд жок.",
    admin_h1: "Студенттер жана шилтемелер",
    admin_kicker: "Админге",
    page_admin_title: "Cleverdi — Админге",
    nav_admin: "Админге",
    students_back: "Курстарга",
    students_id: "ID",
    students_found: "Студент маалыматтары",
    students_admin_setup: "Администратор таблицаны туташтыра элек. Орнотууларды текшериңиз.",
    students_load_error: "Маалыматты жүктөө мүмкүн болбой калды. Кийинчерээк аракет кылыңыз.",
    students_not_found: "Студент табылган жок. ID жана кодду текшериңиз.",
    students_loading: "Жүктөлүүдө...",
    students_note: "ID же кодду билбесеңиз — администраторго жазыңыз.",
    students_find_btn: "Табуу",
    students_code_label: "Кирүү коду",
    students_id_label: "Student ID",
    students_lead: "Student ID жана кирүү кодун жазыңыз. Андан кийин сиздин маалыматтар көрсөтүлөт.",
    students_h1: "Өзүңүз тууралуу маалымат табуу",
    students_kicker: "Студентке",
    page_students_title: "Cleverdi — Студентке",
    nav_students: "Студентке",
      cta_materials: "Материалдар",
      cta_courses: "Курстарды көрүү",
      nav_enroll: "Катталуу",      hero_kicker: "Cleverdi — окуу борбору",
      hero_title: "Тил • Интеллект • Жеке өсүү",
      hero_lead: "Заманбап өнүгүү академиясы: англис тили, жасалма интеллект жана жеке өнүгүү. Материалдар жана расписание сайтта, ал эми окуу файлдары Google Drive шилтемелери аркылуу берилет.",
      hero_badge_1: "Онлайн жана офлайн",
      hero_badge_2: "Практика жана тапшырмалар",
      hero_badge_3: "Google Drive материалдар",
      hero_badge_4: "Сертификат",
      side_title: "Сайтта эмне болот",
      side_p: "Кадимки маалыматтык сайтка караганда бир аз татаалыраак: курстардын өзүнчө беттери, материалдар жана расписание — ошондуктан ыңгайлуу навигация жана бирдиктүү дизайн керек.",
      side_li1: "Курстардын беттери: программа, узактыгы, баасы",
      side_li2: "Материалдар бөлүмү: лекция/презентация шилтемелери",
      side_li3: "Расписание (таблица же Google Sheets)",
      sec_courses_h2: "Негизги багыттар",
      sec_courses_p: "Курстарды кийин көбөйтүүгө болот (бет кошуп, шилтемелерди киргизүү жетиштүү).",
      course_tag_lang: "Тил",
      course_tag_ai: "Технология",
      course_tag_growth: "Өнүгүү",
      course_en_title: "Англис тили",
      course_en_desc: "Сүйлөшүү практикасы, грамматика жана ишеним.",
      course_ai_title: "Жасалма интеллект",
      course_ai_desc: "AI куралдарын түшүнүү жана окууда/иште колдонуу.",
      course_gr_title: "Жеке өнүгүү",
      course_gr_desc: "Аң-сезим, ой жүгүртүү, тартип жана өсүү.",
      meta_format: "Формат",
      meta_duration: "Узактыгы",
      meta_level: "Деңгээли",
      format_mix: "онлайн/офлайн",
      duration_2m: "2 ай",
      level_all: "нөлдөн",
      sec_how_h2: "Материалдар кантип уюштурулат",
      sec_how_p: "Google шилтемелерди колдонобуз — жаңыртуу жеңил жана татаал тейлөө талап кылбайт.",
      how1_h3: "Лекция жана презентациялар",
      how1_p: "Google Drive ичинде (курстар боюнча папкалар).",
      how2_h3: "Окууга катталуу",
      how2_p: "Google Form аркылуу — заявкалар автоматтык келет.",
      how3_h3: "Расписание",
      how3_p: "Google Sheetsте жүргүзүп, сайтта көрсөтөбүз.",
      sec_contact_h2: "Байланыш",
      sec_contact_p: "Телефон же соцтармактар аркылуу байланышыңыз — курстар жана расписание тууралуу айтып беребиз.",
      contact_note: "Контакттарды, картаны жана форма/диск шилтемелерин өзүңүздүкүнө алмаштырыңыз.",
      page_title_courses: "Курстар",
      page_title_materials: "Материалдар",
      page_title_schedule: "Расписание",
      page_title_certs: "Сертификаттар",
      page_title_contacts: "Байланыш",
      page_title_about: "Борбор тууралуу",      about_p1: "Cleverdi — тил, интеллект жана жеке өсүүнү бириктирген заманбап өнүгүү академиясы.",
      about_p2: "Окутуу практика багытында: теория + тапшырмалар, материалдар шилтеме аркылуу берилет.",      materials_p: "Төмөндө Google Drive папкаларына кнопкалар бар. Шилтемелерди алмаштырсаңыз жетиштүү.",
      schedule_p: "Төмөндө таблица варианты же Google таблицасын киргизүү.",
      certs_p: "Сертификат үлгүсүн жана алуу шарттарын жайгаштырыңыз.",
      contacts_p: "Дарек, телефон, WhatsApp/Telegram/Instagram жана картаны көрсөтүңүз.",
      footer_right: "Документтер • Оферта • Саясат",
      footer_copy: "© Cleverdi Academy. Бардык укуктар корголгон."
    }
  };

  function setLang(lang){
    if(!translations[lang]) lang = DEFAULT_LANG;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      const val = translations[lang][key];
      if(typeof val === "string"){
        el.textContent = val;
      }
    });

    document.querySelectorAll(".lang button").forEach(btn=>{
      btn.classList.toggle("active", btn.dataset.lang === lang);
      btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true":"false");
    });
  }

  function currentLang(){
    return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
  }

  // Burger menu
  function initBurger(){
    const burger = document.querySelector("[data-burger]");
    const menu = document.querySelector("[data-mobilemenu]");
    if(!burger || !menu) return;
    burger.addEventListener("click", ()=>{
      menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", menu.classList.contains("open") ? "true":"false");
    });
    // Close on link click
    menu.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click", ()=> menu.classList.remove("open"));
    });
  }

  // Active link
  function initActive(){
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navlinks a, .mobilemenu a").forEach(a=>{
      const href = a.getAttribute("href");
      if(href === path) a.classList.add("active");
    });
  }

  // Language buttons
  function initLang(){
    document.querySelectorAll(".lang button").forEach(btn=>{
      btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
    });
    setLang(currentLang());
  }

  // Highlight active nav link based on current page
  function setActiveNav(){
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const links = document.querySelectorAll('.navlinks a, .mobilemenu a');
    links.forEach(a=>{
      const href = (a.getAttribute("href")||"").toLowerCase();
      if(href && href === file){
        a.classList.add("active");
      } else {
        a.classList.remove("active");
      }
    });
  }


document.addEventListener("DOMContentLoaded", ()=>{
    setActiveNav();

    initBurger();
    initActive();
    initLang();
  });
})();

// WA_FLOAT: floating WhatsApp booking button
(function(){
  const WA_PHONE = "996700000000"; // TODO: replace with your number 996XXXXXXXXX
  const WA_TEXT = "Здравствуйте! Хочу записаться на курс";
  function addWhatsAppButton(){
    const a = document.createElement("a");
    a.className = "wa-float";
    a.setAttribute("href", `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_TEXT)}`);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
    a.setAttribute("aria-label", "Записаться в WhatsApp");
    a.innerHTML = `
          <span class="wa-tip">Записаться</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.18"/>
            <path fill="currentColor" d="M7.2 7.3h9.6c.66 0 1.2.54 1.2 1.2v6.2c0 .66-.54 1.2-1.2 1.2H11l-3.8 2.1.9-2.1H7.2c-.66 0-1.2-.54-1.2-1.2V8.5c0-.66.54-1.2 1.2-1.2z"/>
            <text x="12" y="13.9" text-anchor="middle" font-size="7.5" font-family="system-ui,Segoe UI,Arial" font-weight="800" fill="currentColor">WA</text>
          </svg>`;
    document.body.appendChild(a);
  }
  if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addWhatsAppButton);
  } else {
    addWhatsAppButton();
  }
})();
