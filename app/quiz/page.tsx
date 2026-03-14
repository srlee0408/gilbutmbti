"use client";

/**
 * quiz/page.tsx - MBTI 퀴즈 진행 페이지
 *
 * 30문항 풀에서 랜덤 10문 선택 후 카드 스택 UI로 진행,
 * 완료 시 지표별 카운트를 쿼리로 결과 페이지에 전달
 */

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { QuizCardStack } from "@/components/QuizCardStack";
import { MBTI_QUESTIONS } from "@/shared/constants/mbti-questions";
import { pickRandom } from "@/shared/utils/pick-random";
import { calculateMBTI } from "@/shared/utils/calculate-mbti";
import type { MBTIValue } from "@/shared/constants/mbti-questions";

const QUIZ_COUNT = 10;

export default function QuizPage() {
  const router = useRouter();
  const questions = useMemo(
    () => pickRandom(MBTI_QUESTIONS, QUIZ_COUNT),
    []
  );

  const handleComplete = (answers: MBTIValue[]) => {
    const { counts } = calculateMBTI(answers);
    const params = new URLSearchParams({
      e: String(counts.E),
      i: String(counts.I),
      n: String(counts.N),
      s: String(counts.S),
      t: String(counts.T),
      f: String(counts.F),
      j: String(counts.J),
      p: String(counts.P),
    });
    router.push(`/result?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50/50 px-4">
      <QuizCardStack questions={questions} onComplete={handleComplete} />
    </div>
  );
}
