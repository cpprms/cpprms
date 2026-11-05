/* A4 PDF 쪽 맞춤: html2pdf 가 화면을 그림으로 바꾸기 직전에 쪽 경계를 계산해
   - 긴 표는 쪽 끝에서 행 묶음(rowspan) 단위로 나누고 다음 쪽 표에 머리글을 다시 붙임
   - 제목이 쪽 맨 아래에 혼자 남으면 다음 쪽으로 넘김
   사용: html2pdf().set({..., pagebreak:{mode:[]}}).from(el).toContainer().then(function(){ PDF_FIT(this.prop.container, this.prop.pageSize.inner.px.height); }).save() */
window.PDF_FIT = function (root, PH) {
  const T = () => root.getBoundingClientRect().top;
  const top = el => el.getBoundingClientRect().top - T();
  const bot = el => el.getBoundingClientRect().bottom - T();
  const end = y => (Math.floor(y / PH) + 1) * PH;
  const isHead = el => /^H[1-6]$/.test(el.tagName) || el.classList.contains('sec-h') || el.classList.contains('sub-h');
  const pad = el => {
    const r = top(el) % PH; if (r < 2) return;
    const d = document.createElement('div'); d.dataset.pgs = '1'; d.style.cssText = 'display:block;height:' + (PH - r) + 'px';
    el.parentNode.insertBefore(d, el);
  };
  /* 표 행을 rowspan 기준으로 묶음 */
  const groups = t => {
    const out = []; let left = 0;
    [...t.tBodies[0].rows].forEach(tr => {
      if (left > 0) { out[out.length - 1].push(tr); left--; }
      else out.push([tr]);
      const span = Math.max(1, ...[...tr.cells].map(c => c.rowSpan || 1));
      if (span - 1 > left) left = span - 1;
    });
    return out;
  };
  const firstPart = el => {
    if (el.tagName === 'TABLE' && el.tBodies.length) {
      const g = groups(el)[0] || [];
      return (el.tHead ? el.tHead.offsetHeight : 0) + g.reduce((s, r) => s + r.offsetHeight, 0);
    }
    return Math.min(el.offsetHeight, 140);
  };
  const split = t => {
    const gs = groups(t), e = end(top(t));
    let k = 0;
    while (k < gs.length && bot(gs[k][gs[k].length - 1]) <= e - 2) k++;
    if (k === 0) { pad(t); return; }
    if (k === gs.length) return;
    const c = t.cloneNode(false);
    [...t.children].forEach(ch => { if (ch.tagName !== 'TBODY') c.appendChild(ch.cloneNode(true)); });
    const tb = document.createElement('tbody'); c.appendChild(tb);
    gs.slice(k).forEach(g => g.forEach(r => tb.appendChild(r)));
    t.parentNode.insertBefore(c, t.nextSibling);
  };
  const walk = parent => {
    for (let i = 0; i < parent.children.length; i++) {
      const el = parent.children[i];
      if (el.dataset.pgs || !el.offsetHeight) continue;
      const e = end(top(el));
      if (isHead(el)) {
        const nx = el.nextElementSibling;
        if (nx && bot(el) + firstPart(nx) > e - 2) pad(el);
        continue;
      }
      if (bot(el) <= e - 2) continue;
      if (el.tagName === 'TABLE' && el.tBodies.length) split(el);
      else if (el.children.length && /^(DIV|SECTION)$/.test(el.tagName)) walk(el);
      else if (el.offsetHeight < PH) pad(el);
    }
  };
  walk(root);
};
