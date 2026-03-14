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
        className="relative h-[min(70vh,20rem)] w-full rounded-lg border border-(--border) bg-(--card-bg) shadow-sm"
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
        {/* 뒷면: 에디토리얼 스타일 */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-lg border border-(--border) bg-background"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col items-center gap-3 font-editorial text-(--muted)">
            <span className="text-2xl font-semibold tracking-[0.2em] text-(--accent)">
              MBTI
            </span>
            <span className="text-xs tracking-widest opacity-70">
              성격 유형 검사
            </span>
          </div>
        </div>

        {/* 앞면: 질문 + 선택지 (에디토리얼) */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-lg border border-(--border) bg-(--card-bg) p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <p className="font-editorial text-lg font-semibold leading-snug text-foreground">
            {question.text}
          </p>
          <div className="flex flex-col gap-3">
            {question.choices.map((choice) => (
              <button
                key={choice.value}
                type="button"
                onClick={() => onAnswer(choice.value)}
                className="rounded border border-(--accent) bg-transparent py-3 text-sm font-medium text-(--accent) transition-colors hover:bg-(--accent) hover:text-white active:scale-[0.99]"
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
