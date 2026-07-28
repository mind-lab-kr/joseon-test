/* ==========================================================
   조선시대에 태어났다면? 심리테스트 로직
   ========================================================== */

// ---------- 결과 공유 링크의 기준 주소 ----------
// 어떤 주소로 접속했든, 공유 링크는 항상 이 고정 주소(메인 페이지)를 기준으로 생성됩니다.
// 메인 페이지(index.html)가 result 파라미터를 감지해 자동으로 결과 화면까지 안내합니다.
const SHARE_BASE_URL = "https://mind-lab-kr.github.io/joseon-test/";

// ---------- 쿠팡 파트너스 링크 (순차 대체용) ----------
// 첫 번째 링크가 품절/오류일 경우, 사용자가 "다른 상품 보기" 버튼을 눌러
// 두 번째 → 세 번째 링크로 순환하며 열어볼 수 있습니다.
const COUPANG_LINKS = [
  "https://link.coupang.com/a/fJf1WqRn7A",
  "https://link.coupang.com/a/fJf3e5uICa",
  "https://link.coupang.com/a/fJf4Co2ddk"
];

// ---------- 결과 유형 데이터 ----------
const RESULT_TYPES = {
  yangban: {
    key: "yangban",
    emoji: "📜",
    tag: "학자형",
    title: "정승을 꿈꾸는 선비",
    basicDesc: [
      "당신은 조선시대라면 매일 서책을 곁에 두고 학문을 갈고닦는 '선비'였을 거예요.",
      "원칙과 명분을 중요하게 여기고, 신중하게 생각한 뒤에 움직이는 스타일이죠."
    ],
    stats: { 리더십: 65, 감성: 55, 현실감각: 70, 사교성: 45, 학구열: 95, 모험심: 30 },
    coupang: {
      itemEmoji: "📚",
      itemName: "선비st. 독서등 & 다이어리 세트",
      itemDesc: "학구열 넘치는 당신을 위한 집중력 UP 아이템"
    },
    deep: {
      personality: [
        "당신은 즉흥적인 결정보다 근거와 원칙에 따라 판단하는 것을 선호합니다. 조선시대였다면 과거시험을 준비하며 밤을 새우는 유형이었을 거예요.",
        "겉으로는 조용해 보이지만, 내면에는 신념을 지키려는 강한 의지가 자리하고 있습니다."
      ],
      strengths: ["깊이 있는 사고력과 분석력", "말보다 행동으로 신뢰를 쌓는 성실함", "위기 상황에서도 흔들리지 않는 침착함"],
      weaknesses: ["결정이 느리고 완벽주의적인 면", "감정 표현에 서툴러 오해를 사기도 함", "새로운 시도보다 안정을 우선시하는 보수적 성향"],
      modernJob: "연구원, 변호사, 교수, 정책기획자, 작가 등 깊은 사고와 전문성이 필요한 직군",
      compatibility: "무관 장수형과 만나면 서로의 부족한 면(신중함 ↔ 추진력)을 채워주는 최고의 짝꿍이 됩니다.",
      advice: "완벽을 기다리다 기회를 놓치는 경우가 많아요. '70%의 확신'이면 일단 시작해보는 연습을 해보세요."
    }
  },
  general: {
    key: "general",
    emoji: "🗡️",
    tag: "리더형",
    title: "전장을 호령하는 무관 장수",
    basicDesc: [
      "당신은 조선시대라면 전장에서 병사들을 진두지휘하는 '장수'였을 가능성이 높아요.",
      "결단력이 빠르고 위기 상황에서 오히려 빛나는 리더십을 가진 타입입니다."
    ],
    stats: { 리더십: 95, 감성: 40, 현실감각: 75, 사교성: 70, 학구열: 45, 모험심: 90 },
    coupang: {
      itemEmoji: "💪",
      itemName: "리더의 체력관리 홈트 세트",
      itemDesc: "카리스마 넘치는 당신의 에너지를 지켜줄 필수템"
    },
    deep: {
      personality: [
        "당신은 상황 판단이 빠르고, 결정을 내리면 바로 행동으로 옮기는 실행력의 소유자입니다.",
        "사람들 앞에 서는 것을 두려워하지 않고, 무리를 이끄는 위치에서 오히려 편안함을 느낍니다."
      ],
      strengths: ["즉각적인 판단력과 실행력", "위기 속에서 팀을 이끄는 카리스마", "육체적·정신적으로 강한 회복력"],
      weaknesses: ["성급하게 밀어붙여 주변을 놓치는 경우", "세밀한 계획보다 직감에 의존하는 편", "때때로 독단적으로 보일 수 있음"],
      modernJob: "스타트업 대표, 영업/마케팅 총괄, 스포츠 감독, 소방관·군인 등 결단력이 필요한 직군",
      compatibility: "학구파 선비형과 함께하면 즉흥적인 당신의 실행력에 신중함이 더해져 완벽한 팀이 됩니다.",
      advice: "속도만큼 방향도 중요해요. 결정 전 딱 5분만 '한 번 더 생각하기'를 습관화해보세요."
    }
  },
  merchant: {
    key: "merchant",
    emoji: "💰",
    tag: "전략가형",
    title: "팔도를 누비는 거상",
    basicDesc: [
      "당신은 조선시대라면 이문을 정확히 계산하며 팔도를 오가는 '거상'이었을 거예요.",
      "현실적이고 계산이 빠르며, 기회를 포착하는 감각이 뛰어난 타입입니다."
    ],
    stats: { 리더십: 70, 감성: 45, 현실감각: 95, 사교성: 80, 학구열: 55, 모험심: 75 },
    coupang: {
      itemEmoji: "🧮",
      itemName: "가계부 & 재테크 다이어리",
      itemDesc: "타고난 셈이 빠른 당신의 자산관리 필수 아이템"
    },
    deep: {
      personality: [
        "당신은 손해와 이익을 정확히 계산하고, 감정보다 데이터와 현실을 우선시합니다.",
        "새로운 기회를 포착하는 눈이 밝고, 인맥과 정보를 활용하는 데 능숙합니다."
      ],
      strengths: ["뛰어난 협상력과 실리 감각", "빠르게 트렌드를 파악하는 능력", "폭넓은 인맥 관리 능력"],
      weaknesses: ["손해를 극도로 싫어해 기회를 놓칠 때가 있음", "지나치게 계산적으로 보일 수 있음", "감성적 교류에는 다소 서툴 수 있음"],
      modernJob: "사업가, 투자자, 컨설턴트, 무역업, 부동산·금융 전문가",
      compatibility: "예인/화공형과 만나면 실리적인 당신에게 감성과 여유를 더해줄 수 있어요.",
      advice: "이익 계산도 좋지만, 가끔은 손해를 감수하고 베푸는 경험이 더 큰 신뢰와 기회를 가져다줄 거예요."
    }
  },
  artist: {
    key: "artist",
    emoji: "🎨",
    tag: "감성형",
    title: "궐 안을 물들이는 화공",
    basicDesc: [
      "당신은 조선시대라면 그림과 시문으로 마음을 표현하는 '화공(예술가)'였을 거예요.",
      "감성이 풍부하고 아름다움을 알아보는 눈을 가진 섬세한 타입입니다."
    ],
    stats: { 리더십: 40, 감성: 95, 현실감각: 50, 사교성: 55, 학구열: 70, 모험심: 60 },
    coupang: {
      itemEmoji: "🖌️",
      itemName: "감성 드로잉 & 캘리그라피 세트",
      itemDesc: "예술적 감각이 뛰어난 당신을 위한 힐링템"
    },
    deep: {
      personality: [
        "당신은 세상을 아름다움과 감정의 언어로 받아들입니다. 작은 풍경 하나에도 깊은 영감을 느끼죠.",
        "타인의 감정을 잘 캐치하고, 자신만의 세계와 표현 방식을 소중히 여깁니다."
      ],
      strengths: ["뛰어난 창의력과 심미적 감각", "깊은 공감능력", "독창적인 아이디어를 만들어내는 능력"],
      weaknesses: ["감정 기복이 클 수 있음", "현실적인 계산이나 협상에 약할 수 있음", "비판에 예민하게 반응하는 경향"],
      modernJob: "디자이너, 작가, 아티스트, 큐레이터, 콘텐츠 크리에이터",
      compatibility: "현실적인 거상형과 함께하면 당신의 창의력이 실제 성과로 이어지는 환상의 조합이 됩니다.",
      advice: "예민한 감성은 최고의 재능이에요. 다만 스스로를 다그치지 말고, 감정을 충분히 쉬게 해주는 루틴을 만들어보세요."
    }
  },
  righteous: {
    key: "righteous",
    emoji: "🔨",
    tag: "정의형",
    title: "마을을 지키는 의병 장인",
    basicDesc: [
      "당신은 조선시대라면 손재주와 정의감으로 마을을 지키는 '의병 겸 장인'이었을 거예요.",
      "실용적이고 손으로 뭔가를 만들어내는 데 능숙하며, 불의를 보면 참지 못하는 타입입니다."
    ],
    stats: { 리더십: 60, 감성: 60, 현실감각: 80, 사교성: 65, 학구열: 50, 모험심: 80 },
    coupang: {
      itemEmoji: "🛠️",
      itemName: "DIY 공구 & 만들기 키트",
      itemDesc: "손재주 좋은 당신을 위한 실용 만능템",
      link: "https://www.coupang.com/np/search?q=DIY%20%EA%B3%B5%EA%B5%AC%20%EC%84%B8%ED%8A%B8"
    },
    deep: {
      personality: [
        "당신은 말보다 행동으로 증명하는 사람입니다. 불합리한 상황을 보면 나서서 바꾸려 하죠.",
        "손으로 무언가를 만들거나 고치는 데서 큰 만족감을 느끼는 실용주의자입니다."
      ],
      strengths: ["강한 정의감과 책임감", "뛰어난 문제 해결 능력과 손재주", "위기 상황에서 주변을 지키려는 용기"],
      weaknesses: ["너무 정의로워 융통성이 부족할 때가 있음", "자신을 잘 돌보지 않고 남을 먼저 챙기는 경향", "타협보다 정면돌파를 택해 손해를 볼 수 있음"],
      modernJob: "엔지니어, 목수·장인, 사회활동가, 소방관, 창업가(제조/핸드메이드)",
      compatibility: "예인/기생형처럼 사교적인 유형과 만나면 당신의 우직함에 유쾌함이 더해져 균형이 잡힙니다.",
      advice: "모든 걸 혼자 짊어지지 않아도 돼요. 주변에 도움을 요청하는 것도 진짜 강함이라는 걸 기억하세요."
    }
  },
  entertainer: {
    key: "entertainer",
    emoji: "🎭",
    tag: "매력형",
    title: "만인의 마음을 홀리는 예인",
    basicDesc: [
      "당신은 조선시대라면 노래와 춤, 재치있는 입담으로 사람들을 매혹하는 '예인'이었을 거예요.",
      "사교성이 뛰어나고 분위기를 이끄는 데 타고난 재능이 있는 타입입니다."
    ],
    stats: { 리더십: 55, 감성: 80, 현실감각: 55, 사교성: 95, 학구열: 45, 모험심: 70 },
    coupang: {
      itemEmoji: "💄",
      itemName: "셀프 뷰티 & 스타일링 세트",
      itemDesc: "어디서든 시선을 사로잡는 당신을 위한 아이템"
    },
    deep: {
      personality: [
        "당신은 어디에 있든 분위기를 살리고 사람들의 마음을 편하게 만드는 재주가 있습니다.",
        "눈치가 빠르고 상황에 맞는 말과 행동을 순발력 있게 해내는 사교의 달인입니다."
      ],
      strengths: ["뛰어난 사교성과 순발력", "분위기를 읽고 이끄는 능력", "다양한 사람들과 쉽게 친해지는 매력"],
      weaknesses: ["혼자 있는 시간에 취약할 수 있음", "깊은 관계보다 넓은 관계에 치중하는 경향", "타인의 평가에 민감할 수 있음"],
      modernJob: "방송인, MC, 마케터, 인플루언서, 이벤트 기획자, 서비스업 리더",
      compatibility: "우직한 의병/장인형과 만나면 당신의 유쾌함이 그의 진지함을 부드럽게 풀어주는 좋은 짝이 됩니다.",
      advice: "모두에게 사랑받으려 애쓰지 않아도 돼요. 나를 진짜로 알아주는 몇 명이면 충분하다는 걸 잊지 마세요."
    }
  }
};

