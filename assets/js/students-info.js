
(function(){
  const cfg = window.CLEVERDI_CONFIG || {};
  const SHEET_OPEN_URL = cfg.STUDENTS_SHEET_OPEN_URL || "PASTE_GOOGLE_SHEET_LINK_HERE";
  const SHEET_EMBED_URL = cfg.STUDENTS_SHEET_EMBED_URL || ""; // optional

  function $(q){ return document.querySelector(q); }
  function isPlaceholder(url){
    return !url || String(url).includes("PASTE_") || url === "#";
  }

  function setSheet(){
    const out = $("#sheetLinkOut");
    const btnOpen = $("#btnOpenSheet");
    const btnCopy = $("#btnCopySheet");

    if(out){
      if(isPlaceholder(SHEET_OPEN_URL)){
        out.innerHTML = `<span class="muted">—</span>`;
      } else {
        out.innerHTML = `<a href="${SHEET_OPEN_URL}" target="_blank" rel="noopener">${SHEET_OPEN_URL}</a>`;
      }
    }

    if(btnOpen){
      if(isPlaceholder(SHEET_OPEN_URL)){
        btnOpen.href = "#";
        btnOpen.addEventListener("click", (e)=>{
          e.preventDefault();
          alert("Вставьте ссылку в assets/js/config.js → STUDENTS_SHEET_OPEN_URL");
        });
      } else {
        btnOpen.href = SHEET_OPEN_URL;
      }
    }

    if(btnCopy){
      btnCopy.addEventListener("click", ()=>{
        if(isPlaceholder(SHEET_OPEN_URL)){
          alert("Сначала вставьте ссылку в config.js");
          return;
        }
        navigator.clipboard.writeText(SHEET_OPEN_URL).then(()=>{
          alert("Ссылка скопирована");
        }).catch(()=>{
          alert("Не удалось скопировать. Скопируйте вручную.");
        });
      });
    }

    const iframe = $("#sheetEmbed");
    if(iframe){
      if(SHEET_EMBED_URL && !isPlaceholder(SHEET_EMBED_URL)){
        iframe.src = SHEET_EMBED_URL;
      } else {
        iframe.style.display = "none";
      }
    }
  }

  document.addEventListener("DOMContentLoaded", setSheet);
})();
