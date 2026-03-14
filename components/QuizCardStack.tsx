"use client";

/**
 * QuizCardStack.tsx - 10장 카드 스택 + 현재 인덱스·답변 콜백
 *
 * 주요 역할:
 * 1. 10장 카드를 겹쳐 표시, 맨 위 카드만 앞면(질문) 노출
 * 2. 답변 시 맨 위 카드 exit → currentIndex 증가 → 다음 카드 앞면 표시
 * 3. 10문 완료 시 onComplete(answers) 호출
 */

import { useState, useCallback, useEffect } from "react";
import { QuizCard } from "./QuizCard";
import type { MBTIQuestion } from "@/shared/constants/mbti-questions";
import type { MBTIValue } from "@/shared/constants/mbti-questions";

const EXIT_DURATION_MS = 500;

export interface QuizCardStackProps {
  /** 이번 퀴즈에 사용할 10개 질문 (순서 고정) */
  questions: MBTIQuestion[];
  /** 10문 모두 답변했을 때 (선택값 배열 전달) */
  onComplete: (answers: MBTIValue[]) => void;
}

export function QuizCardStack({ questions, onComplete }: QuizCardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<MBTIValue[]>([]);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [hasRevealedFirst, setHasRevealedFirst] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHasRevealedFirst(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleAnswer = useCallback(
    (value: MBTIValue) => {
      if (exitingIndex !== null) return;
      const nextAnswers = [...answers, value];
      setAnswers(nextAnswers);
      setExitingIndex(currentIndex);

      setTimeout(() => {
        setExitingIndex(null);
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        if (nextIndex >= questions.length) {
          onComplete(nextAnswers);
        }
      }, EXIT_DURATION_MS);
    },
    [answers, currentIndex, exitingIndex, questions.length, onComplete]
  );

  const remaining = questions.slice(currentIndex);
  if (remaining.length === 0) return null;

  return (
    <div
      className="relative h-[min(75vh,22rem)] w-[min(92vw,22rem)]"
      style={{ perspective: "1000px" }}
    >
      {remaining.map((q, j) => (
        <QuizCard
          key={q.id}
          question={q}
          isRevealed={j === 0 && exitingIndex === null && hasRevealedFirst}
          isExiting={exitingIndex !== null && j === 0}
          onAnswer={handleAnswer}
          zIndex={remaining.length - j}
          stackOffset={j}
        />
      ))}
    </div>
  );
}
