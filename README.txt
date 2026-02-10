Cleverdi Site (Static)
======================

1) Replace placeholders:
- Phone / WhatsApp / Telegram / Instagram links in contacts.html and footer (all pages).
- Google Drive links in materials.html and course-*.html
- Google Sheets link/embed in schedule.html
- Google Maps embed in contacts.html

2) Hosting:
- Upload folder to any hosting, or use GitHub Pages/Netlify.
- For GitHub Pages: push contents to a repo and enable Pages.

Language:
- RU/KG toggle is saved in browser (localStorage).

Files:
- assets/css/styles.css
- assets/js/main.js


В этой версии:
- Удалены кнопки «Записаться» и «Консультация».
- Удалена страница записи.
- Светлый современный образовательный дизайн.


=== Страница "Студенту" (без бэкенда) ===
Как настроить базу студентов:
1) Создайте Google Таблицу и добавьте заголовки колонок (первая строка):
   id, code, full_name, course, group, status, start_date, schedule, materials, notes
2) Заполните строки студентами.
3) Откройте доступ: "Любой, у кого есть ссылка" (Просмотр).
4) Получите CSV-ссылку:
   - Google Sheets → Файл → Опубликовать в интернете → CSV
   или
   - Ссылка вида .../export?format=csv&gid=XXXX
5) Вставьте ссылку в файл:
   assets/js/students.js → SHEET_CSV_URL = "..."
Как студент ищет себя:
- Вводит Student ID и код (code). Код должен быть уникальным и не угадываемым.


=== Страница admin.html ===
Фронтенд-панель для администратора (без бэкенда).
Вставьте ссылки в assets/js/admin.js:
- SHEET_EDIT_URL — ссылка на редактирование Google Sheets
- FORM_URL — ссылка на Google Form (опционально)
- EMBED_URL — embed ссылка для iframe (опционально)


Оптимизация меню:
- В меню оставлены только: Главная, Курсы, Студенту, Контакты.
- Админ-панель доступна по прямой ссылке: admin.html


Персональные ссылки:
- Профиль: students.html?sid=ID&code=CODE
- Ссылки/материалы: student-links.html?sid=ID&code=CODE
Настройка CSV остаётся в assets/js/config.js (SHEET_CSV_URL).


Страница "Студенты" (students-info.html):
- В меню добавлена вкладка "Студенты".
- Вставьте ссылку на Google Sheets в assets/js/config.js → STUDENTS_SHEET_OPEN_URL.
- (Опционально) Для встроенного просмотра добавьте STUDENTS_SHEET_EMBED_URL.
- Страницы students.html / student-links.html / admin.html остаются доступными по прямой ссылке, но не показываются в меню.
