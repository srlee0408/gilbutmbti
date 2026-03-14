/**
 * calculate-mbti.ts - 답변 집계 및 MBTI 타입·비율 계산
 *
 * 주요 역할:
 * 1. 선택값 배열(E,I,N,S,T,F,J,P) → 지표별 카운트
 * 2. 지표별 퍼센트 계산 (E vs I, N vs S 등)
 * 3. 4지표에서 더 높은 쪽 조합 → 16가지 타입 코드 반환
 */

import type { MBTIValue } from "../constants/mbti-questions";
import type { MBTITypeCode } from "../constants/mbti-types";

/** 지표별 선택 횟수 (E,I / N,S / T,F / J,P) */
export interface DimensionCounts {
  E: number;
  I: number;
  N: number;
  S: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

/** 지표별 비율 (0~100, 왼쪽 문자 기준) */
export interface DimensionPercentages {
  EI: number; // E 비율 (100이면 완전 E)
  SN: number; // N 비율
  TF: number; // T 비율
  JP: number; // J 비율
}

export interface MBTIResult {
  /** 지표별 선택 횟수 */
  counts: DimensionCounts;
  /** 지표별 퍼센트 (왼쪽 문자 기준) */
  percentages: DimensionPercentages;
  /** 최종 4글자 타입 */
  type: MBTITypeCode;
}

const INITIAL_COUNTS: DimensionCounts = {
  E: 0,
  I: 0,
  N: 0,
  S: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0,
};

/**
 * 선택값 배열을 지표별 카운트로 집계
 */
export function countAnswers(answers: MBTIValue[]): DimensionCounts {
  const counts = { ...INITIAL_COUNTS };
  for (const v of answers) {
    if (v in counts) counts[v as keyof DimensionCounts]++;
  }
  return counts;
}

/**
 * 지표별 카운트에서 퍼센트 계산 (왼쪽 문자 기준: E, N, T, J)
 * 동점이면 50
 */
export function getPercentages(counts: DimensionCounts): DimensionPercentages {
  const pair = (left: number, right: number) => {
    const total = left + right;
    if (total === 0) return 50;
    return Math.round((left / total) * 100);
  };
  return {
    EI: pair(counts.E, counts.I),
    SN: pair(counts.N, counts.S),
    TF: pair(counts.T, counts.F),
    JP: pair(counts.J, counts.P),
  };
}

/**
 * 지표별 카운트에서 최종 4글자 타입 결정
 * 동점일 때: I, S, F, P 우선 (일반 MBTI 규칙)
 */
export function getTypeFromCounts(counts: DimensionCounts): MBTITypeCode {
  const e = counts.E > counts.I ? "E" : "I";
  const n = counts.N > counts.S ? "N" : "S";
  const t = counts.T > counts.F ? "T" : "F";
  const j = counts.J > counts.P ? "J" : "P";
  return (e + n + t + j) as MBTITypeCode;
}

/**
 * 답변 배열로부터 집계·퍼센트·타입 한 번에 계산
 */
export function calculateMBTI(answers: MBTIValue[]): MBTIResult {
  const counts = countAnswers(answers);
  const percentages = getPercentages(counts);
  const type = getTypeFromCounts(counts);
  return { counts, percentages, type };
}
