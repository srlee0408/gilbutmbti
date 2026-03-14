/**
 * mbti-types.ts - MBTI 16가지 타입 코드·이름·설명
 *
 * 주요 역할:
 * 1. 결과 페이지에서 최종 타입별 표시명·설명 제공
 * 2. 4지표 조합(ENFJ, ISTP 등)에 대응하는 메타데이터 정의
 */

export type MBTITypeCode =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";

export interface MBTITypeInfo {
  /** 4글자 타입 코드 */
  code: MBTITypeCode;
  /** 표시용 이름(한글) */
  name: string;
  /** 타입에 대한 짧은 설명 */
  description: string;
}

/** 16가지 MBTI 타입 정보 */
export const MBTI_TYPE_MAP: Record<MBTITypeCode, MBTITypeInfo> = {
  INTJ: {
    code: "INTJ",
    name: "전략가",
    description:
      "독립적이고 논리적입니다. 장기적인 비전을 세우고 체계적으로 목표를 달성해 나갑니다.",
  },
  INTP: {
    code: "INTP",
    name: "논리술사",
    description:
      "호기심이 많고 분석적입니다. 아이디어와 이론을 탐구하는 것을 좋아합니다.",
  },
  ENTJ: {
    code: "ENTJ",
    name: "통솔자",
    description:
      "리더십이 뛰어나고 결단력 있습니다. 목표 달성을 위해 효율적으로 이끌어 갑니다.",
  },
  ENTP: {
    code: "ENTP",
    name: "변론가",
    description:
      "창의적이고 도전적입니다. 새로운 가능성을 탐색하고 토론을 즐깁니다.",
  },
  INFJ: {
    code: "INFJ",
    name: "옹호자",
    description:
      "이상주의적이고 통찰력이 있습니다. 사람들의 성장과 의미 있는 변화를 추구합니다.",
  },
  INFP: {
    code: "INFP",
    name: "중재자",
    description:
      "감성적이고 가치 지향적입니다. 자신만의 신념과 조화를 중요히 여깁니다.",
  },
  ENFJ: {
    code: "ENFJ",
    name: "선도자",
    description:
      "카리스마 있고 배려심이 깊습니다. 주변 사람들을 격려하고 성장시키는 데 힘씁니다.",
  },
  ENFP: {
    code: "ENFP",
    name: "활동가",
    description:
      "열정적이고 자유로우며 상상력이 풍부합니다. 새로운 경험과 사람을 좋아합니다.",
  },
  ISTJ: {
    code: "ISTJ",
    name: "현실주의자",
    description:
      "책임감 있고 신뢰할 수 있습니다. 사실과 규칙을 중시하며 꼼꼼하게 일합니다.",
  },
  ISFJ: {
    code: "ISFJ",
    name: "수호자",
    description:
      "헌신적이고 세심합니다. 주변 사람을 돌보고 안정적인 환경을 만드는 데 기여합니다.",
  },
  ESTJ: {
    code: "ESTJ",
    name: "경영자",
    description:
      "조직적이고 원칙적입니다. 질서와 효율을 중시하며 명확하게 이끌어 갑니다.",
  },
  ESFJ: {
    code: "ESFJ",
    name: "집정관",
    description:
      "친절하고 협조적입니다. 조화로운 관계와 실질적인 도움을 중요하게 여깁니다.",
  },
  ISTP: {
    code: "ISTP",
    name: "장인",
    description:
      "냉정하고 실용적입니다. 도구와 메커니즘을 다루는 데 재능이 있습니다.",
  },
  ISFP: {
    code: "ISFP",
    name: "모험가",
    description:
      "유연하고 감각이 뛰어납니다. 현재 순간과 미적 경험을 소중히 여깁니다.",
  },
  ESTP: {
    code: "ESTP",
    name: "사업가",
    description:
      "에너지 넘치고 행동력이 있습니다. 현실적이고 즉흥적인 대처를 잘합니다.",
  },
  ESFP: {
    code: "ESFP",
    name: "연예인",
    description:
      "즐겁고 사교적입니다. 분위기를 만들고 주변 사람들과 함께하는 시간을 좋아합니다.",
  },
};