// ---------- 질문 데이터 ----------
// value: RESULT_TYPES의 key
const QUESTIONS = [
  {
    q: "마을에 큰 잔치가 열렸다. 당신의 모습은?",
    options: [
      { text: "구석에서 조용히 책을 읽는다", value: "yangban" },
      { text: "사람들 앞에서 흥을 돋우며 분위기를 이끈다", value: "entertainer" },
      { text: "장사 기회가 없는지 슬쩍 둘러본다", value: "merchant" },
      { text: "잔치 음식과 풍경을 그림으로 남긴다", value: "artist" }
    ]
  },
  {
    q: "갑자기 마을에 도적이 나타났다! 당신은?",
    options: [
      { text: "무기를 들고 앞장서서 맞선다", value: "general" },
      { text: "이웃들과 힘을 합쳐 대비책을 만든다", value: "righteous" },
      { text: "상황을 냉정히 파악하고 손익을 따져본다", value: "merchant" },
      { text: "책에서 본 지혜를 떠올려 대응 방법을 고민한다", value: "yangban" }
    ]
  },
  {
    q: "당신이 가장 견디기 힘든 상황은?",
    options: [
      { text: "누군가 부당한 대우를 받는 걸 보는 것", value: "righteous" },
      { text: "혼자 조용히 있어야 하는 것", value: "entertainer" },
      { text: "손해 보는 거래를 하는 것", value: "merchant" },
      { text: "아름답지 않은 것을 계속 보는 것", value: "artist" }
    ]
  },
  {
    q: "임금님이 당신에게 벼슬을 내린다면 어떤 자리를 원하나요?",
    options: [
      { text: "학문을 논하는 홍문관", value: "yangban" },
      { text: "나라를 지키는 병조(군사)", value: "general" },
      { text: "궁의 그림을 그리는 도화서", value: "artist" },
      { text: "사람들과 어울리는 예조(의례/예능)", value: "entertainer" }
    ]
  },
  {
    q: "친구가 고민을 상담해왔다. 당신의 반응은?",
    options: [
      { text: "일단 재미있는 이야기로 분위기를 풀어준다", value: "entertainer" },
      { text: "논리적으로 원인을 분석해준다", value: "yangban" },
      { text: "직접 나서서 해결해준다", value: "general" },
      { text: "감정에 깊이 공감하며 들어준다", value: "artist" }
    ]
  },
  {
    q: "장터에서 물건을 살 때 당신의 스타일은?",
    options: [
      { text: "가격을 꼼꼼히 흥정한다", value: "merchant" },
      { text: "필요한 재료(도구/공구)를 유심히 본다", value: "righteous" },
      { text: "예쁜 물건에 자꾸 눈이 간다", value: "artist" },
      { text: "이야기 잘하는 상인의 말에 이끌린다", value: "entertainer" }
    ]
  },
  {
    q: "위기 상황에서 당신이 가장 먼저 하는 생각은?",
    options: [
      { text: "누가 이 상황을 책임지고 이끌어야 하는가", value: "general" },
      { text: "이 상황에서 이득/손해가 무엇인가", value: "merchant" },
      { text: "원칙대로 처리하면 어떻게 되는가", value: "yangban" },
      { text: "억울한 사람이 없는가", value: "righteous" }
    ]
  },
  {
    q: "당신의 하루 중 가장 행복한 순간은?",
    options: [
      { text: "새로운 지식을 깨달았을 때", value: "yangban" },
      { text: "사람들과 웃고 떠들 때", value: "entertainer" },
      { text: "내 손으로 무언가를 완성했을 때", value: "righteous" },
      { text: "멋진 풍경이나 예술을 감상할 때", value: "artist" }
    ]
  },
  {
    q: "당신이 가장 자신 있는 능력은?",
    options: [
      { text: "설득력과 협상력", value: "merchant" },
      { text: "결단력과 추진력", value: "general" },
      { text: "분석력과 통찰력", value: "yangban" },
      { text: "손재주와 문제해결력", value: "righteous" }
    ]
  },
  {
    q: "낯선 사람을 처음 만났을 때 당신은?",
    options: [
      { text: "먼저 말을 걸며 분위기를 편하게 만든다", value: "entertainer" },
      { text: "조심스럽게 상대를 파악한 후 다가간다", value: "yangban" },
      { text: "이 사람과 함께하면 이득이 될지 생각해본다", value: "merchant" },
      { text: "상대의 감정과 분위기를 먼저 살핀다", value: "artist" }
    ]
  }
];

