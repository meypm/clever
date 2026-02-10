
(function(){
  const SHEET_CSV_URL = (window.CLEVERDI_CONFIG && window.CLEVERDI_CONFIG.SHEET_CSV_URL) ? window.CLEVERDI_CONFIG.SHEET_CSV_URL : "PASTE_YOUR_GOOGLE_SHEETS_CSV_LINK_HERE";

  const REQUIRED = ["id","code"];
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
  function normalizeKey(s){ return (s||"").trim().toLowerCase().replace(/\s+/g,"_"); }

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

  function safeHtml(s){
    return String(s||"").replace(/[&<>"']/g, m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
  }

  function renderLinksList(raw){
    const parts = String(raw||"")
      .split(/\s*;\s*|\n+/)
      .map(s=>s.trim())
      .filter(Boolean);
    if(!parts.length) return `<div class="notice">${t("student_links_empty","Ссылки пока не добавлены.")}</div>`;
    const items = parts.map((p, idx)=>{
      const m = p.split("|");
      const label = m.length>1 ? m[0].trim() : p;
      const url = m.length>1 ? m.slice(1).join("|").trim() : p;
      if(/^https?:\/\//i.test(url)){
        return `<li><a href="${safeHtml(url)}" target="_blank" rel="noopener">${safeHtml(label || ("Link " + (idx+1)))}</a></li>`;
      }
      return `<li>${safeHtml(p)}</li>`;
    }).join("");
    return `<ul class="link-list">${items}</ul>`;
  }

  function render(student){
    const blocks = [];
    if(student.materials){
      blocks.push(`
        <div class="card" style="padding:16px;">
          <div class="kicker">${t("student_links_materials","Материалы")}</div>
          <div class="muted" style="margin-top:6px;">${/^https?:\/\//i.test(student.materials) ? `<a href="${safeHtml(student.materials)}" target="_blank" rel="noopener">${safeHtml(student.materials)}</a>` : safeHtml(student.materials)}</div>
        </div>
      `);
    }
    if(student.schedule){
      blocks.push(`
        <div class="card" style="padding:16px;">
          <div class="kicker">${t("student_links_schedule","Расписание")}</div>
          <div class="muted" style="margin-top:6px;">${/^https?:\/\//i.test(student.schedule) ? `<a href="${safeHtml(student.schedule)}" target="_blank" rel="noopener">${safeHtml(student.schedule)}</a>` : safeHtml(student.schedule)}</div>
        </div>
      `);
    }
    blocks.push(`
      <div class="card" style="padding:16px;">
        <div class="kicker">${t("student_links_list","Полезные ссылки")}</div>
        <div style="margin-top:10px;">${renderLinksList(student.links)}</div>
      </div>
    `);

    return `
      <div class="card" style="padding:16px; margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; align-items:flex-start">
          <div>
            <div class="muted" style="font-weight:800">${t("student_links_for","Для студента")}</div>
            <div style="font-weight:900; font-size:18px; margin-top:6px">${safeHtml(student.full_name || student.id)}</div>
            <div class="muted" style="margin-top:4px">${t("students_id","ID")}: <strong>${safeHtml(student.id)}</strong></div>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end;">
            <a class="btn" href="students.html?sid=${encodeURIComponent(student.id)}&code=${encodeURIComponent(student.code)}">${t("student_links_back_profile","Профиль")}</a>
          </div>
        </div>
      </div>
      <div class="grid-2" style="gap:14px;">
        ${blocks.join("")}
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

  async function doSearch(sid, code){
    const resEl = document.getElementById("studentLinksResult");
    resEl.innerHTML = `<div class="notice">${t("students_loading","Загрузка...")}</div>`;
    try{
      const items = await fetchStudents();
      const found = items.find(it => (it.id||"").trim().toLowerCase() === sid.toLowerCase()
                               && (it.code||"").trim() === code);
      resEl.innerHTML = found ? render(found) : renderError("NOT_FOUND");
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
      .link-list{ margin:0; padding-left:18px; }
      .link-list li{ margin:6px 0; }
      .link-list a{ text-decoration: underline; }
      @media (max-width: 820px){
        .form-grid{ grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    injectStyles();

    // Prefill from URL
    try{
      const p = new URLSearchParams(location.search);
      const sid = p.get("sid");
      const code = p.get("code");
      if(sid) document.getElementById("sid2").value = sid;
      if(code) document.getElementById("scode2").value = code;

      const back = document.getElementById("backToProfile");
      if(back && sid && code) back.href = `students.html?sid=${encodeURIComponent(sid)}&code=${encodeURIComponent(code)}`;

      if(sid && code){
        setTimeout(()=>doSearch(sid, code), 60);
      }
    }catch(e){}

    const form = document.getElementById("studentLinksForm");
    if(form){
      form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const sid = (document.getElementById("sid2").value || "").trim();
        const code = (document.getElementById("scode2").value || "").trim();
        doSearch(sid, code);
      });
    }
  });
})();
