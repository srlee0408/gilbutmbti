"use client";

/**
 * QuizCard.tsx - 퀴즈 카드 1장 (뒷면/앞면 플립, 퇴장 애니메이션)
 *
 * 주요 역할:
 * 1. 뒷면(패턴) / 앞면(질문+선택지) 3D 플립 전환
 * 2. 답변 후 뒤집히며 사라지는 exit 애니메이션
 * 3. 선택지 클릭 시 onAnswer 콜백 호출
 */

import type { MBTIQuestion } from "@/shared/constants/mbti-questions";
import type { MBTIValue } from "@/shared/constants/mbti-questions";

const CARD_DURATION_MS = 400;
const EXIT_DURATION_MS = 500;

export interface QuizCardProps {
  /** 현재 카드에 표시할 질문 */
  question: MBTIQuestion;
  /** 앞면이 보이는지 (맨 위 카드이면서 뒤집힌 상태) */
  isRevealed: boolean;
  /** 답변 후 퇴장 애니메이션 재생 중인지 */
  isExiting: boolean;
  /** 선택지 클릭 시 (선택값 전달) */
  onAnswer: (value: MBTIValue) => void;
  /** 카드 스택에서의 z-index */
  zIndex: number;
  /** 스택에서의 시각적 오프셋(겹침) */
  stackOffset?: number;
}

export function QuizCard({
  question,
  isRevealed,
  isExiting,
  onAnswer,
  zIndex,
  stackOffset = 0,
}: QuizCardProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2 w-[min(92vw,22rem)]"
      style={{
        zIndex,
        transform: `translate(-50%, -50%) translateY(${stackOffset * 4}px) scale(${1 - stackOffset * 0.02})`,
        transition: `transform ${CARD_DURATION_MS}ms ease-out`,
      }}
    >
      <div
        className="relative h-[min(70vh,20rem)] w-full rounded-2xl shadow-xl"
        style={{
          transformStyle: "preserve-3d",
          transform: isExiting
            ? "rotateY(180deg) scale(0.92)"
            : isRevealed
              ? "rotateY(0deg)"
              : "rotateY(180deg)",
          opacity: isExiting ? 0 : 1,
          transition: `transform ${isExiting ? EXIT_DURATION_MS : CARD_DURATION_MS}ms ease-in-out, opacity ${EXIT_DURATION_MS}ms ease-out`,
          pointerEvents: isExiting ? "none" : "auto",
        }}
      >
        {/* 뒷면: 카드 뒤 (질문 없음) */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-amber-200/60 bg-linear-to-br from-amber-50 to-amber-100/90 shadow-inner"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col items-center gap-2 text-amber-800/70">
            <div className="h-12 w-12 rounded-full border-2 border-amber-300/80 bg-amber-200/50" />
            <span className="text-xs font-medium tracking-widest opacity-80">
              MBTI
            </span>
          </div>
        </div>

        {/* 앞면: 질문 + 선택지 */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border-2 border-amber-200/60 bg-white p-5 shadow-inner"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <p className="text-base font-medium leading-snug text-zinc-800">
            {question.text}
          </p>
          <div className="flex flex-col gap-3">
            {question.choices.map((choice) => (
              <button
                key={choice.value}
                type="button"
                onClick={() => onAnswer(choice.value)}
                className="rounded-xl border-2 border-amber-200 bg-amber-50/80 py-3 text-sm font-medium text-amber-900 transition-colors hover:border-amber-300 hover:bg-amber-100 active:scale-[0.98]"
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