// ---------- 상태 ----------
const state = {
  current: 0,
  answers: new Array(QUESTIONS.length).fill(null),
  scores: {},
  coupangLinkIndex: 0 // 현재 열려있는(또는 다음에 열릴) 쿠팡 링크 인덱스
};

// 심층 결과보기를 누르면 쿠팡 링크를 새 창으로 열고, 그 창이 닫히면(혹은 다시 이 창으로
// 돌아오면) 자동으로 심층 결과 화면을 보여준다.
// 팝업이 차단되었거나 링크가 열리지 않는 경우를 대비해 순서대로 다음 링크를 사용한다.
function openDeepResultFlow() {
  const link = COUPANG_LINKS[state.coupangLinkIndex % COUPANG_LINKS.length];
  state.coupangLinkIndex++;

  const popup = window.open(link, "_blank", "noopener");

  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    window.removeEventListener("focus", onFocusBack);
    clearInterval(pollTimer);
    showStage(3);
  };

  // 새 창이 닫히는 걸 감지 (팝업이 성공적으로 열렸을 때)
  let pollTimer = null;
  if (popup) {
    pollTimer = setInterval(() => {
      if (popup.closed) reveal();
    }, 500);
  }

  // 팝업이 차단되어 열리지 않았거나, 사용자가 이 창으로 다시 돌아온 경우를 대비한 보조 감지
  const onFocusBack = () => reveal();
  window.addEventListener("focus", onFocusBack);

  // 혹시 아무 이벤트도 감지되지 않을 경우를 대비한 안전장치(최대 대기 시간 후 자동 진행)
  setTimeout(reveal, 15000);
}

