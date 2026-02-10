
(function(){
  const SHEET_CSV_URL = (window.CLEVERDI_CONFIG && window.CLEVERDI_CONFIG.SHEET_CSV_URL) ? window.CLEVERDI_CONFIG.SHEET_CSV_URL : "PASTE_YOUR_GOOGLE_SHEETS_CSV_LINK_HERE"; // TODO

  const REQUIRED = ["id","code"];
  const FIELD_LABELS = {
    full_name: {ru:"ФИО", kg:"Аты-жөнү"},
    course: {ru:"Курс", kg:"Курс"},
    group: {ru:"Группа", kg:"Группа"},
    status: {ru:"Статус", kg:"Статус"},
    start_date: {ru:"Дата начала", kg:"Башталган күнү"},
    schedule: {ru:"Расписание", kg:"Расписание"},
    materials: {ru:"Материалы", kg:"Материалдар"},
    links: {ru:"Ссылки", kg:"Шилтемелер"},
    notes: {ru:"Примечания", kg:"Эскертүү"}
  };

  function lang(){
    try { return window.CleverdiLang ? window.CleverdiLang.get() : (localStorage.getItem("lang") || "ru"); }
    catch(e){ return "ru"; }
  }
  function t(key, fallback){
    const l = lang();
    const dict = window.__i18n || {};
    return (dict[l] && dict[l][key]) ? dict[l][key] : (fallback || key);
  }

  function csvToRows(csvText){
    const rows = [];
    let row = [], cur = "", inQuotes = false;
    for(let i=0;i<csvText.length;i++){
      const ch = csvText[i];
      const next = csvText[i+1];
      if(ch === '"'){
        if(inQuotes && next === '"'){ cur += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if(ch === "," && !inQuotes){
        row.push(cur); cur = "";
      } else if((ch === "\n" || ch === "\r") && !inQuotes){
        if(ch === "\r" && next === "\n") i++;
        row.push(cur);
        if(row.some(v=>v.trim()!=="")) rows.push(row);
        row = []; cur = "";
      } else {
        cur += ch;
      }
    }
    row.push(cur);
    if(row.some(v=>v.trim()!=="")) rows.push(row);
    return rows;
  }

  function normalizeKey(s){
    return (s||"").trim().toLowerCase().replace(/\s+/g,"_");
  }

  async function fetchStudents(){
    if(!SHEET_CSV_URL || SHEET_CSV_URL.includes("PASTE_YOUR")) throw new Error("SHEET_NOT_SET");
    const res = await fetch(SHEET_CSV_URL, {cache:"no-store"});
    if(!res.ok) throw new Error("FETCH_FAILED");
    const text = await res.text();
    const rows = csvToRows(text);
    if(rows.length < 2) return [];
    const headers = rows[0].map(normalizeKey);
    const items = rows.slice(1).map(r=>{
      const obj = {};
      headers.forEach((h, idx)=> obj[h] = (r[idx]||"").trim());
      return obj;
    });
    return items.filter(it=> REQUIRED.every(k => (it[k]||"").trim()!==""));
  }

function renderLinksList(raw){
  const parts = String(raw||"")
    .split(/\s*;\s*|\n+/)
    .map(s=>s.trim())
    .filter(Boolean);
  if(!parts.length) return "";
  const safe = (s)=> String(s||"").replace(/[&<>"']/g, m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
  const items = parts.map((p, idx)=>{
    // Support "Название|https://..." format
    const m = p.split("|");
    const label = m.length>1 ? m[0].trim() : p;
    const url = m.length>1 ? m.slice(1).join("|").trim() : p;
    if(/^https?:\/\//i.test(url)){
      return `<li><a href="${safe(url)}" target="_blank" rel="noopener">${safe(label || ("Link " + (idx+1)))}</a></li>`;
    }
    return `<li>${safe(p)}</li>`;
  }).join("");
  return `<ul class="link-list">${items}</ul>`;
}

  function renderCard(student){
    const linksBlock = (student && student.links) ? (
      `<div class="card" style="padding:14px; margin-top:12px; background: rgba(255,255,255,.84)">`
      + `<div class="kicker">${t("students_links_title","Мои ссылки")}</div>`
      + `<div style="margin-top:10px;">${renderLinksList(student.links) || `<div class=\"muted\">${t("students_links_empty","Ссылки пока не добавлены.")}</div>`}</div>`
      + `</div>`
    ) : "";

    const l = lang();
    const safe = (s)=> String(s||"").replace(/[&<>"']/g, m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
    const pairs = [];
    ["full_name","course","group","status","start_date","schedule","materials","notes"].forEach(k=>{
      if(student[k]){
        const label = FIELD_LABELS[k] ? FIELD_LABELS[k][l] : k;
        let val = safe(student[k]);
        if(k==="links"){
          const list = renderLinksList(student[k]);
          if(list) val = list;
        } else if(/^https?:\/\//i.test(student[k])){
          val = `<a href="${safe(student[k])}" target="_blank" rel="noopener">${val}</a>`;
        }
        pairs.push(`<div class="kv"><div class="k">${label}</div><div class="v">${val}</div></div>`);
      }
    });

    return `
      <div class="card" style="padding:16px;">
        <div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start; flex-wrap:wrap">
          <div>
            <div class="kicker">${t("students_found","Данные студента")}</div>
            <div style="font-weight:900; font-size:18px; margin-top:6px">${safe(student.full_name || student.id)}</div>
            <div class="muted" style="margin-top:4px">${t("students_id","ID")}: <strong>${safe(student.id)}</strong></div>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end;">
            <a class="btn" href="courses.html">${t("students_back","К курсам")}</a>
            <a class="btn primary" href="student-links.html?sid=${encodeURIComponent(student.id)}&code=${encodeURIComponent(student.code)}">${t("students_links_btn","Мои ссылки")}</a>
          </div>
        </div>
        <div class="kv-grid" style="margin-top:12px">
          ${pairs.join("")}
        </div>

        ${linksBlock}
      </div>
    `;
  }

  function renderError(kind){
    const map = {
      SHEET_NOT_SET: t("students_admin_setup","Администратор ещё не подключил таблицу студентов. Проверьте настройки."),
      FETCH_FAILED: t("students_load_error","Не удалось загрузить данные. Попробуйте позже."),
      NOT_FOUND: t("students_not_found","Студент не найден. Проверьте ID и код.")
    };
    return `<div class="notice">${map[kind] || t("students_load_error","Ошибка")}</div>`;
  }

  async function onSubmit(e){
    e.preventDefault();
    const resEl = document.getElementById("studentResult");
    resEl.innerHTML = `<div class="notice">${t("students_loading","Загрузка...")}</div>`;

    const sid = (document.getElementById("sid").value || "").trim();
    const scode = (document.getElementById("scode").value || "").trim();

    try{
      const items = await fetchStudents();
      const found = items.find(it => (it.id||"").trim().toLowerCase() === sid.toLowerCase()
                               && (it.code||"").trim() === scode);
      resEl.innerHTML = found ? renderCard(found) : renderError("NOT_FOUND");
    }catch(err){
      resEl.innerHTML = renderError((err && err.message) ? err.message : "FETCH_FAILED");
    }
  }

  function injectStyles(){
    const style = document.createElement("style");
    style.textContent = `
      .form-grid{ display:grid; grid-template-columns: 1fr 1fr auto; gap:12px; }
      .label{ display:block; font-weight:800; color: var(--muted); font-size: 13px; margin: 0 0 6px; }
      .input{ width:100%; padding:12px 12px; border:1px solid var(--line); border-radius:12px; background:#fff; outline:none; }
      .input:focus{ box-shadow: 0 0 0 4px rgba(43,108,176,.12); border-color: rgba(43,108,176,.35); }
      .kv-grid{ display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:12px; }
      .kv{ border:1px solid var(--line); border-radius:14px; padding:12px; background: rgba(255,255,255,.92); }
      .kv .k{ font-size:12px; font-weight:800; color: var(--muted); margin-bottom:6px; }
      .kv .v{ font-weight:750; color: var(--text); overflow-wrap:anywhere; }
      .link-list{ margin:0; padding-left:18px; }
      .link-list li{ margin:6px 0; }
      .link-list a{ text-decoration: underline; }

      @media (max-width: 820px){
        .form-grid{ grid-template-columns: 1fr; }
        .kv-grid{ grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    // Prefill from URL: students.html?sid=...&code=...
    try{
      const p = new URLSearchParams(location.search);
      const sid = p.get('sid');
      const code = p.get('code');
      if(sid) document.getElementById('sid').value = sid;
      if(code) document.getElementById('scode').value = code;
      if(sid && code){
        // Auto-search
        setTimeout(()=>{ document.getElementById('studentForm').requestSubmit(); }, 60);
      }
    }catch(e){}

    injectStyles();
    const form = document.getElementById("studentForm");
    if(form) form.addEventListener("submit", onSubmit);
  });
})();
