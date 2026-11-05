/* CPPRMS 화면 공통 예시 자료 (v2.0, 2026-11-03)
   노선, 사업자 이름은 운영평가 관리 화면(운영본) 기준. 사람 이름, 날짜, 수치는 모두 예시 */
window.CP = {
  year: 2026,
  lines: [
    { id: 'sgrail', line: 'GTX-A(운정중앙~서울)', org: '에스지레일', type: 'BTO', rail: '광역철도', period: 30 },
    { id: 'seobu', line: '서해선(대곡~소사)', org: '서부광역철도', type: 'BTL', rail: '일반철도', period: 20 },
    { id: 'erail', line: '서해선(소사~원시)', org: '이레일', type: 'BTL', rail: '일반철도', period: 20 },
    { id: 'gaya', line: '경전선(함안~진주)', org: '가야철도', type: 'BTL', rail: '일반철도', period: 20 },
    { id: 'jeolla', line: '전라선(익산~신리)', org: '전라선철도', type: 'BTL', rail: '일반철도', period: 20 },
    { id: 'saeseoul', line: '신분당선(신사~강남)', org: '새서울철도', type: 'BTO', rail: '광역철도', period: 30 },
    { id: 'gyeonggi', line: '신분당선(정자~광교)', org: '경기철도', type: 'BTO', rail: '광역철도', period: 30 },
    { id: 'shinbundang', line: '신분당선(강남~정자)', org: '신분당선', type: 'BTO', rail: '광역철도', period: 30 },
    { id: 'airport', line: '인천국제공항철도', org: '공항철도', type: 'BTO', rail: '일반철도', period: 34 }
  ],
  /* 업무그룹 (업무자료 관리 왼쪽 목록 기준) */
  groups: ['센터 업무관리', '신분당선 1단계(강남~정자)', '신분당선 2단계(정자~광교)', '신분당선 3단계(신사~강남)', 'GTX-A', 'GTX-B', 'GTX-C', '신안산선', '인천국제공항철도', '경전선(함안~진주)', '전라선(익산~신리)', '대장홍대 광역철도', '부전마산 복선전철', '서해선(대곡~소사)', '서해선(소사~원시)'],
  staff: ['김**', '이**', '박**', '최**', '정**', '강**', '조**', '윤**'], // 이름은 성 + ** 로 가림 (예시)
  /* 운영평가 지표와 배점(환산). BTL 은 운영본 결과조회 화면 캡처 기준(시설물 수준 86, 경영관리 14).
     BTO 는 안전수준 14점만 운영본 화면 기준이고 나머지 배점은 예시 */
  evalDef: {
    BTL: [
      { g: '시설물 수준', items: [{ k: 'safe', n: '안전수준', t: '정량', w: 40 }, { k: 'struct', n: '구조물 유지관리', t: '정량', w: 8 }, { k: 'insp', n: '정기안전점검 이행의 적정성', t: '정성', w: 8 }, { k: 'sys', n: '시스템 유지관리', t: '정량', w: 30 }] },
      { g: '경영관리', items: [{ k: 'mplan', n: '유지관리 시행계획 및 이행의 적정성', t: '정성', w: 14 }] }
    ],
    BTO: [
      { g: '시설물 수준', items: [{ k: 'safe', n: '안전수준', t: '정량', w: 14 }, { k: 'struct', n: '구조물 유지관리', t: '정량', w: 7 }, { k: 'insp', n: '정기안전점검 이행의 적정성', t: '정성', w: 7 }, { k: 'sys', n: '시스템 유지관리', t: '정량', w: 7 }] },
      { g: '서비스 수준', items: [{ k: 'cong', n: '혼잡도', t: '정량', w: 6 }, { k: 'run', n: '열차운행률', t: '정량', w: 6 }, { k: 'ontime', n: '정시율', t: '정량', w: 6 }, { k: 'stn', n: '역사 이용시설', t: '정량', w: 6 }, { k: 'mob', n: '교통약자 이용시설', t: '정량', w: 6 }, { k: 'cmpl', n: '고객민원 응대', t: '정성', w: 5 }, { k: 'csat', n: '고객만족도', t: '정량', w: 6 }, { k: 'svc', n: '서비스 개선노력', t: '정성', w: 4 }] },
      { g: '경영관리', items: [{ k: 'rev', n: '수입증대 개선노력', t: '정성', w: 6 }, { k: 'cost', n: '운영비용 집행적정성', t: '정성', w: 7 }, { k: 'mplan', n: '유지관리 시행계획 및 이행의 적정성', t: '정성', w: 7 }] }
    ]
  },
  evalNote: { BTL: '지표와 배점은 운영본 결과조회 화면 기준', BTO: '안전수준 14점 외 배점은 예시' },
  orgNames() { return this.lines.map(l => l.org); },
  lineNames() { return this.lines.map(l => l.line); },
  pick(arr, i) { return arr[i % arr.length]; },
  /* 평가 지표 관리에서 만든 연도별 지표 (브라우저 저장, 예시). 운영평가 관리, 입력 화면이 같은 값을 읽음. 그 연도 지표가 없으면 기본 지표 */
  indKey: 'cpprms_eval_ind_v1',
  indAll() { try { return JSON.parse(localStorage.getItem(this.indKey) || '{}'); } catch (e) { return {}; } },
  indSave(o) { try { localStorage.setItem(this.indKey, JSON.stringify(o)); } catch (e) { /* 저장 불가 시 이 화면에서만 유지 */ } },
  indFor(type, year) { return (this.indAll()[type] || []).find(v => v.yr === +year) || null; },
  evalDefFor(type, year) { const v = this.indFor(type, year); return v ? v.data.map(g => ({ g: g.g, items: g.items })) : this.evalDef[type]; },
  /* 지표 제목: 평가 지표 관리에서 변경한 제목, 없으면 "2027년 BTL 지표" */
  indName(type, year) { const v = this.indFor(type, year); return v && v.name ? v.name : year + '년 ' + type + ' 지표'; },
  /* 환산 계산식 (v1.3, 2026-11-05): 연도 지표마다 저장. 정량은 식, 정성은 등급별 비율 */
  calcVars: ['소계', '만점', '가점', '배점'],
  calcDefault() { return { q: '소계 / 만점 * 배점', cap: true, items: {}, grade: [1, 0.8, 0.6, 0.4, 0.2], desc: {} }; },
  /* 지표별 산식 기본값: 2026년 민자철도 운영평가 매뉴얼(안) 구조물 유지관리. 한 줄에 [이름] = 식, 마지막 줄이 환산점수.
     식 안의 [이름] 중 위 줄에서 정하지 않은 것은 평가위원이 입력하는 값 */
  descDefault: { struct: '[1종 평가점수] = ([1종 A등급 개수] × 6 + [1종 B등급 개수] × 4.5 + [1종 C등급 개수] × 3 + [1종 D등급 개수] × 1.5 + [1종 E등급 개수] × 0) / [1종 구조물 총 개수]\n[2종 평가점수] = ([2종 A등급 개수] × 4 + [2종 B등급 개수] × 3 + [2종 C등급 개수] × 2 + [2종 D등급 개수] × 1 + [2종 E등급 개수] × 0) / [2종 구조물 총 개수]\n[구조물 유지관리 평가점수] = [1종 평가점수] + [2종 평가점수]\n[환산점수] = [구조물 유지관리 평가점수] / 10 × 배점' },
  descOf(type, year, k) { const c = this.calcFor(type, year); return c.desc && c.desc[k] != null ? c.desc[k] : (this.descDefault[k] || ''); },
  calcFor(type, year) { const v = this.indFor(type, year); return Object.assign(this.calcDefault(), (v && v.calc) || {}); },
  /* 식 계산: 숫자, 위 4개 값, + - * / 괄호, 작은값(a, b), 큰값(a, b), 반올림(값, 자리수)만 허용 (eval 쓰지 않음) */
  calcRun(expr, vars) {
    const s = String(expr || '').replace(/×/g, '*').replace(/÷/g, '/'), F = { 작은값: Math.min, 큰값: Math.max, 반올림: (x, n) => { const p = Math.pow(10, n || 0); return Math.round(x * p) / p; } };
    let i = 0;
    const sp = () => { while (/\s/.test(s[i] || '')) i++; };
    const fail = m => { throw new Error(m); };
    function prim() {
      sp(); const c = s[i];
      if (c === '(') { i++; const v = add(); sp(); if (s[i] !== ')') fail('괄호가 닫히지 않음'); i++; return v; }
      if (c === '-') { i++; return -prim(); }
      if (c === '[') { const j = s.indexOf(']', i); if (j < 0) fail('대괄호가 닫히지 않음'); const nm = s.slice(i + 1, j).trim(); i = j + 1; if (!(nm in vars)) fail('[' + nm + '] 값 없음'); return +vars[nm] || 0; }
      const num = /^\d+(\.\d+)?/.exec(s.slice(i)); if (num) { i += num[0].length; return +num[0]; }
      const w = /^[가-힣A-Za-z_]+/.exec(s.slice(i)); if (!w) fail(c ? '"' + c + '"은(는) 쓸 수 없음' : '식이 끝나지 않음');
      i += w[0].length; sp();
      if (F[w[0]]) { if (s[i] !== '(') fail(w[0] + ' 뒤에 괄호 필요'); i++; const a = [add()]; sp(); while (s[i] === ',') { i++; a.push(add()); sp(); } if (s[i] !== ')') fail('괄호가 닫히지 않음'); i++; return F[w[0]].apply(null, a); }
      if (!(w[0] in vars)) fail('"' + w[0] + '"은(는) 없는 값');
      return +vars[w[0]] || 0;
    }
    function mul() { let v = prim(); for (;;) { sp(); const c = s[i]; if (c !== '*' && c !== '/') return v; i++; const r = prim(); v = c === '*' ? v * r : (r === 0 ? 0 : v / r); } }
    function add() { let v = mul(); for (;;) { sp(); const c = s[i]; if (c !== '+' && c !== '-') return v; i++; const r = mul(); v = c === '+' ? v + r : v - r; } }
    if (!s.trim()) fail('식이 비어 있음');
    const v = add(); sp(); if (i < s.length) fail('"' + s.slice(i, i + 6) + '" 부분을 읽을 수 없음');
    if (!isFinite(v)) fail('계산 결과가 숫자가 아님');
    return v;
  },
  /* 여러 줄 산식: 줄마다 [이름] = 식. inputs 는 계산 줄에서 정하지 않은 [이름] (나온 순서) */
  fxParse(text) {
    const lines = [], err = [], def = {};
    String(text || '').split(/\n/).forEach((t, n) => {
      t = t.trim(); if (!t) return;
      const m = /^\[([^\]]+)\]\s*=\s*(.+)$/.exec(t);
      if (!m) { err.push((n + 1) + '번째 줄: [이름] = 식 형식이 아님'); return; }
      lines.push({ name: m[1].trim(), expr: m[2] }); def[m[1].trim()] = 1;
    });
    const inputs = [];
    lines.forEach(l => { (l.expr.match(/\[[^\]]+\]/g) || []).forEach(x => { const nm = x.slice(1, -1).trim(); if (!def[nm] && inputs.indexOf(nm) < 0) inputs.push(nm); }); });
    return { lines: lines, inputs: inputs, err: err };
  },
  fxRun(p, inp, w) {
    const vars = Object.assign({ 배점: w }, inp || {}), vals = {};
    p.lines.forEach(l => { vars[l.name] = vals[l.name] = this.calcRun(l.expr, vars); });
    return { vals: vals, result: p.lines.length ? vals[p.lines[p.lines.length - 1].name] : null };
  },
  /* 예시 입력값: 총 개수 10, 등급별 개수 A~E 4, 3, 2, 1, 0, 그 밖에 5 */
  fxSample(nm) { if (/총/.test(nm)) return 10; const g = /([A-E])등급/.exec(nm); return g ? [4, 3, 2, 1, 0]['ABCDE'.indexOf(g[1])] : 5; },
  fxCheck(text, w) {
    const p = this.fxParse(text); if (p.err.length) return p.err[0]; if (!p.lines.length) return '';
    const inp = {}; p.inputs.forEach(n => { inp[n] = this.fxSample(n); });
    try { this.fxRun(p, inp, w || 10); return ''; } catch (e) { return e.message; }
  },
  calcCheck(expr) { try { this.calcRun(expr, { 소계: 80, 만점: 100, 가점: 1, 배점: 10 }); return ''; } catch (e) { return e.message; } },
  /* 날짜 예시: 기준일 2026-11-03 에서 n일 전 */
  day(n, t) {
    const dt = new Date(2026, 10, 3); dt.setDate(dt.getDate() - n);
    const s = dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
    return t ? s + ' ' + t : s;
  }
};