function calcResultKey() {
  const scores = {};
  Object.keys(RESULT_TYPES).forEach(k => scores[k] = 0);
  state.answers.forEach(a => { if (a) scores[a] = (scores[a] || 0) + 1; });
  let best = Object.keys(RESULT_TYPES)[0];
  Object.keys(scores).forEach(k => { if (scores[k] > scores[best]) best = k; });
  state.scores = scores;
  return best;
}

// ---------- 렌더링 ----------
function renderQuestions() {
  const wrap = document.getElementById("questionsWrap");
  wrap.innerHTML = QUESTIONS.map((item, qi) => `
    <div class="question-block ${qi === 0 ? 'active' : ''}" data-index="${qi}">
      <div class="question-title"><span class="question-number">Q${qi + 1}.</span>${item.q}</div>
      <div class="options-list">
        ${item.options.map((opt, oi) => `
          <button type="button" class="option-btn" data-qi="${qi}" data-oi="${oi}" data-value="${opt.value}">
            ${opt.text}
          </button>
        `).join("")}
      </div>
    </div>
  `).join("");

  wrap.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", onSelectOption);
  });

  updateProgress();
}

function onSelectOption(e) {
  const btn = e.currentTarget;
  const qi = parseInt(btn.dataset.qi, 10);
  const value = btn.dataset.value;

  state.answers[qi] = value;

  const block = btn.closest(".question-block");
  block.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  setTimeout(() => {
    if (qi < QUESTIONS.length - 1) {
      goToQuestion(qi + 1);
    } else {
      showResult();
    }
  }, 220);
}

