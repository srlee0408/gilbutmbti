/**
 * mbti-questions.ts - MBTI 퀴즈 30문항 풀
 *
 * 주요 역할:
 * 1. E/I, N/S, T/F, J/P 4가지 지표별 질문·선택지 정의
 * 2. 지표별 균등 분배 (EI 8, SN 8, TF 7, JP 7)
 * 3. 퀴즈 페이지에서 랜덤 10문 추출 시 소스 데이터 제공
 */

export type MBTIDimension = "EI" | "SN" | "TF" | "JP";
export type MBTIValue = "E" | "I" | "N" | "S" | "T" | "F" | "J" | "P";

export interface MBTIChoice {
  /** 선택지 문구 */
  text: string;
  /** 해당 선택지가 반영하는 지표 값 (E/I, N/S, T/F, J/P 중 하나) */
  value: MBTIValue;
}

export interface MBTIQuestion {
  /** 질문 고유 ID */
  id: string;
  /** 질문 문구 */
  text: string;
  /** 이 질문이 측정하는 지표 쌍 */
  dimension: MBTIDimension;
  /** 객관식 선택지 2개 (한 지표의 양극) */
  choices: [MBTIChoice, MBTIChoice];
}

/** 퀴즈 풀: 30개 질문 (EI 8, SN 8, TF 7, JP 7) */
export const MBTI_QUESTIONS: MBTIQuestion[] = [
  // EI (8문)
  {
    id: "ei-1",
    text: "주말에 친구들이 놀자고 연락하면?",
    dimension: "EI",
    choices: [
      { text: "바로 나가서 만나고 싶다", value: "E" },
      { text: "집에서 쉬는 게 더 좋다", value: "I" },
    ],
  },
  {
    id: "ei-2",
    text: "새로운 사람들과의 모임에서 나는?",
    dimension: "EI",
    choices: [
      { text: "먼저 말 걸고 분위기를 만든다", value: "E" },
      { text: "말 걸어주면 대화한다", value: "I" },
    ],
  },
  {
    id: "ei-3",
    text: "에너지가 떨어질 때 나는?",
    dimension: "EI",
    choices: [
      { text: "사람 만나서 충전한다", value: "E" },
      { text: "혼자만의 시간으로 회복한다", value: "I" },
    ],
  },
  {
    id: "ei-4",
    text: "생각을 정리할 때 나는?",
    dimension: "EI",
    choices: [
      { text: "말하면서 생각이 정리된다", value: "E" },
      { text: "먼저 생각한 뒤 말한다", value: "I" },
    ],
  },
  {
    id: "ei-5",
    text: "파티나 행사에서 나는?",
    dimension: "EI",
    choices: [
      { text: "많은 사람과 인사하고 다닌다", value: "E" },
      { text: "아는 사람 몇 명과 깊게 대화한다", value: "I" },
    ],
  },
  {
    id: "ei-6",
    text: "일할 때 나는?",
    dimension: "EI",
    choices: [
      { text: "팀원과 이야기하며 일하는 게 좋다", value: "E" },
      { text: "혼자 집중하는 시간이 필요하다", value: "I" },
    ],
  },
  {
    id: "ei-7",
    text: "처음 보는 사람에게 나는?",
    dimension: "EI",
    choices: [
      { text: "편하게 먼저 말을 건다", value: "E" },
      { text: "상대가 말 걸 때까지 기다린다", value: "I" },
    ],
  },
  {
    id: "ei-8",
    text: "스트레스 받을 때 나는?",
    dimension: "EI",
    choices: [
      { text: "친구에게 털어놓고 싶다", value: "E" },
      { text: "혼자 조용히 해소하고 싶다", value: "I" },
    ],
  },
  // SN (8문)
  {
    id: "sn-1",
    text: "새로운 일을 시작할 때 나는?",
    dimension: "SN",
    choices: [
      { text: "가능성과 아이디어를 먼저 생각한다", value: "N" },
      { text: "현실적인 단계부터 정한다", value: "S" },
    ],
  },
  {
    id: "sn-2",
    text: "대화할 때 나는?",
    dimension: "SN",
    choices: [
      { text: "은유나 비유를 자주 쓴다", value: "N" },
      { text: "구체적인 사실과 경험을 말한다", value: "S" },
    ],
  },
  {
    id: "sn-3",
    text: "문제를 해결할 때 나는?",
    dimension: "SN",
    choices: [
      { text: "새로운 방법을 찾고 싶다", value: "N" },
      { text: "검증된 방법을 따른다", value: "S" },
    ],
  },
  {
    id: "sn-4",
    text: "설명할 때 나는?",
    dimension: "SN",
    choices: [
      { text: "큰 그림과 흐름을 먼저 말한다", value: "N" },
      { text: "단계별로 차근차근 말한다", value: "S" },
    ],
  },
  {
    id: "sn-5",
    text: "일정을 세울 때 나는?",
    dimension: "SN",
    choices: [
      { text: "대략적인 방향만 잡고 유연하게 한다", value: "N" },
      { text: "세부 시간과 순서를 정해둔다", value: "S" },
    ],
  },
  {
    id: "sn-6",
    text: "과거 경험을 말할 때 나는?",
    dimension: "SN",
    choices: [
      { text: "그 경험이 주는 의미를 더 말한다", value: "N" },
      { text: "그때 있었던 일을 그대로 묘사한다", value: "S" },
    ],
  },
  {
    id: "sn-7",
    text: "새 기기에 대해 나는?",
    dimension: "SN",
    choices: [
      { text: "기능을 눌러보며 감으로 익힌다", value: "N" },
      { text: "설명서나 가이드를 먼저 본다", value: "S" },
    ],
  },
  {
    id: "sn-8",
    text: "목표를 세울 때 나는?",
    dimension: "SN",
    choices: [
      { text: "먼 미래의 비전을 생각한다", value: "N" },
      { text: "당장 할 수 있는 것부터 정한다", value: "S" },
    ],
  },
  // TF (7문)
  {
    id: "tf-1",
    text: "의사결정할 때 더 중요하게 생각하는 것은?",
    dimension: "TF",
    choices: [
      { text: "논리와 객관적 근거", value: "T" },
      { text: "사람 감정과 관계", value: "F" },
    ],
  },
  {
    id: "tf-2",
    text: "친구가 고민을 말할 때 나는?",
    dimension: "TF",
    choices: [
      { text: "해결 방법을 제안한다", value: "T" },
      { text: "공감하며 들어준다", value: "F" },
    ],
  },
  {
    id: "tf-3",
    text: "피드백을 줄 때 나는?",
    dimension: "TF",
    choices: [
      { text: "솔직하게 잘못된 점을 짚어준다", value: "T" },
      { text: "상처 주지 않게 표현을 신경 쓴다", value: "F" },
    ],
  },
  {
    id: "tf-4",
    text: "갈등이 생겼을 때 나는?",
    dimension: "TF",
    choices: [
      { text: "누가 맞는지 원칙으로 판단한다", value: "T" },
      { text: "서로 감정을 나누는 게 먼저라고 생각한다", value: "F" },
    ],
  },
  {
    id: "tf-5",
    text: "일을 평가할 때 나는?",
    dimension: "TF",
    choices: [
      { text: "결과와 효율을 중시한다", value: "T" },
      { text: "과정과 팀 분위기를 중시한다", value: "F" },
    ],
  },
  {
    id: "tf-6",
    text: "다른 사람을 이해할 때 나는?",
    dimension: "TF",
    choices: [
      { text: "그 사람의 논리와 선택 이유를 본다", value: "T" },
      { text: "그 사람의 감정과 상황을 먼저 생각한다", value: "F" },
    ],
  },
  {
    id: "tf-7",
    text: "규칙을 적용할 때 나는?",
    dimension: "TF",
    choices: [
      { text: "규칙은 일관되게 적용해야 한다고 생각한다", value: "T" },
      { text: "상황과 사람에 따라 유연하게 적용해도 된다고 생각한다", value: "F" },
    ],
  },
  // JP (7문)
  {
    id: "jp-1",
    text: "일정이 있으면 나는?",
    dimension: "JP",
    choices: [
      { text: "미리 준비하고 계획대로 진행하려 한다", value: "J" },
      { text: "당일 흐름에 맞춰 유연하게 한다", value: "P" },
    ],
  },
  {
    id: "jp-2",
    text: "마감이 다가오면 나는?",
    dimension: "JP",
    choices: [
      { text: "일찍 끝내두고 여유를 갖는다", value: "J" },
      { text: "마감 직전에 집중해서 한다", value: "P" },
    ],
  },
  {
    id: "jp-3",
    text: "여행을 갈 때 나는?",
    dimension: "JP",
    choices: [
      { text: "숙소·경로를 미리 정해둔다", value: "J" },
      { text: "대략만 정하고 현지에서 결정한다", value: "P" },
    ],
  },
  {
    id: "jp-4",
    text: "방이나 책상은?",
    dimension: "JP",
    choices: [
      { text: "정리된 상태가 편하다", value: "J" },
      { text: "쓸 수 있으면 어지러워도 괜찮다", value: "P" },
    ],
  },
  {
    id: "jp-5",
    text: "결정을 내릴 때 나는?",
    dimension: "JP",
    choices: [
      { text: "빨리 정하고 다음으로 넘어가고 싶다", value: "J" },
      { text: "선택지를 열어두고 더 보려 한다", value: "P" },
    ],
  },
  {
    id: "jp-6",
    text: "일할 때 나는?",
    dimension: "JP",
    choices: [
      { text: "할 일 목록을 만들고 하나씩 처리한다", value: "J" },
      { text: "하고 싶은 것부터 맥락에 맞춰 한다", value: "P" },
    ],
  },
  {
    id: "jp-7",
    text: "예상치 못한 일이 생기면 나는?",
    dimension: "JP",
    choices: [
      { text: "당황하지만 다시 계획을 세운다", value: "J" },
      { text: "그때그때 대응하는 편이다", value: "P" },
    ],
  },
];
