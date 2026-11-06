/* 업무 도우미 (v1.0, 2026-11-05) 화면 개선안, 예시 자료
   - 모든 화면 오른쪽 아래 대화창. 질문을 받아 시스템 자료를 조회해 답하고, 답마다 근거 화면 링크를 붙인다
   - 조회 전용: 등록, 수정, 삭제는 하지 않는다. 자료에 없는 내용은 답하지 않고 물을 수 있는 질문을 안내한다
   - 실제 서비스에서는 AI가 질문을 해석하고 아래 조회 기능(승하차, 일정, 평가 진행, 실시협약, 지표, 처리할 일)만 호출하는 구조.
     이 시연본은 AI 대신 낱말로 질문을 구분한다
   - 승하차는 승하차 데이터 관리 서버 자료(/rideMng/stat.json), 나머지는 각 화면과 같은 예시 자료
   - 대화 내용은 이 브라우저 탭에서만 유지(sessionStorage), 화면을 옮겨도 이어짐 */
(function () {
  const d = document, me = d.currentScript;
  /* 화면 주소 기준: 서버(/resource/js/bot.js), 오프라인 시연본(../resource/js/bot.js) 모두 대응 */
  const ROOT = (me.getAttribute('src') || '').replace(/\/?resource\/js\/bot\.js.*$/, '');
  const EXT = /\.html$/.test(location.pathname) ? '.html' : '.do';
  const url = p => ROOT + p + (p.indexOf('.json') > 0 ? '' : EXT);
  const KEY = 'cpprms-bot';
  const TODAY = '2026-11-03';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => Math.round(n).toLocaleString();

  function boot() {
    if (!window.CP) { const s = d.createElement('script'); s.src = ROOT + '/resource/js/data.js'; s.onload = start; d.head.appendChild(s); } else start();
  }

  function start() {
    const CP = window.CP;
    const pick = (a, i) => a[i % a.length];

    /* ===== 조회 기능 (실제 서비스의 조회 창구에 해당) ===== */

    /* 평가 진행: 평가 진행 모니터링과 같은 예시 자료 */
    function evalData() {
      const wr = [100, 80, 40, 55, 100, 20, 75, 0, 90];
      return CP.lines.map((l, i) => ({
        l: l,
        m: [0, 1, 2, 3, 4].map(j => {
          let p = Math.max(0, Math.min(100, wr[i] + (j - 2) * 15));
          if (wr[i] === 100) p = 100; if (wr[i] === 0) p = 0;
          if (i === 2 && j === 4) p = 0; if (i === 5 && j === 1) p = 0;
          return { no: j + 1, nm: pick(CP.staff, i + j * 3), p: Math.round(p / 5) * 5 };
        })
      }));
    }

    /* 실시협약 서류: 실시협약 관리와 같은 예시 자료 */
    const DOCS = ['실시협약서', '변경 실시협약서(최신)', '부속서 1 사업계획', '부속서 2 운영비 산정', '부속서 3 위험분담', '부속서 4 요금 및 수입', '재무모델(최신)', '협상 회의록'];
    const PAT = ['AAAAAANN', 'AAAASNNN', 'AAAABSNN', 'AAANNNNN', 'AAABNNNN', 'AANNNNNN', 'AAAAASSN', 'AAAAAASN', 'AAAAAAAA'];
    const PS = { A: '승인', S: '검토 중', B: '보완 요청', N: '미제출' };
    const contractData = () => CP.lines.map((l, i) => ({ l: l, docs: DOCS.map((n, j) => ({ n: n, st: PS[PAT[i][j]] })) }));

    /* 사업일정: 사업일정 관리와 같은 예시 자료 */
    const SCH = [
      ['2026-11-05', '업무협의', '센터 업무관리', '개발사 진행 회의'], ['2026-11-06', '자료제출', '신분당선 2단계(정자~광교)', '3분기 운영실적 보고'],
      ['2026-11-02', '자료제출', 'GTX-A', 'GTX-A 10월 승하차 자료 제출'], ['2026-11-10', '일반 사업일정', '센터 업무관리', '평가위원 모집 공지 게시'],
      ['2026-11-12', '업무협의', '서해선(대곡~소사)', '운영평가 결과 설명회'], ['2026-11-14', '내부일정', '센터 업무관리', '팀 주간회의'],
      ['2026-11-18', '자료제출', '인천국제공항철도', '안전관리 계획 변경 제출'], ['2026-11-20', '일반 사업일정', '경전선(함안~진주)', '시설물 정기 점검'],
      ['2026-11-25', '자료제출', '전라선(익산~신리)', '하반기 유지관리 계획 제출'], ['2026-11-27', '내부일정', '센터 업무관리', '운영평가 기준 개정 검토'],
      ['2026-11-30', '자료제출', '신분당선 1단계(강남~정자)', '신분당선 11월 승하차 자료 제출'], ['2026-11-30', '자료제출', 'GTX-A', 'GTX-A 11월 승하차 자료 제출'],
      ['2026-11-03', '업무협의', '신분당선 3단계(신사~강남)', '실시협약 변경 협의'], ['2026-10-28', '일반 사업일정', '센터 업무관리', '중간보고'],
      ['2026-10-20', '자료제출', '서해선(소사~원시)', '3분기 운영실적 보고'], ['2026-12-04', '업무협의', '센터 업무관리', '2027년 사업계획 협의']
    ];
    const schData = () => SCH.map((b, i) => {
      const r = { date: b[0], kind: b[1], grp: b[2], title: b[3], done: b[0] < '2026-10-30' && i !== 2 };
      r.state = r.done ? '완료' : r.date < TODAY ? (r.kind === '자료제출' ? '기한 경과' : '완료') : r.date === TODAY ? '진행 중' : '예정';
      return r;
    });
    const dday = s => { const n = Math.round((new Date(s) - new Date(TODAY)) / 864e5); return n === 0 ? 'D-day' : n > 0 ? 'D-' + n : 'D+' + (-n); };

    /* 처리할 일: 마이페이지와 같은 예시 자료 */
    const TODO = [
      ['대외자료 반출 승인 요청', '신청 1건', '오늘까지', '/admin/exportAprv'], ['문의 및 의견 미답변', '2건, 가장 오래된 글 5일 경과', 'D-1', '/work/inquiry'],
      ['실시협약 변경본 승인 검토', '경기철도 제출, 버전 3', 'D-2', '/work/contracts'], ['승하차 자료 미등록', 'GTX-A 2026년 1~6월', 'D-3', '/rideMng/rideMng'],
      ['평가위원 후보 서류 확인', '신규 접수 3건', 'D-6', '/rail/evaluator']
    ];

    /* 평가 지표: 평가 지표 관리에서 저장한 자료, 없으면 같은 예시 기준 */
    function indVersions(type) {
      const saved = CP.indAll()[type];
      if (saved && saved.length) return saved;
      const mk = () => CP.evalDef[type].map(g => ({ g: g.g, items: g.items.map(it => ({ k: it.k, n: it.n, t: it.t, w: it.w })) }));
      const v26 = mk(), v25 = mk(), f = (v, k) => v.flatMap(g => g.items).find(i => i.k === k);
      if (type === 'BTL') { f(v25, 'insp').w = 10; f(v25, 'sys').w = 28; } else { f(v25, 'safe').w = 12; f(v25, 'csat').w = 8; }
      return [{ yr: 2026, st: '평가 사용 중', data: v26 }, { yr: 2025, st: '잠김', data: v25 }];
    }
    function indDiff(a, b) {
      const ia = a.flatMap(g => g.items.map(i => Object.assign({ g: g.g }, i))), ib = b.flatMap(g => g.items.map(i => Object.assign({ g: g.g }, i))), rows = [];
      ib.forEach(i => { const o = ia.find(x => x.k === i.k); if (!o) rows.push([i.n, '-', i.w, '추가']); else { if (o.w !== i.w) rows.push([i.n, o.w, i.w, '배점 변경']); if (o.n !== i.n) rows.push([o.n + ' → ' + i.n, o.w, i.w, '이름 변경']); } });
      ia.forEach(o => { if (!ib.find(x => x.k === o.k)) rows.push([o.n, o.w, '-', '삭제']); });
      return rows;
    }

    /* 승하차: 서버 자료 */
    function rideStat(l) {
      return fetch(url('/rideMng/stat.json?orgId=' + encodeURIComponent(l.id)), { headers: { Accept: 'application/json' } })
        .then(r => r.ok ? r.json() : { months: [] }).catch(() => ({ months: [] }))
        .then(D => {
          const Y = {};
          (D.months || []).forEach(m => { (Y[m.yr] = Y[m.yr] || {})[m.mon] = (Y[m.yr][m.mon] || 0) + m.upCnt + m.dnCnt; });
          return Y;
        });
    }

    /* ===== 질문 해석 ===== */
    const ALIAS = { gtx: 'sgrail', 'gtx-a': 'sgrail', 에스지: 'sgrail', 서부광역: 'seobu', 대곡: 'seobu', 이레일: 'erail', 원시: 'erail', 가야: 'gaya', 경전선: 'gaya', 전라선: 'jeolla', 새서울: 'saeseoul', 신사: 'saeseoul', 경기철도: 'gyeonggi', 광교: 'gyeonggi', 공항: 'airport' };
    function findLine(q) {
      const s = q.toLowerCase().replace(/\s/g, '');
      let l = CP.lines.find(x => s.indexOf(x.org.replace(/\s/g, '').toLowerCase()) >= 0);
      if (l) return l;
      const k = Object.keys(ALIAS).sort((a, b) => b.length - a.length).find(a => s.indexOf(a) >= 0);
      return k ? CP.lines.find(x => x.id === ALIAS[k]) : null;
    }
    const typeOf = q => /bto|수익형/i.test(q) ? 'BTO' : /btl|임대형/i.test(q) ? 'BTL' : '';
    const yearOf = q => { const m = /(20\d\d)\s*년?/.exec(q); return m ? +m[1] : 0; };

    const src = (t, p) => '<a class="bsrc" href="' + esc(url(p)) + '">근거: ' + esc(t) + ' ›</a>';
    const tbl = (h, rows) => '<table class="btb"><thead><tr>' + h.map(x => '<th>' + esc(x) + '</th>').join('') + '</tr></thead><tbody>' + rows.map(r => '<tr>' + r.map((c, i) => '<td' + (i && typeof c === 'number' ? ' class="n"' : '') + '>' + esc(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table>';

    const H = {
      help() {
        return '<p>시스템에 등록된 자료를 조회해 답합니다. 자료를 바꾸는 일(등록, 승인, 삭제)은 각 화면에서 처리해 주세요.</p>' +
          '<p>이런 질문을 할 수 있습니다.</p><ul><li>승하차 이용 추이 (사업자, 연도)</li><li>이번 주 마감, 기한 지난 제출 일정</li><li>운영평가 미작성 위원, 작성률</li><li>실시협약 서류 보완, 미제출 현황</li><li>연도별 평가 지표 변경 내용</li><li>오늘 처리할 일</li><li>사업자 레포트 요약 초안</li></ul>';
      },
      todo() {
        return '<p>처리할 일이 <b>' + TODO.length + '건</b> 있습니다. 마감이 가까운 순서입니다.</p>' + tbl(['할 일', '내용', '마감'], TODO.map(t => [t[0], t[1], t[2]])) + src('마이페이지 처리할 일', '/main');
      },
      sched(q) {
        const R = schData(), late = R.filter(r => r.state === '기한 경과');
        const end = new Date(TODAY); end.setDate(end.getDate() + 6); const e = end.toISOString().slice(0, 10);
        const wk = R.filter(r => !r.done && r.date >= TODAY && r.date <= e).sort((a, b) => a.date < b.date ? -1 : 1);
        const onlyLate = /기한|지난|경과|늦/.test(q);
        let h = '';
        if (late.length) h += '<p>제출 기한이 지났는데 완료 처리되지 않은 일정이 <b>' + late.length + '건</b> 있습니다.</p>' + tbl(['일정', '업무그룹', '기한'], late.map(r => [r.title, r.grp, r.date.slice(5).replace('-', '.') + ' (' + dday(r.date) + ')']));
        else h += '<p>기한이 지난 제출 일정은 없습니다.</p>';
        if (!onlyLate) h += '<p>이번 주(' + TODAY.slice(5).replace('-', '.') + '~' + e.slice(5).replace('-', '.') + ') 일정은 <b>' + wk.length + '건</b>입니다.</p>' + tbl(['날짜', '구분', '일정'], wk.map(r => [r.date.slice(5).replace('-', '.') + ' ' + dday(r.date), r.kind, r.title]));
        return h + src('사업일정 관리', '/work/schedules');
      },
      evalq(q) {
        const t = typeOf(q), D = evalData().filter(x => !t || x.l.type === t), all = D.flatMap(x => x.m);
        const miss = D.flatMap(x => x.m.filter(m => m.p === 0).map(m => [x.l.line, x.l.org, '평가위원 ' + m.no + ' (' + m.nm + ')']));
        const avg = Math.round(all.reduce((s, m) => s + m.p, 0) / all.length);
        const done = D.filter(x => x.m.every(m => m.p === 100)).length;
        return '<p>' + (t ? t + ' ' : '') + D.length + '개 노선의 평가위원 평균 작성률은 <b>' + avg + '%</b>이고, 작성 완료 노선은 ' + done + '개입니다.</p>' +
          (miss.length ? '<p>아직 작성을 시작하지 않은 위원은 <b>' + miss.length + '명</b>입니다.</p>' + tbl(['노선', '사업자', '위원'], miss) : '<p>미작성 위원은 없습니다.</p>') +
          src('평가 진행 모니터링', '/eval/progress');
      },
      contract(q) {
        const C = contractData(), l = findLine(q);
        if (l) {
          const c = C.find(x => x.l.id === l.id), a = c.docs.filter(x => x.st === '승인').length, rest = c.docs.filter(x => x.st !== '승인');
          return '<p>' + esc(l.org) + ' 필수 서류 ' + DOCS.length + '종 중 <b>' + a + '종 승인</b>입니다.</p>' + (rest.length ? tbl(['서류', '상태'], rest.map(x => [x.n, x.st])) : '<p>모든 서류가 승인되었습니다.</p>') + src('실시협약 관리', '/work/contracts');
        }
        const rows = C.map(c => { const n = s => c.docs.filter(x => x.st === s).length; return [c.l.org, n('승인') + '/' + DOCS.length, n('보완 요청'), n('검토 중'), n('미제출')]; })
          .sort((a, b) => (b[2] * 10 + b[4]) - (a[2] * 10 + a[4]));
        const nb = rows.filter(r => r[2]).length;
        return '<p>보완 요청이 걸린 사업자는 <b>' + nb + '곳</b>입니다. 보완 요청, 미제출이 많은 순서입니다.</p>' + tbl(['사업자', '승인', '보완', '검토', '미제출'], rows) + src('실시협약 관리', '/work/contracts');
      },
      ind(q) {
        const types = typeOf(q) ? [typeOf(q)] : ['BTL', 'BTO'];
        let yr = yearOf(q); if (!yr) yr = /내년|2027/.test(q) ? 2027 : 2026;
        return types.map(t => {
          const V = indVersions(t), v = V.find(x => x.yr === yr), p = V.filter(x => x.yr < yr).sort((a, b) => b.yr - a.yr)[0];
          if (!v) return '<p><b>' + t + ' ' + yr + '년 지표</b>는 아직 만들지 않았습니다. 평가 지표 관리에서 "지표 수정하기"로 만들 수 있습니다.</p>';
          const sum = v.data.reduce((s, g) => s + g.items.reduce((a, i) => a + (+i.w || 0), 0), 0);
          if (!p) return '<p><b>' + t + ' ' + yr + '년 지표</b>(' + esc(v.st) + ', 배점 합 ' + sum + '점)는 비교할 이전 연도 지표가 없습니다.</p>';
          const rows = indDiff(p.data, v.data);
          return '<p><b>' + t + ' ' + yr + '년 지표</b>(' + esc(v.st) + ', 배점 합 ' + sum + '점)는 ' + p.yr + '년 대비 ' + (rows.length ? '<b>' + rows.length + '건</b> 바뀌었습니다.</p>' + tbl(['지표', p.yr + '년', yr + '년', '구분'], rows) : '바뀐 내용이 없습니다.</p>');
        }).join('') + src('평가 지표 관리', '/eval/indicators');
      },
      ride(q) {
        const l = findLine(q);
        if (!l) return Promise.resolve('<p>어느 사업자의 승하차 추이를 볼까요?</p>' + chips(CP.lines.map(x => x.org + ' 승하차 추이')));
        return rideStat(l).then(Y => {
          const ys = Object.keys(Y).map(Number).sort();
          if (!ys.length) return '<p>' + esc(l.org) + ' 승하차 자료는 아직 등록되지 않았습니다.</p>' + src('승하차 데이터 관리', '/rideMng/rideMng');
          let yr = yearOf(q); if (!Y[yr]) yr = ys[ys.length - 1];
          const lm = Math.max.apply(null, Object.keys(Y[yr]).map(Number));
          let a = 1, b = lm, lab = '1~' + lm + '월';
          if (/상반기/.test(q)) { b = Math.min(6, lm); lab = '상반기(1~' + b + '월)'; } else if (/하반기/.test(q) && lm >= 7) { a = 7; lab = '하반기(7~' + lm + '월)'; }
          const sum = (y, s, e) => { let t = 0, n = 0; for (let m = s; m <= e; m++) if (Y[y] && Y[y][m] != null) { t += Y[y][m]; n++; } return { t: t, n: n }; };
          const cur = sum(yr, a, b), prev = sum(yr - 1, a, b);
          const peak = Object.keys(Y[yr]).map(Number).filter(m => m >= a && m <= b).sort((x, y) => Y[yr][y] - Y[yr][x])[0];
          const ch = prev.n === cur.n && prev.t ? (cur.t - prev.t) / prev.t * 100 : null;
          return '<p>' + esc(l.org) + ' ' + yr + '년 ' + lab + ' 승하차 합계는 <b>' + fmt(cur.t / 1e4) + '만 명</b>, 월평균 ' + fmt(cur.t / cur.n / 1e4) + '만 명입니다.' +
            (ch == null ? '' : ' 전년 같은 기간보다 <b>' + (ch >= 0 ? '+' : '') + ch.toFixed(1) + '%</b>입니다.') + ' 가장 많은 달은 ' + peak + '월(' + fmt(Y[yr][peak] / 1e4) + '만 명)입니다.</p>' +
            (lm < 12 && yr === ys[ys.length - 1] ? '<p class="bsub">' + yr + '년 ' + (lm + 1) + '월 이후는 미집계</p>' : '') + src('승하차 데이터 관리', '/rideMng/rideMng');
        });
      },
      report(q) {
        const l = findLine(q);
        if (!l) return Promise.resolve('<p>어느 사업자의 레포트 요약을 만들까요?</p>' + chips(CP.lines.map(x => x.org + ' 레포트 요약')));
        const e = evalData().find(x => x.l.id === l.id), c = contractData().find(x => x.l.id === l.id);
        const avg = Math.round(e.m.reduce((s, m) => s + m.p, 0) / e.m.length), ap = c.docs.filter(x => x.st === '승인').length, bo = c.docs.filter(x => x.st === '보완 요청').map(x => x.n);
        return rideStat(l).then(Y => {
          const ys = Object.keys(Y).map(Number).sort(), yr = ys[ys.length - 1];
          let ride = '승하차 자료 미등록';
          if (yr) { const ms = Object.keys(Y[yr]).map(Number), t = ms.reduce((s, m) => s + Y[yr][m], 0); ride = yr + '년 1~' + Math.max.apply(null, ms) + '월 승하차 ' + fmt(t / 1e4) + '만 명(월평균 ' + fmt(t / ms.length / 1e4) + '만 명)'; }
          return '<p><b>' + esc(l.org) + ' (' + esc(l.line) + ', ' + l.type + ')</b> 요약 초안입니다. 확인 후 레포트에 옮겨 주세요.</p><ul>' +
            '<li>이용 현황: ' + esc(ride) + '</li>' +
            '<li>운영평가: ' + CP.year + '년 평가위원 평균 작성률 ' + avg + '%, 미작성 ' + e.m.filter(m => m.p === 0).length + '명</li>' +
            '<li>실시협약: 필수 서류 ' + DOCS.length + '종 중 ' + ap + '종 승인' + (bo.length ? ', 보완 요청 ' + esc(bo.join(', ')) : '') + '</li></ul>' +
            src('레포트 관리', '/report/reportMng');
        });
      }
    };
    function route(q) {
      const s = q.replace(/\s/g, '');
      if (/레포트|보고서|초안|요약/.test(s)) return H.report(q);
      if (/지표|배점/.test(s)) return H.ind(q);
      if (/미작성|작성률|평가위원|진행률|평가진행|운영평가/.test(s)) return H.evalq(q);
      if (/실시협약|협약|서류|보완/.test(s)) return H.contract(q);
      if (/일정|마감|기한|이번주/.test(s)) return H.sched(q);
      if (/승하차|이용객|이용추이|수송|탑승|이용자/.test(s)) return H.ride(q);
      if (/처리할|할일|오늘/.test(s)) return H.todo();
      if (/도움|뭘|무엇|할수있|기능|안녕/.test(s)) return H.help();
      return '<p>질문에 맞는 자료를 찾지 못했습니다. 아래처럼 물어봐 주세요.</p>' + chips(SUG);
    }

    /* ===== 화면 ===== */
    const SUG = ['오늘 처리할 일', '이번 주 마감 일정', 'BTO 평가 미작성 위원', '경기철도 승하차 추이', '실시협약 보완 요청 현황', '2026년 지표 변경 내용'];
    const chips = list => '<div class="bchips">' + list.map(x => '<button type="button" data-q="' + esc(x) + '">' + esc(x) + '</button>').join('') + '</div>';
    const ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/></svg>';

    const css = d.createElement('style');
    css.textContent = [
      '.bfab{position:fixed;right:18px;bottom:18px;z-index:44;height:46px;padding:0 18px 0 14px;border:0;border-radius:23px;background:var(--blue,#1f3f99);color:#fff;font:inherit;font-size:14px;font-weight:700;display:flex;align-items:center;gap:8px;box-shadow:0 8px 22px rgba(15,25,45,.22);cursor:pointer}',
      '.bfab svg{width:20px;height:20px}.bfab:hover{background:#16307a}.bfab[aria-expanded=true]{display:none}',
      '.bpan{position:fixed;right:18px;bottom:18px;z-index:46;width:400px;height:min(600px,calc(100vh - 96px));background:#fff;border:1px solid var(--line2,#c5ccd8);border-radius:10px;box-shadow:0 14px 34px rgba(15,25,40,.2);display:none;flex-direction:column;overflow:hidden}',
      '.bpan.on{display:flex}',
      'body:has(#ptPanel.on) .bfab,body:has(#ptPanel.on) .bpan{right:394px}',
      '.bpan header{display:flex;align-items:center;gap:8px;padding:12px 12px 12px 16px;border-bottom:1px solid var(--line,#dde2ea)}',
      '.bpan header h2{margin:0;font-size:15px;font-weight:800;display:flex;align-items:center;gap:8px}.bpan header h2 svg{width:20px;height:20px;color:var(--blue,#1f3f99)}',
      '.bpan header .tag{font-size:11.5px;font-weight:700;color:var(--sub,#4a5568);border:1px solid var(--line2,#c5ccd8);border-radius:10px;padding:1px 8px}',
      '.bpan header button{margin-left:auto;width:32px;height:32px;border:0;background:none;border-radius:6px;color:var(--sub,#4a5568);font-size:18px;cursor:pointer}.bpan header button:hover{background:#f1f3f7}',
      '.blog{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#f7f8fa}',
      '.bm{max-width:92%;font-size:13.5px;line-height:1.6;border-radius:10px;padding:10px 12px}',
      '.bm.u{align-self:flex-end;background:var(--blue,#1f3f99);color:#fff}',
      '.bm.a{align-self:flex-start;background:#fff;border:1px solid var(--line,#dde2ea);color:var(--ink,#1b2330);width:92%}',
      '.bm p{margin:0 0 6px}.bm p:last-child{margin-bottom:0}.bm ul{margin:0 0 6px;padding-left:18px}.bm .bsub{font-size:12px;color:var(--sub,#4a5568)}',
      '.btb{width:100%;border-collapse:collapse;margin:4px 0 8px;font-size:12.5px}.btb th,.btb td{border-bottom:1px solid #eceff4;padding:5px 6px;text-align:left;vertical-align:top}.btb th{background:#f4f6f9;font-weight:700;color:var(--sub,#4a5568)}.btb td.n{text-align:right;font-variant-numeric:tabular-nums}',
      '.bsrc{display:inline-block;margin-top:2px;font-size:12.5px;font-weight:700;color:var(--blue,#1f3f99)}',
      '.bchips{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}.bchips button{border:1px solid #c9d3ea;background:#fff;color:var(--blue,#1f3f99);border-radius:14px;padding:4px 10px;font:inherit;font-size:12.5px;cursor:pointer}.bchips button:hover{background:#eef2fb}',
      '.bwait{align-self:flex-start;font-size:12.5px;color:var(--sub,#4a5568);padding:4px 2px}',
      '.bpan .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}',
      '.bform{display:flex;gap:6px;padding:10px;border-top:1px solid var(--line,#dde2ea);background:#fff}',
      '.bform input{flex:1;height:38px;border:1px solid var(--line2,#c5ccd8);border-radius:8px;padding:0 10px;font:inherit;font-size:13.5px}',
      '.bform button{height:38px;padding:0 14px;border:0;border-radius:8px;background:var(--blue,#1f3f99);color:#fff;font:inherit;font-size:13.5px;font-weight:700;cursor:pointer}',
      '@media (max-width:640px){.bpan{left:8px;right:8px!important;bottom:8px;width:auto;height:calc(100vh - 76px)}.bfab{right:12px!important;bottom:12px}}',
      '@media print{.bfab,.bpan{display:none!important}}'
    ].join('\n');
    d.head.appendChild(css);

    const fab = d.createElement('button');
    fab.type = 'button'; fab.className = 'bfab'; fab.setAttribute('aria-expanded', 'false'); fab.setAttribute('aria-controls', 'botPanel');
    fab.innerHTML = ICON + '업무 도우미'; fab.title = '업무 도우미';
    const pan = d.createElement('section');
    pan.id = 'botPanel'; pan.className = 'bpan'; pan.setAttribute('aria-label', '업무 도우미');
    pan.innerHTML = '<header><h2>' + ICON + '업무 도우미</h2><span class="tag">조회 전용</span><button type="button" id="bReset" title="대화 지우기" aria-label="대화 지우기">↺</button><button type="button" id="bX" aria-label="업무 도우미 닫기" style="margin-left:0">×</button></header>' +
      '<div class="blog" id="bLog" role="log" aria-live="polite"></div>' +
      '<form class="bform" id="bForm"><label for="bQ" class="sr">질문</label><input id="bQ" autocomplete="off" placeholder="예: 경기철도 올해 승하차 추이"><button type="submit">보내기</button></form>';
    d.body.appendChild(fab); d.body.appendChild(pan);
    const log = pan.querySelector('#bLog'), inp = pan.querySelector('#bQ');

    let S = { open: false, msgs: [] };
    try { S = JSON.parse(sessionStorage.getItem(KEY)) || S; } catch (e) { /* 저장 불가 시 이 화면에서만 유지 */ }
    const save = () => { try { S.msgs = S.msgs.slice(-30); sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* 무시 */ } };
    const greet = () => '<p>무엇을 확인할까요? 시스템에 등록된 자료를 찾아 근거 화면과 함께 답합니다.</p>' + chips(SUG);
    function add(who, html, keep) {
      const m = d.createElement('div'); m.className = 'bm ' + who; m.innerHTML = html; log.appendChild(m);
      log.scrollTop = log.scrollHeight;
      if (keep !== false) { S.msgs.push([who, html]); save(); }
    }
    function render() { log.innerHTML = ''; if (!S.msgs.length) add('a', greet()); else S.msgs.forEach(m => add(m[0], m[1], false)); }
    function open(on) {
      S.open = on; save();
      pan.classList.toggle('on', on); fab.setAttribute('aria-expanded', String(on));
      if (on) { render(); inp.focus(); } else fab.focus();
    }
    function ask(q) {
      q = q.trim(); if (!q) return;
      add('u', esc(q));
      const w = d.createElement('div'); w.className = 'bwait'; w.textContent = '자료를 조회하고 있습니다'; log.appendChild(w); log.scrollTop = log.scrollHeight;
      setTimeout(() => Promise.resolve(route(q)).then(h => { w.remove(); add('a', h); }).catch(() => { w.remove(); add('a', '<p>자료를 불러오지 못했습니다. 잠시 후 다시 물어봐 주세요.</p>'); }), 350);
    }
    fab.onclick = () => open(true);
    pan.querySelector('#bX').onclick = () => open(false);
    pan.querySelector('#bReset').onclick = () => { S.msgs = []; save(); render(); inp.focus(); };
    pan.querySelector('#bForm').onsubmit = e => { e.preventDefault(); const q = inp.value; inp.value = ''; ask(q); };
    log.addEventListener('click', e => { const b = e.target.closest('button[data-q]'); if (b) ask(b.dataset.q); });
    pan.addEventListener('keydown', e => { if (e.key === 'Escape') open(false); });
    if (S.open) open(true);
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot); else boot();
})();
