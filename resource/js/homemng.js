/* 홈페이지 관리 공통 자료 연동 (v1.0, 2026-11-06)
   - 실사용 모드: 서버(/homeMng/data.json 등, DB cm_notice, cm_law, ntn_pr_case, loc_pr_case, cm_pst, cm_popup_mng, cm_survey_mng)가
     응답하면 DB 자료를 읽고 씀. 홈페이지(CPPR 8090)가 같은 표를 읽어 바로 반영
   - 시연 모드: 서버 응답이 없으면(게시본) 브라우저 저장소 cpprHomeMng 에 저장. 같은 출처의 CPPR 시연본이 같은 저장소를 읽음
   - 저장소 형식: {v:1, seed, notice:[], law:[], ntn:[], loc:[], pst:[], popup:[], survey:[]}, 항목마다 mod(수정 시각)
   - 첨부 파일은 시연 모드에서 이름만 기록. 브리프 표지는 작게 줄여(가로 360px) 저장 */
(function (w) {
  'use strict';
  const d = document;
  const KEY = 'cpprHomeMng';
  const SEED = /*SEED*/{"v":1,"seed":"2026-11-06a","notice":[{"id":"NTC0010","title":"2025년 민자철도 운영평가","date":"2025-09-23","views":514,"body":"2025년 민자철도 운영평가 시행(2025년 9월 16일 ~ 18일, 3일간)\n\nBTL 현장평가 (25.09.16)\n- 전라선철도, 가야철도, 이레일, 서부광역철도\n\nBTO 현장평가 (25.09.17 ~ 25.09.18)\n- 신분당선, 경기철도, 새서울철도 (25.09.17)\n- 공항철도 (25.09.18)","writer":"관리자","tmln":"Y","tmlnDate":"2025-09-23","fix":"-","start":"2025-09-23","end":"","files":[]},{"id":"NTC0009","title":"민자철도 관리지원센터 리뉴얼","date":"2024-12-11","views":357,"body":"민자철도 관리지원센터 홈페이지가 새롭게 단장하였습니다.","writer":"관리자","tmln":"N","tmlnDate":"","fix":"-","start":"2024-12-11","end":"","files":[]},{"id":"NTC0008","title":"2024년 민자철도 운영평가","date":"2024-09-11","views":366,"body":"2024년 민자철도 운영평가 시행\n\nBTL 현장평가 (24.09.03)\n- 전라선, 경전선, 서해선\n\nBTO 현장평가 (24.09.10 ~ 24.09.11)\n- 신분당선, 경기철도, 새서울철도 (24.09.10)\n- 공항철도 (24.09.11)","writer":"관리자","tmln":"Y","tmlnDate":"2024-09-11","fix":"-","start":"2024-09-11","end":"","files":[]},{"id":"NTC0007","title":"민자철도 관리지원센터 개소식","date":"2024-01-16","views":322,"body":"민자철도관리지원센터 개소식 및 개소기념 세미나 개최","writer":"관리자","tmln":"Y","tmlnDate":"2024-01-16","fix":"-","start":"2024-01-16","end":"","files":[]},{"id":"NTC0006","title":"민자철도 관리지원센터 본지정 (한국교통연구원)","date":"2023-10-19","views":246,"body":"","writer":"관리자","tmln":"Y","tmlnDate":"2023-10-19","fix":"-","start":"2023-10-19","end":"","files":[]},{"id":"NTC0005","title":"「철도사업법」 일부개정 제25조의 5 (민자철도 관리지원센터의 지정 등)","date":"2023-04-18","views":242,"body":"","writer":"관리자","tmln":"Y","tmlnDate":"2023-04-18","fix":"-","start":"2023-04-18","end":"","files":[]},{"id":"NTC0004","title":"민자철도 관리지원센터 조직 설립(한국교통연구원)","date":"2022-11-01","views":241,"body":"","writer":"관리자","tmln":"Y","tmlnDate":"2022-11-01","fix":"-","start":"2022-11-01","end":"","files":[]},{"id":"NTC0003","title":"민자철도 관리지원센터 예비지정(국토교통부 > 한국교통연구원)","date":"2022-05-17","views":262,"body":"","writer":"관리자","tmln":"Y","tmlnDate":"2022-05-17","fix":"-","start":"2022-05-17","end":"","files":[]},{"id":"NTC0002","title":"「철도사업법」 개정안 발의","date":"2021-09-07","views":243,"body":"","writer":"관리자","tmln":"Y","tmlnDate":"2021-09-07","fix":"-","start":"2021-09-07","end":"","files":[]},{"id":"NTC0001","title":"민자철도사업 관리 지원 TF 구성(한국교통연구원)","date":"2021-04-01","views":262,"body":"","writer":"관리자","tmln":"Y","tmlnDate":"2021-04-01","fix":"-","start":"2021-04-01","end":"","files":[]}],"law":[{"id":"LAW0010","title":"민간투자사업기본계획","date":"2024-01-01","views":253,"body":"","url":"","writer":"관리자","cat":"고시","kind":"","eff":"","files":[]},{"id":"LAW0009","title":"예비타당성조사 수행을 위한 세부지침 도로, 철도부문 연구","date":"2024-01-01","views":438,"body":"","url":"","writer":"관리자","cat":"지침","kind":"","eff":"","files":[]},{"id":"LAW0008","title":"철도 민간투자사업 제안에 대한 업무처리지침","date":"2024-01-01","views":244,"body":"","url":"","writer":"관리자","cat":"지침","kind":"","eff":"","files":[]},{"id":"LAW0007","title":"「대도시권 광역교통 관리에 관한 특별법」 법령단위비교표","date":"2024-01-01","views":207,"body":"","url":"","writer":"관리자","cat":"비교표","kind":"","eff":"","files":[]},{"id":"LAW0006","title":"「대도시권 광역교통 관리에 관한 특별법」 시행령","date":"2024-01-01","views":212,"body":"","url":"","writer":"관리자","cat":"시행령","kind":"","eff":"","files":[]},{"id":"LAW0005","title":"「대도시권 광역교통 관리에 관한 특별법」","date":"2024-01-01","views":217,"body":"","url":"","writer":"관리자","cat":"법률","kind":"","eff":"","files":[]},{"id":"LAW0004","title":"「도시철도법」법령단위비교표","date":"2024-01-01","views":251,"body":"","url":"","writer":"관리자","cat":"비교표","kind":"","eff":"","files":[]},{"id":"LAW0003","title":"「도시철도법」 시행규칙","date":"2024-01-01","views":256,"body":"","url":"","writer":"관리자","cat":"시행규칙","kind":"","eff":"","files":[]},{"id":"LAW0002","title":"「도시철도법」 시행령","date":"2024-01-01","views":236,"body":"","url":"","writer":"관리자","cat":"시행령","kind":"","eff":"","files":[]},{"id":"LAW0001","title":"「도시철도법」","date":"2024-01-01","views":220,"body":"","url":"","writer":"관리자","cat":"법률","kind":"","eff":"","files":[]}],"ntn":[{"id":"NTN0010","title":"튀르키예 이스탄불 북부 철도 횡단 프로젝트 입찰 공고","nation":"Türkiye","date":"2026-09-07","views":33,"body":"","url":"","srcTtl":"","writer":"관리자","area":"","src":"","files":[]},{"id":"NTN0009","title":"보츠와나 US$8 billion 철도 프로젝트, 조달 단계로 진행","nation":"Botswana","date":"2026-08-26","views":66,"body":"","url":"","srcTtl":"","writer":"관리자","area":"","src":"","files":[]},{"id":"NTN0008","title":"인도 철도, 54개 PPP 프로젝트 Rs 1.8 조 파이프라인 추진","nation":"India","date":"2026-08-13","views":66,"body":"","url":"","srcTtl":"","writer":"관리자","area":"","src":"","files":[]},{"id":"NTN0007","title":"캐나다, 터널 및 지하역 개발에 US$3 billion 계약 체결","nation":"Canada","date":"2026-08-11","views":56,"body":"","url":"","srcTtl":"","writer":"관리자","area":"","src":"","files":[]},{"id":"NTN0006","title":"짐바브웨, 대규모 경량철도 PPP 사업 승인","nation":"Zimbabwe","date":"2026-06-30","views":62,"body":"","url":"","srcTtl":"","writer":"관리자","area":"","src":"","files":[]},{"id":"NTN0005","title":"Kiewit 주도 팀, 미국 고속철도 궤도 및 시스템 패키지 공급 계약 체결","nation":"USA","date":"2026-06-12","views":57,"body":"","url":"","srcTtl":"","writer":"관리자","area":"","src":"","files":[]},{"id":"NTN0004","title":"인도, 15개 철도역 개발을 PPP 모델로 추진","nation":"India","date":"2026-05-07","views":53,"body":"","url":"","srcTtl":"","writer":"관리자","area":"","src":"","files":[]},{"id":"NTN0003","title":"보고타, 93억 달러 규모 메트로 노선 사업 사전적격심사 재개","nation":"Colombia","date":"2026-03-12","views":118,"body":"","url":"","srcTtl":"","writer":"관리자","area":"","src":"","files":[]},{"id":"NTN0002","title":"남아프리카공화국, 요하네스버그–더반 고속철도 사업 추진 본격화","nation":"South Africa","date":"2026-03-04","views":98,"body":"","url":"","srcTtl":"","writer":"관리자","area":"","src":"","files":[]},{"id":"NTN0001","title":"필리핀, 북남 통근철도 운영 및 유지보수 PPP 사업 승인","nation":"Philippines","date":"2026-03-02","views":48,"body":"","url":"","srcTtl":"","writer":"관리자","area":"","src":"","files":[]}],"loc":[{"id":"LOC0010","title":"[국회 토론회] 민자철도 20년 \"사람 줄이는 계획, 안전은 끼워 맞추기\"","date":"2026-09-30","views":45,"body":"","url":"","press":"","area":"","writer":"관리자","line":"","files":[]},{"id":"LOC0009","title":"9개 민자철도 '수도권 집중'... 지방권 '수요부족 발목'","date":"2026-08-27","views":62,"body":"","url":"","press":"","area":"","writer":"관리자","line":"","files":[]},{"id":"LOC0008","title":"공공운수노조, GTX-A 철근 누락에 민자철도 구조 비판","date":"2026-06-10","views":68,"body":"","url":"","press":"","area":"","writer":"관리자","line":"","files":[]},{"id":"LOC0007","title":"국토부, 「민자철도 안전관리 강화방안」 발표","date":"2026-04-27","views":64,"body":"","url":"","press":"","area":"","writer":"관리자","line":"","files":[]},{"id":"LOC0006","title":"새절-여의도-관악 서울대입구 '서부선 경전철', 우선협상대상자 지위 취소로 원점","date":"2026-04-08","views":79,"body":"","url":"","press":"","area":"","writer":"관리자","line":"","files":[]},{"id":"LOC0005","title":"민자철도 건설현장 '안전 관리, 감독 시스템' 2026년 2월까지 마련","date":"2026-01-15","views":61,"body":"","url":"","press":"","area":"","writer":"관리자","line":"","files":[]},{"id":"LOC0004","title":"인천-시흥 은계-서울 '서남부 광역철도', 민자사업으로 재추진","date":"2025-12-30","views":226,"body":"","url":"","press":"","area":"","writer":"관리자","line":"","files":[]},{"id":"LOC0003","title":"세종시, CTX 민자적격성 조사 통과 충청권 30분대 생활권 진입 된다","date":"2025-12-27","views":156,"body":"","url":"","press":"","area":"","writer":"관리자","line":"","files":[]},{"id":"LOC0002","title":"세종시, 올해의 뉴스 ‘CTX 민자적격성 통과’","date":"2025-12-26","views":140,"body":"","url":"","press":"","area":"","writer":"관리자","line":"","files":[]},{"id":"LOC0001","title":"GTX-C 착공 표류 관련 추가 보도","date":"2025-12-05","views":156,"body":"","url":"","press":"","area":"","writer":"관리자","line":"","files":[]}],"pst":[{"id":"PST0007","year":"2026","vol":"02","no":"01","title":"","pub":"2026-03-31","body":"","coverNm":"","cover":"","pdfNm":"민자교통 SOC Brief 2026 Vol.02 No.01.pdf","down":30},{"id":"PST0006","year":"2025","vol":"01","no":"04","title":"","pub":"2025-12-31","body":"","coverNm":"","cover":"","pdfNm":"민자교통 SOC Brief 2025 Vol.01 No.04.pdf","down":113},{"id":"PST0005","year":"2025","vol":"01","no":"03","title":"","pub":"2025-09-30","body":"","coverNm":"표지_2025-01-03.jpg","cover":"","pdfNm":"민자교통 SOC Brief 2025 Vol.01 No.03.pdf","down":196},{"id":"PST0004","year":"2025","vol":"01","no":"02","title":"","pub":"2025-06-30","body":"","coverNm":"표지_2025-01-02.jpg","cover":"","pdfNm":"민자교통 SOC Brief 2025 Vol.01 No.02.pdf","down":279},{"id":"PST0003","year":"2025","vol":"01","no":"01","title":"","pub":"2025-03-31","body":"","coverNm":"","cover":"","pdfNm":"민자교통 SOC Brief 2025 Vol.01 No.01.pdf","down":62},{"id":"PST0002","year":"2024","vol":"01","no":"02","title":"","pub":"2024-07-31","body":"","coverNm":"","cover":"","pdfNm":"민자철도 Brief 2024 Vol.01 No.02.pdf","down":145},{"id":"PST0001","year":"2024","vol":"01","no":"01","title":"","pub":"2024-01-31","body":"","coverNm":"","cover":"","pdfNm":"민자철도 Brief 2024 Vol.01 No.01.pdf","down":228}],"popup":[{"id":"P5","type":"A","tag":"NOTICE","title":"제안서 평가위원 모집 안내","sub":"접수 기간 2026. 12. 1. ~ 2027. 1. 31.","items":[],"url":"/info/evaluator","btn":"공고 보기","start":"2026-11-01 09:00","end":"2027-01-31 18:00","pos":"첫 화면 왼쪽 위","use":"Y"},{"id":"P4","type":"B","tag":"BRIEF","title":"민자교통 SOC Brief 2026 Vol.02 No.02 발간","sub":"민자철도 운영평가 결과와 시사점 (예시)","items":[],"url":"/info/socBrief","btn":"브리프 보기","start":"2026-12-31 09:00","end":"2027-01-15 18:00","pos":"첫 화면 가운데","use":"Y"},{"id":"P3","type":"C","tag":"EVENT","title":"해외 민자철도 사례 세미나","sub":"2026년 11월 중 개최 (예시)","items":[],"url":"https://example.com/seminar","btn":"자세히 보기","start":"2026-10-20 09:00","end":"2026-11-15 18:00","pos":"첫 화면 오른쪽 위","use":"Y"},{"id":"P2","type":"A","tag":"NOTICE","title":"추석 연휴 시스템 점검 안내","sub":"점검 시간 동안 일부 기능 중지 (예시)","items":[],"url":"","btn":"","start":"2026-09-20 09:00","end":"2026-10-05 18:00","pos":"첫 화면 왼쪽 위","use":"Y"},{"id":"P1","type":"A","tag":"NOTICE","title":"현장체험평가단 모집","sub":"모집 결과는 공지사항 참고 (예시)","items":[],"url":"/info/notice","btn":"공지 보기","start":"2026-08-01 09:00","end":"2026-08-31 18:00","pos":"첫 화면 왼쪽 위","use":"N"}],"survey":[{"id":"S13","line":"GTX-A(운정중앙~서울)","title":"2026년 GTX-A 이용자 만족도 조사","how":"자체 설문","url":"","start":"2026-10-20","end":"2026-11-20","use":"Y","resp":120,"sat":"3.4","qs":["3.1","3.6","4.1","4.6","3.4","3.9"]},{"id":"S12","line":"서해선(대곡~소사)","title":"2026년 서해선 이용자 만족도 조사","how":"네이버 폼","url":"https://example.com/survey","start":"2026-11-15","end":"2026-12-15","use":"Y","resp":0,"sat":"-","qs":["-","-","-","-","-","-"]},{"id":"S11","line":"서해선(소사~원시)","title":"2026년 서해선 이용자 만족도 조사","how":"네이버 폼","url":"https://example.com/survey","start":"2026-06-01","end":"2026-06-30","use":"Y","resp":646,"sat":"3.4","qs":["3.7","4.2","4.7","3.5","4.0","4.5"]},{"id":"S10","line":"경전선(함안~진주)","title":"2026년 경전선 이용자 만족도 조사","how":"자체 설문","url":"","start":"2026-06-01","end":"2026-06-30","use":"Y","resp":909,"sat":"4.1","qs":["4.0","4.5","3.3","3.8","4.3","3.1"]},{"id":"S9","line":"전라선(익산~신리)","title":"2026년 전라선 이용자 만족도 조사","how":"네이버 폼","url":"https://example.com/survey","start":"2026-06-01","end":"2026-06-30","use":"Y","resp":272,"sat":"3.4","qs":["4.3","3.1","3.6","4.1","4.6","3.4"]},{"id":"S8","line":"신분당선(신사~강남)","title":"2026년 신분당선 이용자 만족도 조사","how":"네이버 폼","url":"https://example.com/survey","start":"2026-10-20","end":"2026-11-20","use":"Y","resp":535,"sat":"4.1","qs":["4.6","3.4","3.9","4.4","3.2","3.7"]},{"id":"S7","line":"신분당선(정자~광교)","title":"2026년 신분당선 이용자 만족도 조사","how":"자체 설문","url":"","start":"2026-11-15","end":"2026-12-15","use":"Y","resp":0,"sat":"-","qs":["-","-","-","-","-","-"]},{"id":"S6","line":"신분당선(강남~정자)","title":"2026년 신분당선 이용자 만족도 조사","how":"네이버 폼","url":"https://example.com/survey","start":"2026-06-01","end":"2026-06-30","use":"Y","resp":161,"sat":"4.1","qs":["3.5","4.0","4.5","3.3","3.8","4.3"]},{"id":"S5","line":"인천국제공항철도","title":"2026년 인천국제공항철도 이용자 만족도 조사","how":"네이버 폼","url":"https://example.com/survey","start":"2026-06-01","end":"2026-06-30","use":"Y","resp":424,"sat":"3.4","qs":["3.8","4.3","3.1","3.6","4.1","4.6"]},{"id":"S4","line":"신분당선(신사~강남)","title":"2025년 신분당선 이용자 만족도 조사","how":"자체 설문","url":"","start":"2025-06-01","end":"2025-06-30","use":"Y","resp":687,"sat":"4.1","qs":["4.1","4.6","3.4","3.9","4.4","3.2"]},{"id":"S3","line":"신분당선(정자~광교)","title":"2026년 신분당선 이용자 만족도 조사","how":"네이버 폼","url":"https://example.com/survey","start":"2026-10-20","end":"2026-11-20","use":"Y","resp":950,"sat":"3.4","qs":["4.4","3.2","3.7","4.2","4.7","3.5"]},{"id":"S2","line":"신분당선(강남~정자)","title":"2026년 신분당선 이용자 만족도 조사","how":"네이버 폼","url":"https://example.com/survey","start":"2026-11-15","end":"2026-12-15","use":"Y","resp":0,"sat":"-","qs":["-","-","-","-","-","-"]},{"id":"S1","line":"인천국제공항철도","title":"2025년 인천국제공항철도 이용자 만족도 조사","how":"자체 설문","url":"","start":"2025-06-01","end":"2025-06-30","use":"Y","resp":576,"sat":"3.4","qs":["3.3","3.8","4.3","3.1","3.6","4.1"]}]};
  const src = (d.currentScript && d.currentScript.getAttribute('src')) || '';
  const BASE = src.indexOf('/resource/js/homemng.js') > 0 ? src.slice(0, src.indexOf('/resource/js/homemng.js')) : '';
  const NET = '서버와 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.';
  const FIELDS = {
    notice: ['id', 'title', 'body', 'date', 'views', 'writer', 'tmln', 'tmlnDate', 'fix', 'start', 'end', 'files'],
    law: ['id', 'title', 'body', 'date', 'views', 'writer', 'url', 'cat', 'kind', 'eff', 'files'],
    ntn: ['id', 'title', 'nation', 'date', 'views', 'writer', 'body', 'url', 'srcTtl', 'area', 'src', 'files'],
    loc: ['id', 'title', 'date', 'views', 'writer', 'body', 'url', 'press', 'area', 'line', 'files'],
    pst: ['id', 'year', 'vol', 'no', 'title', 'pub', 'body', 'coverNm', 'cover', 'pdfNm', 'down', 'files'],
    popup: ['id', 'type', 'tag', 'title', 'sub', 'items', 'url', 'btn', 'start', 'end', 'pos', 'use'],
    survey: ['id', 'line', 'title', 'how', 'url', 'start', 'end', 'use', 'resp', 'sat', 'qs']
  };
  const PRE = { notice: 'NTC', law: 'LAW', ntn: 'NTN', loc: 'LOC', pst: 'PST', popup: 'P', survey: 'S' };
  const clone = o => JSON.parse(JSON.stringify(o));
  const pad = n => String(n).padStart(2, '0');

  /* 한국 시각 */
  function kst() { const t = new Date(Date.now() + 9 * 36e5); return t.getUTCFullYear() + '-' + pad(t.getUTCMonth() + 1) + '-' + pad(t.getUTCDate()) + ' ' + pad(t.getUTCHours()) + ':' + pad(t.getUTCMinutes()); }
  const today = () => kst().slice(0, 10);

  function store() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { s = null; }
    if (!s || s.v !== 1 || s.seed !== SEED.seed) s = clone(SEED);
    Object.keys(FIELDS).forEach(k => { if (!Array.isArray(s[k])) s[k] = clone(SEED[k]); });
    return s;
  }
  function write(s) {
    s.at = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(s)); }
    catch (e) { throw new Error('브라우저 저장 공간이 부족해 저장하지 못했습니다. 표지 이미지를 빼고 다시 저장해 주세요.'); }
  }
  function clean(kind, r) { const o = {}; FIELDS[kind].forEach(k => { if (r[k] !== undefined) o[k] = r[k]; }); return o; }
  function newId(kind, list) {
    const p = PRE[kind], n = list.reduce((m, r) => { const x = String(r.id || '').slice(p.length); return /^\d+$/.test(x) ? Math.max(m, +x) : m; }, 0) + 1;
    return p + (p.length === 3 ? String(n).padStart(4, '0') : n);
  }

  /* 브리프 표지: 가로 360px 이하 JPEG 로 줄여 data URL (저장소 한도 대비) */
  function shrink(file) {
    return new Promise(res => {
      if (!file || !/^image\//.test(file.type)) { res(''); return; }
      const fr = new FileReader();
      fr.onload = () => {
        const im = new Image();
        im.onload = () => {
          const k = Math.min(1, 360 / im.width), c = d.createElement('canvas');
          c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
          c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
          res(c.toDataURL('image/jpeg', 0.8));
        };
        im.onerror = () => res('');
        im.src = fr.result;
      };
      fr.onerror = () => res('');
      fr.readAsDataURL(file);
    });
  }

  let mode = null;
  const json = r => { if (!r.ok) throw new Error(r.status); return r.json(); };

  /* 자료 읽기: 서버가 응답하면 실사용(DB), 아니면 시연(브라우저 저장소) */
  function load(kind) {
    const demo = () => { mode = 'demo'; return { mode: 'demo', rows: store()[kind] }; };
    if (mode === 'demo') return Promise.resolve(demo());
    return fetch(BASE + '/homeMng/data.json?kind=' + encodeURIComponent(kind), { credentials: 'same-origin', headers: { Accept: 'application/json' } })
      .then(r => r.ok ? r.json() : null).catch(() => null)
      .then(x => { if (x && x.ok && Array.isArray(x.rows)) { mode = 'real'; return { mode: 'real', rows: x.rows }; } return demo(); });
  }

  /* 저장: row 는 FIELDS 형식, files 는 {file, cover, pdf} (File 또는 null) */
  function save(kind, row, files) {
    row = clean(kind, row);
    files = files || {};
    if (mode === 'real') {
      const fd = new FormData();
      fd.append('kind', kind); fd.append('row', JSON.stringify(row));
      ['file', 'cover', 'pdf'].forEach(k => { if (files[k]) fd.append(k, files[k]); });
      return fetch(BASE + '/homeMng/save.json', { method: 'POST', credentials: 'same-origin', body: fd })
        .then(json, () => { throw new Error(NET); })
        .then(x => { if (!x.ok) throw new Error(x.msg || NET); return x; });
    }
    return (files.cover ? shrink(files.cover) : Promise.resolve(null)).then(cv => {
      const s = store(), list = s[kind], now = new Date().toISOString();
      if (files.file) row.files = [{ id: 'F' + Date.now(), name: files.file.name, size: files.file.size }];
      if (files.pdf) row.pdfNm = files.pdf.name;
      if (files.cover) { row.coverNm = files.cover.name; row.cover = cv || ''; }
      row.mod = now;
      const i = row.id ? list.findIndex(r => String(r.id) === String(row.id)) : -1;
      if (i >= 0) list[i] = Object.assign({}, list[i], row);
      else { row.id = newId(kind, list); list.unshift(row); }
      write(s);
      return { ok: true, id: row.id };
    });
  }

  function remove(kind, ids) {
    ids = ids.map(String);
    if (mode === 'real') {
      return fetch(BASE + '/homeMng/delete.json', { method: 'POST', credentials: 'same-origin', body: new URLSearchParams({ kind: kind, ids: ids.join(',') }) })
        .then(json, () => { throw new Error(NET); })
        .then(x => { if (!x.ok) throw new Error(x.msg || NET); return x; });
    }
    return new Promise(res => { const s = store(); s[kind] = s[kind].filter(r => ids.indexOf(String(r.id)) < 0); write(s); res({ ok: true }); });
  }

  /* 다른 탭(CPPRMS 다른 화면, CPPR 시연본)에서 바꾸면 다시 그림 */
  function onChange(fn) { w.addEventListener('storage', e => { if (e.key === KEY && mode === 'demo') fn(); }); }

  /* 링크 주소: http, https 전체 주소 또는 / 로 시작하는 사이트 안 주소 */
  const urlOk = u => !u || /^(https?:\/\/[^\s<>"']+|\/(?!\/)[^\s<>"']*)$/i.test(u);

  /* 게시판 화면 공통: 불러오기, 등록, 수정, 선택 삭제 (UI.list 사용)
     o: {kind, excelName, note(mode), filters, cols, fields(mode), toForm(r, mode), toRow(v, old, mode) -> {row, files} | false,
         deco(r, mode), sort(rows), addTitle, editTitle, btn, done, detail:{title, fields, body, extra, buttons(r, api, mode, quick)}, points}
     filters, cols, detail.fields 항목에 demo:true 이면 시연 모드에서만(DB 에 칸이 없는 항목) */
  function board(o) {
    return load(o.kind).then(res => {
      const m = res.mode;
      const pick = a => (a || []).filter(x => !(x.demo && m === 'real'));
      const prep = L => { L = L.map(r => (o.deco && o.deco(r, m)) || r); if (o.sort) o.sort(L); return L; };
      let lst;
      const reload = () => load(o.kind).then(x => lst.setRows(prep(x.rows)));
      const fail = e => UI.toast(e && e.message ? e.message : NET);
      const run = (row, files, msg) => save(o.kind, row, files).then(reload).then(() => UI.toast(msg), fail);
      const submit = (v, old) => {
        const out = o.toRow(v, old ? clean(o.kind, old) : null, m);
        if (!out) return false;
        run(out.row, out.files, old ? '수정했습니다.' : o.done);
      };
      const quick = (r, patch, msg) => run(Object.assign(clean(o.kind, r), patch), null, msg);
      const det = o.detail || {};
      const fields = pick(o.fields(m));
      lst = UI.list({
        el: '#list', rows: prep(res.rows), check: true, excelName: o.excelName, note: o.note ? o.note(m) : '', pageSize: o.pageSize,
        filters: pick(o.filters), cols: pick(o.cols), buttons: ['add', 'del', 'excel'],
        add: { title: o.addTitle, btn: o.btn, done: o.done, width: o.width, fields: fields, submit: v => submit(v, null) },
        onDel: gone => remove(o.kind, gone.map(r => r.id)).then(reload).then(() => UI.toast(gone.length + '건을 삭제했습니다.'), fail),
        detail: {
          width: det.width, title: det.title, fields: pick(det.fields), body: det.body, extra: det.extra,
          buttons: (r, api) => [{ t: '수정', fn: () => { lst.openAdd(o.toForm ? o.toForm(r, m) : r, { title: o.editTitle, submit: v => submit(v, r) }); } }]
            .concat(det.buttons ? det.buttons(r, api, m, quick) : [])
        }
      });
      onChange(reload);
      if (o.points) UI.points(o.points);
      return { mode: m, list: lst, reload: reload };
    });
  }

  w.HM = { KEY, BASE, NET, load, save, remove, clean, board, onChange, urlOk, kst, today, get mode() { return mode; } };
})(window);