function goToQuestion(index) {
  state.current = index;
  document.querySelectorAll(".question-block").forEach(b => {
    b.classList.toggle("active", parseInt(b.dataset.index, 10) === index);
  });
  updateProgress();
}

function updateProgress() {
  const answered = state.answers.filter(a => a !== null).length;
  const pct = Math.round((answered / QUESTIONS.length) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressLabel").textContent = `${answered} / ${QUESTIONS.length}`;
}

function startQuiz() {
  document.getElementById("introPanel").style.display = "none";
  document.getElementById("quizPanel").style.display = "block";
  document.getElementById("resultArea").style.display = "none";
  state.current = 0;
  state.answers = new Array(QUESTIONS.length).fill(null);
  goToQuestion(0);
}

function showResult() {
  const key = calcResultKey();
  renderResultStages(key);
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultArea").style.display = "block";
  updateShareUrl(key);
  showStage(1);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateShareUrl(key) {
  // 실제 주소창 URL은 현재 접속 도메인 그대로 유지 (히스토리 관리용)
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("result", key);
  history.replaceState(null, "", currentUrl.toString());
}

function getShareUrl(key) {
  // 공유용 링크는 항상 고정된 GitHub Pages 주소를 기준으로 생성
  const shareUrl = new URL(SHARE_BASE_URL);
  shareUrl.searchParams.set("result", key);
  return shareUrl.toString();
}

function shareResultLink(key) {
  const url = getShareUrl(key);
  const btn = document.getElementById("shareBtn2");
  const showDone = () => {
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = "복사완료!";
    setTimeout(() => { btn.textContent = old; }, 1500);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(showDone).catch(() => fallbackCopy(url, showDone));
  } else {
    fallbackCopy(url, showDone);
  }
}

function fallbackCopy(text, done) {
  const temp = document.createElement("textarea");
  temp.value = text;
  temp.style.position = "fixed";
  temp.style.opacity = "0";
  document.body.appendChild(temp);
  temp.select();
  try { document.execCommand("copy"); } catch (e) { /* ignore */ }
  document.body.removeChild(temp);
  if (done) done();
}

function renderResultStages(key) {
  const r = RESULT_TYPES[key];

  // Stage 1: 기본 결과 + 심층 결과 진입 (쿠팡 링크 클릭 → 광고 안내 → 창 닫으면 심층 결과)
  document.getElementById("stage1").innerHTML = `
    <div class="result-emoji">${r.emoji}</div>
    <div class="result-tag">${r.tag}</div>
    <h2 class="result-title">${r.title}</h2>
    <div class="result-desc">
      ${r.basicDesc.map(p => `<p>${p}</p>`).join("")}
    </div>
    <p class="result-lock-hint">더 깊은 분석이 궁금하다면? 아래 버튼을 눌러주세요.</p>
    <div class="action-row">
      <button class="btn ghost" id="retryBtn1">테스트 다시하기</button>
    </div>

    <div class="coupang-panel">
      <span class="ad-badge">📢 광고</span>
      <h3>더 자세한 결과 보기</h3>
      <p>버튼을 누르면 광고(쿠팡 상품) 페이지가 새 창으로 열립니다.<br>그 창을 닫으시면 이어서 심층 결과가 나타납니다.</p>
      <div class="coupang-item-card">
        <div class="item-emoji">${r.coupang.itemEmoji}</div>
        <div class="item-info">
          <span>${r.coupang.itemDesc}</span>
        </div>
      </div>
      <button type="button" class="btn coupang-btn" id="coupangOpenBtn">🛒 쿠팡 링크 클릭하기</button>
      <p class="coupang-disclaimer">이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</p>
    </div>
  `;
  document.getElementById("retryBtn1").addEventListener("click", startQuiz);
  state.coupangLinkIndex = 0;
  document.getElementById("coupangOpenBtn").addEventListener("click", openDeepResultFlow);

  // Stage 3: 심층 결과
  const statOrder = Object.keys(r.stats);
  const statsHtml = statOrder.map(k => `
    <div class="stat-row">
      <div class="stat-label"><span>${k}</span><span>${r.stats[k]}%</span></div>
      <div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${r.stats[k]}%"></div></div>
    </div>
  `).join("");

  document.getElementById("stage3").innerHTML = `
    <div class="result-emoji">${r.emoji}</div>
    <div class="result-tag">심층 분석 리포트</div>
    <h2 class="result-title">${r.title}</h2>

    <div class="stat-bars">${statsHtml}</div>

    <div class="deep-result-box">
      <h4>🧠 성격 분석</h4>
      ${r.deep.personality.map(p => `<p>${p}</p>`).join("")}

      <h4>💪 강점</h4>
      <ul>${r.deep.strengths.map(s => `<li>${s}</li>`).join("")}</ul>

      <h4>⚠️ 약점</h4>
      <ul>${r.deep.weaknesses.map(s => `<li>${s}</li>`).join("")}</ul>

      <h4>💼 어울리는 현대 직업</h4>
      <p>${r.deep.modernJob}</p>

      <h4>❤️ 잘 맞는 유형</h4>
      <p>${r.deep.compatibility}</p>

      <h4>🌱 한마디 조언</h4>
      <p>${r.deep.advice}</p>
    </div>

    <div class="action-row">
      <button class="btn secondary" id="backToStage1FromDeepBtn">← 이전으로</button>
      <button class="btn ghost" id="retryBtn2">테스트 다시하기</button>
      <button class="btn ghost" id="shareBtn2">🔗 링크 공유하기</button>
      <a class="btn ghost" href="index.html">처음으로</a>
    </div>
  `;
  document.getElementById("backToStage1FromDeepBtn").addEventListener("click", () => showStage(1));
  document.getElementById("retryBtn2").addEventListener("click", startQuiz);
  document.getElementById("shareBtn2").addEventListener("click", () => shareResultLink(key));
  updateShareUrl(key);
}

function showStage(n) {
  [1, 2, 3].forEach(i => {
    document.getElementById("stage" + i).classList.toggle("active", i === n);
  });
  window.scrollTo({ top: document.getElementById("resultArea").offsetTop - 20, behavior: "smooth" });
}

// ---------- 초기화 ----------
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  document.getElementById("startBtn").addEventListener("click", startQuiz);

  // URL에 result 파라미터가 있으면 결과 화면으로 바로 진입 (공유 링크로 들어온 경우)
  const params = new URLSearchParams(window.location.search);
  const sharedResult = params.get("result");
  if (sharedResult && RESULT_TYPES[sharedResult]) {
    document.getElementById("introPanel").style.display = "none";
    document.getElementById("quizPanel").style.display = "none";
    renderResultStages(sharedResult);
    document.getElementById("resultArea").style.display = "block";
    showStage(1);
  }
});
