
(function(){
  // TODO: paste your links here
  const SHEET_EDIT_URL = "PASTE_GOOGLE_SHEET_EDIT_LINK_HERE";
  const FORM_URL = "PASTE_GOOGLE_FORM_LINK_HERE"; // optional (for adding/updating rows)
  const EMBED_URL = "PASTE_GOOGLE_FORM_EMBED_URL_HERE"; // optional (iframe src)

  function $(q){ return document.querySelector(q); }
  function setHref(id, url){
    const el = $(id);
    if(!el) return;
    if(!url || url.includes("PASTE_")) {
      el.href = "#";
      el.classList.add("disabled");
      el.addEventListener("click", (e)=>{
        e.preventDefault();
        alert("Вставьте ссылку в assets/js/admin.js");
      });
      return;
    }
    el.href = url;
  }

  function baseUrl(){
    // For local testing, you can set manually if needed
    return location.origin + location.pathname.replace(/\/admin\.html.*$/,"/students.html");
  }

  function genLink(sid, code){
    const u = new URL(baseUrl());
    u.searchParams.set("sid", sid);
    u.searchParams.set("code", code);
    return u.toString();
  }

  function onSubmit(e){
    e.preventDefault();
    const sid = ($("#gSid").value||"").trim();
    const code = ($("#gCode").value||"").trim();
    const out = $("#genOut");
    if(!sid || !code){ out.textContent = ""; return; }
    const link = genLink(sid, code);
    out.innerHTML = `<a href="${link}" target="_blank" rel="noopener">${link}</a>`;
    out.dataset.copy = link;
  }

  function onCopy(){
    const out = $("#genOut");
    const link = out && out.dataset.copy;
    if(!link) return;
    navigator.clipboard.writeText(link).then(()=>{
      alert("Ссылка скопирована");
    }).catch(()=>{
      alert("Не удалось скопировать. Скопируйте вручную.");
    });
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    setHref("#btnOpenSheet", SHEET_EDIT_URL);
    setHref("#btnOpenForm", FORM_URL);

    const iframe = $("#adminEmbed");
    if(iframe){
      if(EMBED_URL && !EMBED_URL.includes("PASTE_")){
        iframe.src = EMBED_URL;
      } else {
        iframe.style.display = "none";
      }
    }

    const form = $("#linkGen");
    if(form) form.addEventListener("submit", onSubmit);
    const btn = $("#btnCopy");
    if(btn) btn.addEventListener("click", onCopy);
  });
})();
