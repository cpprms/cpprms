/* CPPRMS 화면 마무리 동작 (v1.0, 2026-11-06). gnb.jspf 에서 모든 화면에 불러옴
   v1.0 (2026-11-06) 탭 아래 선 이동(선택 탭 위치를 CSS 변수로만 전달, 탭 구조는 그대로),
        요약 숫자 첫 표시 때 1회 올라가는 숫자(움직임 줄이기 설정이면 끔, 화면 스크립트가 값을 바꾸면 즉시 멈춤).
   화면 동작 코드와 자료에는 손대지 않고 모양만 다룸 */
(function () {
  'use strict';
  var d = document;
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. 탭 아래 선: 선택된 탭(.on)의 위치와 폭을 .tabs 의 --tx, --tw 로 넘김 */
  function placeBar(tabs) {
    var on = tabs.querySelector('button.on');
    if (!on || !on.offsetWidth) { if (tabs.classList.contains('pl-bar')) tabs.classList.remove('pl-bar'); return; }
    var x = on.offsetLeft + 'px', w = on.offsetWidth + 'px';
    if (tabs.style.getPropertyValue('--tx') !== x) tabs.style.setProperty('--tx', x);
    if (tabs.style.getPropertyValue('--tw') !== w) tabs.style.setProperty('--tw', w);
    if (!tabs.classList.contains('pl-bar')) tabs.classList.add('pl-bar');
  }
  function initTabs() {
    var list = d.querySelectorAll('.tabs');
    Array.prototype.forEach.call(list, function (tabs) {
      if (tabs.dataset.plBar) return;
      tabs.dataset.plBar = '1';
      placeBar(tabs);
      if (window.MutationObserver) {
        /* 탭 자신의 변화(선 위치 표시)는 무시하고 탭 버튼의 변화만 반영: 되먹임 방지 */
        new MutationObserver(function (recs) {
          for (var i = 0; i < recs.length; i++) { if (recs[i].target !== tabs) { placeBar(tabs); return; } }
        })
          .observe(tabs, { subtree: true, attributes: true, attributeFilter: ['class'], childList: true, characterData: true });
      }
    });
  }
  var rz;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () { Array.prototype.forEach.call(d.querySelectorAll('.tabs.pl-bar,.tabs[data-pl-bar]'), placeBar); }, 120);
  });

  /* 2. 요약 숫자: 처음 보일 때 한 번만 0 → 값으로 (600ms) */
  var SEL = '.kpi .v, .hsum .v, .sum4 .v, .tot .v, .share .p, main .sumrow b';
  var NUM = /^(\s*)([\d,]+(?:\.\d+)?)(\s*)$/;
  var done = typeof WeakSet === 'function' ? new WeakSet() : null;
  function countUp(el) {
    if (!done || done.has(el)) return;
    done.add(el);
    var tn = null;
    for (var i = 0; i < el.childNodes.length; i++) {
      var n = el.childNodes[i];
      if (n.nodeType === 3 && n.textContent.trim()) { tn = n; break; }
    }
    if (!tn) return;
    var m = NUM.exec(tn.textContent);
    if (!m) return;
    var raw = m[2], target = parseFloat(raw.replace(/,/g, ''));
    if (!isFinite(target) || target === 0) return;
    var dec = (raw.split('.')[1] || '').length, comma = raw.indexOf(',') > -1;
    var fmt = function (v) {
      var s = v.toFixed(dec);
      if (comma) { var p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); s = p.join('.'); }
      return m[1] + s + m[3];
    };
    var final = tn.textContent, last = null, t0 = null, DUR = 600;
    var ease = function (x) { return 1 - Math.pow(1 - x, 3); };
    function step(ts) {
      if (last !== null && tn.textContent !== last) return; /* 화면 스크립트가 값을 바꿈: 그대로 둠 */
      if (!tn.parentNode) return;
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / DUR);
      last = k < 1 ? fmt(target * ease(k)) : final;
      tn.textContent = last;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function initCount() {
    if (still) return;
    Array.prototype.forEach.call(d.querySelectorAll(SEL), function (el) {
      var r = el.getBoundingClientRect();
      if (r.width && r.top < window.innerHeight) countUp(el);
    });
  }

  function init() {
    initTabs();
    initCount();
    /* 자료를 늦게 그리는 화면(승하차, 레포트 등): 처음 3초 동안만 다시 확인 */
    var n = 0, iv = setInterval(function () { initTabs(); initCount(); if (++n >= 6) clearInterval(iv); }, 500);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
